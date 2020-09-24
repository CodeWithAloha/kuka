import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import type { Theme } from 'src/theme';
import Header from './Header';
import AgendaCreateForm from './AgendaCreateForm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function AgendaCreateView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Agenda Create"
    >
      <Container maxWidth="lg">
        <Header />
        <AgendaCreateForm />
      </Container>
    </Page>
  );
}

export default AgendaCreateView;
