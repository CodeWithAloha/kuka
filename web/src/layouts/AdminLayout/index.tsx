import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import type { Theme } from 'src/theme';
import NavBar from './NavBar';
import TopBar from './TopBar';

interface AdminLayoutProps {
  children?: ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

function AdminLayout({ children }: AdminLayoutProps){
  const classes = useStyles();
  const [isSideNavOpen, setSideNavOpen] = useState<boolean>(false);

  return (
    <div className={classes.root}>
      <TopBar onSideNavOpen={() => setSideNavOpen(true)} />
      <NavBar
        onMobileClose={() => setSideNavOpen(false)}
        openMobile={isSideNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

