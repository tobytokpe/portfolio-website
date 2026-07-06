
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router";
  import React from "react";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { error: Error | null }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { error: null };
    }
    static getDerivedStateFromError(error: Error) {
      return { error };
    }
    render() {
      if (this.state.error) {
        return (
          <div style={{ padding: 40, fontFamily: 'monospace', background: '#fff1f0', minHeight: '100vh' }}>
            <h1 style={{ color: '#c0392b' }}>🚨 App crashed — here's why:</h1>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#333', background: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e74c3c' }}>
              {this.state.error.message}
              {"\n\n"}
              {this.state.error.stack}
            </pre>
          </div>
        );
      }
      return this.props.children;
    }
  }

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  );
  