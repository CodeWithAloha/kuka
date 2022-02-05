import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Page from "src/components/Page";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import {
  useCollectionDataOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { agendaRef } from "../../../services/AgendaItem";
import type { AgendaItem } from "../../../types/agendaItem";
import type { Testimony } from "../../../types/testimony";
import { storage } from "src/firebase";
import TestimonyCard from "../../../components/TestimonyCard";

const useStyles = makeStyles((theme) => ({
  root: {},
  reactPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  playerWrapper: {
    position: "relative",
    paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
  },
  testimonyCard: {
    marginTop: theme.spacing(3),
  },
}));

function TestimonyDetailView() {
  const classes = useStyles();
  const { agendaId, testimonyId } = useParams();
  const [videoUrl, setVideoUrl] = useState<string>(null);

  const [agendaItem] = useDocumentDataOnce<AgendaItem>(agendaRef.doc(agendaId));

  const [testimonyList] = useCollectionDataOnce<Testimony>(
    agendaRef.doc(agendaId).collection("testimonies"),
    {
      idField: "id",
    }
  );

  const [selectedTestimony] = useDocumentDataOnce<Testimony>(
    agendaRef.doc(agendaId).collection("testimonies").doc(testimonyId)
  );

  useEffect(() => {
    if (selectedTestimony) {
      void storage
        .ref()
        .child(selectedTestimony.fullPath)
        .getDownloadURL()
        .then(setVideoUrl);
    }
  }, [selectedTestimony]);

  return (
    <Page className={classes.root} title="Home">
      <Container maxWidth="lg">
        {agendaItem && (
          <Box mt={6} mb={3}>
            <Typography variant="h2">{agendaItem.title}</Typography>
          </Box>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            {agendaItem && selectedTestimony && videoUrl && (
              <div className={classes.playerWrapper}>
                <ReactPlayer
                  className={classes.reactPlayer}
                  controls
                  height="100%"
                  url={videoUrl}
                  width="100%"
                />
              </div>
            )}
          </Grid>

          <Grid item xs={6} md={3}>
            {testimonyList &&
              testimonyList.map((testimony) => (
                <TestimonyCard
                  className={classes.testimonyCard}
                  agendaId={agendaId}
                  key={testimony.id}
                  testimony={testimony}
                />
              ))}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default TestimonyDetailView;
