import React from 'react';
import clsx from 'clsx';
import { Card, CardActionArea, CardContent, Link, makeStyles, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Testimony } from '../types/testimony';

interface TestimonyCardProps {
  agendaId: string;
  testimony: Testimony;
  className?: string
}

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(() => ({
  root: {},
  media: {
    height: 0,
    paddingTop: '60%',
  },
}));

function TestimonyCard({ agendaId, testimony, className }: TestimonyCardProps) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardActionArea>
        <Link
          component={RouterLink}
          to={`/agenda/${agendaId}/testimony/${testimony.id}`}
          underline="none"
        >
          {/*<CardMedia*/}
          {/*  className={classes.media}*/}
          {/*  image={testimony.thumbUrl || '/static/images/undraw_void_3ggu.svg'}*/}
          {/*/>*/}
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
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Position:
              {' '}
              {testimony.position}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default TestimonyCard;
