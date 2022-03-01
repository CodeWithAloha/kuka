import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { AgendaItem } from '../../../types/agendaItem';
import { agendaRef } from '../../../services/AgendaItem';
import TestimonyCard from '../../../components/TestimonyCard';
import { Testimony } from '../../../types/testimony';

interface AgendaPanelProps {
  agendaItem: AgendaItem;
}

const useStyles = makeStyles((theme) => ({
  root: {

  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function TestimonyListPanel({ agendaItem }: AgendaPanelProps) {
  const classes = useStyles();

  const [testimonies, loading, error] = useCollectionData<Testimony>(
    agendaRef
      .doc(agendaItem.id)
      .collection('testimonies'),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h2">
        Testimonies
      </Typography>

      <Grid container spacing={3}>
        {error && <div>error</div>}
        {loading && <div>loading</div>}
        {testimonies && testimonies.map((testimony) => (
          <Grid item xs={6} md={3} key={testimony.id}>
            <TestimonyCard agendaId={agendaItem.id} testimony={testimony} />
          </Grid>
        ))}
        {testimonies && testimonies.length === 0 && (
          <div>no testimonies found.</div>
        )}

      </Grid>
    </div>
  );
}

export default TestimonyListPanel;
