import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Breadcrumbs, Grid, Link, makeStyles, Typography,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

interface HeaderProps {
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

function Header({ className, ...rest }: HeaderProps) {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/admin"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Agendas
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          Create a new Agenda
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Header;
