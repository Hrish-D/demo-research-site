'use client';

import { createContext, useContext } from 'react';

export type NavigationState =
  | 'loading'
  | 'atomic-model'
  | 'zooming-into-nucleus'
  | 'homepage'
  | 'zooming-out'
  | 'page-transition'
  | 'page-view';

export type PageId = 'research' | 'publications' | 'team' | 'library' | 'contact';

export interface NavigationContextType {
  state: NavigationState;
  activePage: PageId | null;
  transitionTo: (state: NavigationState, page?: PageId) => void;
  goBackToAtom: () => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  state: 'loading',
  activePage: null,
  transitionTo: () => {},
  goBackToAtom: () => {},
});

export function useNavigation() {
  return useContext(NavigationContext);
}
