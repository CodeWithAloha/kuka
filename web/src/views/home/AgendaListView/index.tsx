import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Container, makeStyles, Tab, Tabs } from '@material-ui/core';
import { useHistory, useParams } from "react-router-dom";
import Page from 'src/components/Page';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AgendaItem } from "../../../types/agendaItem";
import { agendaRef } from "../../../services/AgendaItem";
import AgendaRows from './AgendaRows'


const useStyles = makeStyles(() => ({
  root: {}
}));

function HomeView() {
  const history = useHistory();
  const classes = useStyles();
  let { currentTab } = useParams();
  const [query, setQuery] = useState(
    agendaRef.where('isActive', '==', true)
  );
  currentTab = currentTab || 'upcoming';
  const tabs = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'history', label: 'History' },
  ];

  useEffect(() => {
    let q;

    if (currentTab === 'history') {
      // TODO: items need to be submitted a few business days prior to session time.
      q = agendaRef
        .where('sessionTime', '<', new Date())
        .orderBy("sessionTime", "desc")
    } else {
      q = agendaRef
        .where('sessionTime', '>', new Date())
        .orderBy("sessionTime", "asc")
    }

    setQuery(q);

  }, [currentTab])

  const [agendaItems, loading, error] = useCollectionData<AgendaItem>(
    query,
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    history.push(`/${value}`)
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
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <p>Loading</p>}
          {agendaItems && <AgendaRows agendaItems={agendaItems} />}
        </Box>
      </Container>
    </Page>
  );
}

export default HomeView;
