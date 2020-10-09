import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Breadcrumbs, Link, makeStyles, Typography,
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
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" to="/admin" component={RouterLink}>
          Dashboard
        </Link>
        <Typography color="textPrimary">
          Account
        </Typography>
      </Breadcrumbs>
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Settings
      </Typography>
    </div>
  );
}

export default Header;
