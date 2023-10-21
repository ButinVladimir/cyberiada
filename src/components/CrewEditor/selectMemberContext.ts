import { Person } from '@/state/person';
import React from 'react';

type SelectMemberCallback = (person: Person) => void;

export const selectMemberContext = React.createContext<SelectMemberCallback>(() => {});
