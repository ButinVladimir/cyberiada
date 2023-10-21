import React from 'react';
import { IPerson } from '@/state/person';
import CrewOverview from './components/CrewOverview';
import { selectMemberContext } from './selectMemberContext';

export default function MainPage() {
  const [selectedMember, setSelectedMember] = React.useState<IPerson | null>(null);

  const handleSelectMember = (person: IPerson) => {
    setSelectedMember(person);
  };

  return (
    <selectMemberContext.Provider value={handleSelectMember}>
      {selectedMember === null ? <CrewOverview /> : null}
    </selectMemberContext.Provider>
  );
}
