import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import {
  Box, Container, Divider, makeStyles, Tab, Tabs,
} from '@material-ui/core';
import Page from 'src/components/Page';
import type { Theme } from 'src/theme';
import Header from './Header';
import General from './General';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function AccountView() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState<string>('general');

  const tabs = [
    { value: 'general', label: 'General' },
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        <Header />
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
        <Divider />
        <Box mt={3}>
          {currentTab === 'general' && <General />}
        </Box>
      </Container>
    </Page>
  );
}

export default AccountView;
