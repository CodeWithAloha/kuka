import React from 'react';
import { find } from 'lodash';
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import ReactPlayer from "react-player";
import { useLocation, useParams } from "react-router";
import { agendaRef } from "../../../services/AgendaItem";
import { useDocumentDataOnce, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { testimonyRef } from "../../../services/Testimony";
import type { AgendaItem } from "../../../types/agendaItem";
import type { Testimony } from "../../../types/testimony";
import queryString from 'query-string';
import TestimonyCard from "../../../components/TestimonyCard";


const useStyles = makeStyles(() => ({
  root: {},
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */
  }
}));

function TestimonyDetailView() {
  const classes = useStyles();
  const { agendaId, testimonyId } = useParams();
  const location = useLocation();
  const { indexStr }  = queryString.parse(location.search)
  const index = Number.parseInt(indexStr as string);

  const [agendaItem, agendaLoading, agendaError] = useDocumentDataOnce<AgendaItem>(
    agendaRef.doc(agendaId)
  )

  const [ testimonyList, testimonyListLoading, testimonyListError] = useCollectionDataOnce<Testimony>(
    testimonyRef.orderBy('createdAt'),
    { idField: 'id' }
  )

  const selectedTestimony = find(testimonyList, { id: testimonyId });

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <Container maxWidth="lg">
        { agendaItem && (
          <Box mt={6} mb={3}>
            <Typography variant="h2">
              {agendaItem.title}
            </Typography>
          </Box>
        )}
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={9}
          >
            {agendaItem && selectedTestimony && (
              <div className={classes.playerWrapper}>
                <ReactPlayer
                  className={classes.reactPlayer}
                  controls
                  height={"100%"}
                  url={selectedTestimony.embedUrl}
                  width={"100%"}
                />
              </div>
            )}
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
          >
            {testimonyList && testimonyList.map((testimony) => (
              <TestimonyCard testimony={testimony} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default TestimonyDetailView;
