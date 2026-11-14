// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

// lottie-web needs a real canvas, which jsdom doesn't have.
vi.mock('lottie-react', () => ({ default: () => null }));

import SearchPanel from '../SearchPanel';
import { AssistantProvider } from '../AssistantContext';
import { AskAiButton } from '../AskAiButton';
import { clampToViewport, floatingFrame } from '../floatingFrame';
import { TIMING } from '../AnswerCard';

// No thinking delays or typing in tests.
Object.assign(TIMING, { step: 0, minThinking: 0, wordMs: 0 });

function renderPanel() {
  return render(
    <MemoryRouter>
      <AssistantProvider defaultOpen>
        <SearchPanel />
      </AssistantProvider>
    </MemoryRouter>,
  );
}

const fetchMock = vi.fn();
beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
  localStorage.clear();
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const input = () => screen.getByLabelText('Search or ask about the portfolio') as HTMLTextAreaElement;

describe('SearchPanel', () => {
  it('opens on the welcome screen with six chips', () => {
    renderPanel();
    expect(screen.getByText('What would you like to know?')).toBeTruthy();
    for (const label of ['Who is Tobi?', 'Fintech work', 'Design systems', 'Talks & writing', 'Experience', 'Get in touch']) {
      expect(screen.getByRole('button', { name: new RegExp(label) })).toBeTruthy();
    }
  });

  it('answers a chip without calling the server', async () => {
    renderPanel();
    fireEvent.click(screen.getByRole('button', { name: /Get in touch/ }));
    await waitFor(() => expect(screen.getByText('Quick answer')).toBeTruthy());
    expect(screen.getAllByText(/oluwatobi\.olowu@outlook\.com/).length).toBeGreaterThan(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('shows nothing while typing, then results after send, with no network', async () => {
    renderPanel();
    fireEvent.change(input(), { target: { value: 'panic button' } });
    await new Promise((r) => setTimeout(r, 150));
    expect(screen.queryByRole('listbox', { name: 'Search results' })).toBeNull();
    expect(screen.getByText('What would you like to know?')).toBeTruthy();
    fireEvent.keyDown(input(), { key: 'Enter' });
    await waitFor(() => expect(screen.getByRole('listbox', { name: 'Search results' })).toBeTruthy());
    await waitFor(() => expect(screen.getByRole('button', { name: /Ask AI for a written answer/ })).toBeTruthy());
    expect(screen.getAllByText(/The best match is/).length).toBeGreaterThan(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('replies kindly to questions about things not in the portfolio, without the server', async () => {
    renderPanel();
    fireEvent.change(input(), { target: { value: 'What is Joy torru' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    await waitFor(() => expect(screen.getAllByText(/couldn't find anything about "What is Joy torru"/).length).toBeGreaterThan(0));
    expect(screen.getByText('Try asking about')).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('asks the server for real questions, then remembers the answer', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ answer: 'He cut drop-off from 48% to 14%.', links: ['moore/onboarding'], source: 'ai' })));
    renderPanel();
    const q = 'How did he reduce onboarding drop-off at Moore?';
    fireEvent.change(input(), { target: { value: q } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    await waitFor(() => expect(screen.getByText('AI answer')).toBeTruthy());
    expect(screen.getAllByText('He cut drop-off from 48% to 14%.').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Optimizing Onboarding/ })).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Same question again (new search, retype): served from this browser, no second request.
    fireEvent.click(screen.getByRole('button', { name: 'New search' }));
    fireEvent.change(input(), { target: { value: q } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    await waitFor(() => expect(screen.getByText('AI answer')).toBeTruthy());
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('explains a server fallback instead of going quiet', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ fallback: true, reason: 'limit' })));
    renderPanel();
    fireEvent.change(input(), { target: { value: 'How did Hydra handle billing for partners?' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    await waitFor(() => expect(screen.getAllByText(/written a lot of answers today/).length).toBeGreaterThan(0));
    expect(screen.queryByText('AI answer')).toBeNull();
    expect(screen.getAllByRole('option').length).toBeGreaterThan(0);
  });
});

describe('AskAiButton', () => {
  it('is the orb alone, with the dock tooltip on hover', () => {
    render(
      <MemoryRouter>
        <AssistantProvider>
          <AskAiButton />
        </AssistantProvider>
      </MemoryRouter>,
    );
    const button = screen.getByRole('button', { name: 'Chat with AI' });
    expect(button.textContent).toBe('');
    expect(screen.queryByText('Chat with AI')).toBeNull();
    fireEvent.mouseEnter(button);
    expect(screen.getByText('Chat with AI')).toBeTruthy();
    expect(button.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(button);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(screen.queryByText('Chat with AI')).toBeNull();
  });
});

describe('floatingFrame (from Bespoka)', () => {
  it('docks to the bottom-right corner on desktop, level with a centred dock', () => {
    const f = floatingFrame({ width: 1440, height: 900 }, null, { top: 820, bottom: 880, left: 500, right: 940 });
    expect(f).toEqual({ bottom: 16, right: 16, width: 400, height: 760 });
  });
  it('climbs above the dock when the dock reaches under it', () => {
    const f = floatingFrame({ width: 1024, height: 768 }, null, { top: 690, bottom: 750, left: 190, right: 840 });
    expect(f).toMatchObject({ bottom: 768 - 690 + 12, right: 16, width: 400 });
  });
  it('fills the width on phones', () => {
    expect(floatingFrame({ width: 390, height: 844 }, null, null)).toMatchObject({ left: 12, right: 12 });
  });
  it('keeps a dragged card on screen', () => {
    expect(clampToViewport({ left: -50, top: 2000 }, { width: 400, height: 600 }, { width: 1440, height: 900 })).toEqual({ left: 8, top: 292 });
  });
});
