import React from 'react';
import { AgendaItem } from '../../../types/agendaItem';

interface ResultProps {
  agendaItems: AgendaItem[];
  layout: 'cards' | 'rows'
}

function Results({ agendaItems, layout }: ResultProps) {
  console.log(agendaItems);
  console.log(layout);
  return (
    <>
    </>
  );
}

export default Results;
