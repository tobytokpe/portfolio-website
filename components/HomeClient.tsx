'use client';

import { useMediaQuery } from '@mui/material';
import { HomeCanvas } from '@/components/HomeCanvas';
import { MobileView } from '@/components/MobileView';
import { PROJECTS, LEADERSHIP, heroImage } from '@/src/data/projects';

export default function HomeClient() {
  const isMobile = useMediaQuery('(max-width:768px)');

  if (isMobile) {
    return (
      <MobileView
        projects={PROJECTS}
        leadership={LEADERSHIP}
        heroImage={heroImage}
      />
    );
  }

  return <HomeCanvas />;
}
