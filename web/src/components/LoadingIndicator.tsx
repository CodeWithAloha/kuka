import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface LoadingIndicatorProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  indicator: {
    position: 'relative',
  },
}));

function LoadingIndicator({ className, ...rest }: LoadingIndicatorProps) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <CircularProgress className={classes.indicator} {...rest} />
    </div>
  );
}

export default LoadingIndicator;
