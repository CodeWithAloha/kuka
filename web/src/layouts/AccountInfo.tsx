import React, { useRef, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Avatar, Box, ButtonBase, Hidden, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

function AccountInfo() {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef<any>(null);
  const { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await logout();
      history.push('/');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        // @ts-ignore
        ref={ref}
      >
        <Avatar
          alt="User"
          className={classes.avatar}
          src={user.avatar}
        />
        <Hidden smDown>
          <Typography
            variant="h6"
            color="inherit"
          >
            {user.name}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem
          component={RouterLink}
          to="/user/account"
        >
          Account
        </MenuItem>
        {/*//TODO: restrict admin link to only admins*/}
        <MenuItem
          component={RouterLink}
          to="/admin"
        >
          Admin
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default AccountInfo;
