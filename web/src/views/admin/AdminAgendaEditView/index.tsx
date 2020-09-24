import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import type { Theme } from 'src/theme';
import { agendaRef } from "src/services/AgendaItem";
import Header from './Header';
import type { Agenda } from "src/types/agenda";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useParams } from 'react-router-dom';
import AgendaCreateForm from "../AdminAgendaCreateView/AgendaCreateForm";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function AgendaCreateView() {
  const classes = useStyles();
  const { id } = useParams();

  const [agendaItem, loading, error] = useDocumentDataOnce<Agenda>(
    agendaRef.doc(id),
    { idField: 'id' }
  );

  return (
    <Page
      className={classes.root}
      title="All Agenda Items"
    >
      <Container maxWidth="lg">
        <Header />
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {agendaItem && <AgendaCreateForm agendaItem={agendaItem} />}
      </Container>
    </Page>
  );
}

export default AgendaCreateView;