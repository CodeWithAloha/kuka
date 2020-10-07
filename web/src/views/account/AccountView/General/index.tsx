import React from 'react';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import ProfileCard from './ProfileCard';
import GeneralSettings from './GeneralSettings';

interface GeneralProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

function General({ className, ...rest }: GeneralProps) {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        xs={12}
        lg={3}
      >
        <ProfileCard user={user} />
      </Grid>
      <Grid
        item
        xs={12}
        lg={8}
      >
        <GeneralSettings user={user} />
      </Grid>
    </Grid>
  );
}

export default General;
