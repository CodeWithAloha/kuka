/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Calendar as CalendarIcon } from 'react-feather';
import Logo from 'src/components/Logo';

interface NavBarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  nested: {
    paddingLeft: theme.spacing(5),
  },
}));

function NavBar({ onMobileClose, openMobile }: NavBarProps) {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Hidden lgUp>
        <Box
          p={2}
          display="flex"
          justifyContent="center"
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
      </Hidden>
      <Divider />

      <List>
        <ListItem button component={NavLink} to="/admin/agenda-list">
          <ListItemIcon><CalendarIcon /></ListItemIcon>
          <ListItemText primary="Agenda Items" />
        </ListItem>
        <ListItem button component={NavLink} to="/admin/testimony-list">
          <ListItemIcon><CalendarIcon /></ListItemIcon>
          <ListItemText primary="Testimonies" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

export default NavBar;
