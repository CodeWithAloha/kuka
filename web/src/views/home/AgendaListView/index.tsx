import React, { ChangeEvent, useState } from 'react';
import { Box, Container, Grid, makeStyles, Tab, Tabs } from '@material-ui/core';
import Page from 'src/components/Page';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Agenda } from "../../../types/agenda";
import { agendaRef } from "../../../services/AgendaItem";
import AgendaCard from "../../../components/AgendaCard";


const useStyles = makeStyles(() => ({
  root: {}
}));

function HomeView() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState<string>('upcoming');

  const tabs = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'History' },
  ];


  const [agendaItems, loading, error] = useCollectionData<Agenda>(
    agendaRef
      .where('isActive', '==', true),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );


  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <Container maxWidth="lg">
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>

        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {error && <p>Error retrieving data.</p>}
            {loading && <p>Loading</p>}
            {agendaItems && agendaItems.map((agendaItem) => (
              <Grid item xs={4} key={agendaItem.id}>
                <AgendaCard agendaItem={agendaItem} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default HomeView;
