import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Box, Link, makeStyles, Toolbar, Button } from '@material-ui/core';
import Logo from 'src/components/Logo';
import useAuth from "../../hooks/useAuth";
import AccountInfo from "../AccountInfo";

interface TopBarProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
  },
  toolbar: {
    height: 64
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

function TopBar({ className, ...rest }: TopBarProps) {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.logo} />
        </RouterLink>
        <Box ml={3}>
          <Button
            component={RouterLink}
            to="/"
            color="primary"
          >
            Agenda
          </Button>
        </Box>
        <Box flexGrow={1} />
        { isAuthenticated ? (
          <AccountInfo />
        ) : (
          <Link
            className={classes.link}
            color="textSecondary"
            component={RouterLink}
            to="/login"
            underline="none"
            variant="body2"
          >
            Login
          </Link>
        )}

      </Toolbar>
    </AppBar>
  );
}


export default TopBar;
