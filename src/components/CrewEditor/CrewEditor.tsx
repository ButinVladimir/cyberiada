import React from 'react';
import { IPerson, Person } from '@/state/person';
import CrewOverview from './components/CrewOverview';
import CrewMemberEditor from './components/CrewMemberEditor';
import { crewEditorCallbacksContext } from './crewEditorCallbacksContext';

interface IMainPageState {
  action: 'list' | 'create' | 'edit';
  person?: IPerson;
}

export default function MainPage() {
  const [mainPageState, setMainPageState] = React.useState<IMainPageState>({
    action: 'list',
  });

  const crewEditorCallbacks = React.useMemo(() => ({
    startCreatingMember: () => {
      setMainPageState({
        action: 'create',
      });
    },
    startEditingMember: (person: IPerson) => {
      setMainPageState({
        action: 'edit',
        person: Person.copy(person),
      });
    },
    listMembers: () => {
      setMainPageState({
        action: 'list',
      });
    },
  }), []);

  return (
    <crewEditorCallbacksContext.Provider value={crewEditorCallbacks}>
      {mainPageState.action === 'list'
        ? <CrewOverview />
        : (
          <CrewMemberEditor
            action={mainPageState.action}
            person={mainPageState.person}
          />
        )}
    </crewEditorCallbacksContext.Provider>
  );
}
