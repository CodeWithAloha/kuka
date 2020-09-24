import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, Container, Divider, Link, makeStyles, Typography } from '@material-ui/core';
import type { Theme } from 'src/theme';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
}));

function LoginView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Box
          mb={8}
          display="flex"
          justifyContent="center"
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
            >
              <div>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h2"
                >
                  Sign in
                </Typography>
              </div>
            </Box>
            <Box
              flexGrow={1}
            >
              <LoginForm />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default LoginView;
