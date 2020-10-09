import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar, Box, Hidden, IconButton, makeStyles, SvgIcon, Toolbar,
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import Logo from 'src/components/Logo';
import type { Theme } from 'src/theme';
import AccountInfo from '../AccountInfo';

interface TopBarProps {
  className?: string;
  onSideNavOpen?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
  },
  toolbar: {
    height: 64,
  },
}));

function TopBar({ className, onSideNavOpen, ...rest }: TopBarProps) {
  const classes = useStyles();

  return (
    <AppBar
      color="default"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSideNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Box ml={2}>
          <AccountInfo />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
