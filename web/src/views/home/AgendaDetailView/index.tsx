import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { agendaRef } from 'src/services/AgendaItem';
import type { AgendaItem } from 'src/types/agendaItem';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import AgendaPanel from './AgendaPanel';
import TestimonyPanel from './TestimonyPanel';

const useStyles = makeStyles(() => ({
  root: {},
}));

function AgendaDetailView() {
  const classes = useStyles();
  const { id } = useParams();
  const [agendaItem, loading, error] = useDocumentData<AgendaItem>(
    agendaRef.doc(id),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <Page
      className={classes.root}
      title="Agenda Detail"
    >
      <Container maxWidth="lg">
        {error && (
        <strong>
          Error:
          {JSON.stringify(error)}
        </strong>
        )}
        {loading && <span>Collection: Loading...</span>}
        {agendaItem && (
          <>
            <AgendaPanel agendaItem={agendaItem} />
            <TestimonyPanel agendaItem={agendaItem} />
          </>
        )}
      </Container>
    </Page>
  );
}

export default AgendaDetailView;
