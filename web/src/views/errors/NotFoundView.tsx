import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import type { Theme } from 'src/theme';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

function NotFoundView() {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page
      className={classes.root}
      title="404: Not found"
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant={mobileDevice ? 'h4' : 'h1'}
          color="textPrimary"
        >
          404: Not found.
        </Typography>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
        >
          <Button
            color="secondary"
            component={RouterLink}
            to="/"
            variant="outlined"
          >
            Home Page
          </Button>
        </Box>
      </Container>
    </Page>
  );
}

export default NotFoundView;
