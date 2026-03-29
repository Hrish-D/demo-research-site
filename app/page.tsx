'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  NavigationContext,
  NavigationState,
  PageId,
} from '@/lib/navigation-state';
import LoadingScreen from '@/components/atomic/LoadingScreen';
import AtomicScene from '@/components/atomic/AtomicScene';
import HomepageContent from '@/components/pages/HomepageContent';
import ResearchContent from '@/components/pages/ResearchContent';
import PublicationsContent from '@/components/pages/PublicationsContent';
import TeamOrbital from '@/components/pages/TeamOrbital';
import LibraryContent from '@/components/pages/LibraryContent';
import ContactContent from '@/components/pages/ContactContent';
import PageShell from '@/components/pages/PageShell';

const PAGE_TITLES: Record<PageId, string> = {
  research: 'Research',
  publications: 'Publications',
  team: 'Team',
  library: 'Library',
  contact: 'Contact',
};

function PageContent({ pageId }: { pageId: PageId }) {
  switch (pageId) {
    case 'research':
      return <ResearchContent />;
    case 'publications':
      return <PublicationsContent />;
    case 'team':
      return <TeamOrbital />;
    case 'library':
      return <LibraryContent />;
    case 'contact':
      return <ContactContent />;
    default:
      return null;
  }
}

export default function HomePage() {
  const [navState, setNavState] = useState<NavigationState>('loading');
  const [activePage, setActivePage] = useState<PageId | null>(null);

  const transitionTo = useCallback(
    (state: NavigationState, page?: PageId) => {
      if (page) setActivePage(page);
      setNavState(state);

      // Update URL without navigation
      if (state === 'page-transition' || state === 'page-view') {
        const electron = page ? `/${page}` : '/';
        window.history.pushState({ state, page }, '', electron);
      } else if (state === 'homepage' || state === 'zooming-into-nucleus') {
        window.history.pushState({ state }, '', '/');
      } else if (state === 'atomic-model') {
        window.history.pushState({ state }, '', '/');
      }
    },
    [],
  );

  const goBackToAtom = useCallback(() => {
    setActivePage(null);
    setNavState('atomic-model');
    window.history.pushState({ state: 'atomic-model' }, '', '/');
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const s = e.state;
      if (s?.state) {
        setNavState(s.state);
        setActivePage(s.page || null);
      } else {
        setNavState('atomic-model');
        setActivePage(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setTimeout(() => setNavState('atomic-model'), 300);
  }, []);

  return (
    <NavigationContext.Provider value={{ state: navState, activePage, transitionTo, goBackToAtom }}>
      <div className="bg-black min-h-screen">
        {/* Loading Screen — own AnimatePresence */}
        <AnimatePresence>
          {navState === 'loading' && (
            <LoadingScreen key="loader" onComplete={handleLoadComplete} />
          )}
        </AnimatePresence>

        {/* Atomic Model — manages its own visibility internally */}
        <AtomicScene key="atom" />

        {/* Homepage (nucleus content) */}
        <AnimatePresence>
          {(navState === 'homepage' || navState === 'zooming-into-nucleus') && (
            <HomepageContent key="homepage" />
          )}
        </AnimatePresence>

        {/* Page content (electron pages) */}
        <AnimatePresence>
          {(navState === 'page-transition' || navState === 'page-view') &&
            activePage && (
              <PageShell key={`page-${activePage}`} title={PAGE_TITLES[activePage]}>
                <PageContent pageId={activePage} />
              </PageShell>
            )}
        </AnimatePresence>
      </div>
    </NavigationContext.Provider>
  );
}
