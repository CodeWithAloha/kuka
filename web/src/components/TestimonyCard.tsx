import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Link, makeStyles, Typography } from '@material-ui/core';
import { Testimony } from "../types/testimony";
import { Link as RouterLink } from 'react-router-dom';
import type { Theme } from 'src/theme';

interface TestimonyCardProps {
  testimony: Testimony;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: '60%',
  },
}));


function TestimonyCard({ testimony }: TestimonyCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link
          component={RouterLink}
          to={`/agenda/${testimony.agendaId}/testimony/${testimony.id}`}
          underline="none"
        >
          <CardMedia
            className={classes.media}
            image={testimony.thumbUrl || '/static/images/undraw_void_3ggu.svg'}
          />
          <CardContent>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              Testimony
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Submitted from {testimony.zipCode}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default TestimonyCard;
