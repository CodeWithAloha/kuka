import React from 'react';
import {
  Card, CardActionArea, CardContent, CardMedia, Link, makeStyles, Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Testimony } from '../types/testimony';

interface TestimonyCardProps {
  testimony: Testimony;
}

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(() => ({
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
              Submitted from
              {' '}
              {testimony.zipCode}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default TestimonyCard;
