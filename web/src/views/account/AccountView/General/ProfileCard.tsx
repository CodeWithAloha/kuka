import React from 'react';
import clsx from 'clsx';
import {
  Avatar, Box, Card, CardContent, makeStyles, Typography, Chip,
} from '@material-ui/core';
import { Face as FaceIcon } from '@material-ui/icons';
import type { Theme } from 'src/theme';
import type { User } from 'src/types/user';

interface ProfileDetailsProps {
  className?: string;
  user: User;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  name: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    height: 100,
    width: 100,
  },
  userId: {
    fontSize: '10px',
    color: theme.palette.text.hint,
    marginTop: theme.spacing(2),
  },
}));

function ProfileCard({ className, user, ...rest }: ProfileDetailsProps) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Box mt={2}>
            <Typography
              className={classes.name}
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              {user.name}
            </Typography>
            <Typography
              variant="body2"
            >
              {user.email}
            </Typography>
            <Typography
              className={classes.userId}
            >
              {user.id}
            </Typography>
          </Box>
          <Box mt={2}>
            {user.isAdmin && (
              <Chip
                label="Admin"
                variant="outlined"
                color="secondary"
                icon={<FaceIcon />}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
