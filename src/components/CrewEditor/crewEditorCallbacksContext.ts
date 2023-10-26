import { Person } from '@/state/person';
import React from 'react';

interface CrewEditorCallbacks {
  startCreatingMember: () => void;
  startEditingMember: (person: Person) => void;
  listMembers: () => void;
}

export const crewEditorCallbacksContext = React.createContext<CrewEditorCallbacks>({
  startCreatingMember: () => {},
  startEditingMember: () => {},
  listMembers: () => {},
});