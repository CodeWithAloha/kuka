import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import type { Theme } from 'src/theme';
import { agendaRef } from 'src/services/AgendaItem';
import type { AgendaItem } from 'src/types/agendaItem';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
}));

function AgendaCreateView() {
  const classes = useStyles();
  const [agendaItems, loading, error] = useCollectionData<AgendaItem>(
    agendaRef
      .orderBy('sessionTime', 'desc'),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <Page
      className={classes.root}
      title="All Agenda Items"
    >
      <Container maxWidth="lg">
        <Header />
        {error && (
        <strong>
          Error:
          {JSON.stringify(error)}
        </strong>
        )}
        {loading && <span>Collection: Loading...</span>}
        {agendaItems && (
          <Results agendaItems={agendaItems} />
        )}
      </Container>
    </Page>
  );
}

export default AgendaCreateView;
