import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Edit as EditIcon } from '@material-ui/icons';
import type { Theme } from 'src/theme';
import { addBusinessDays, format } from 'date-fns';
import { truncate } from 'lodash';
import useAuth from '../../../hooks/useAuth';
import { AgendaItem } from '../../../types/agendaItem';
import { DATETIME_FMT_HUMANIZED } from '../../../constants';

interface AgendaCardProps {
  agendaItems: AgendaItem[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  cardTitle: {
    color: theme.palette.text.secondary,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'inherit',
  },
  image: {
    display: 'flex',
    flex: '1 0 auto',
    width: '25%',
  },
}));

function AgendaRows({ agendaItems }: AgendaCardProps) {
  const classes = useStyles();
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      {agendaItems.length === 0 && (
        <Typography variant="h3">No upcoming agenda items found</Typography>
      )}
      {agendaItems.map((agendaItem) => (
        <Card variant="outlined" className={classes.root} key={agendaItem.id}>
          <CardHeader
            title={agendaItem.billCode}
            subheader={agendaItem.agendaType}
            action={isAuthenticated && user.isAdmin && (
              <IconButton
                aria-label="edit"
                component={RouterLink}
                to={`/admin/agenda-detail/${agendaItem.id}/edit`}
              >
                <EditIcon />
              </IconButton>
            )}
          />
          <Divider />
          <div className={classes.cardBody}>
            {agendaItem.heroImage && (
              <CardMedia
                className={classes.image}
                image={agendaItem.heroImage}
                title={agendaItem.title}
              />
            )}
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={9}>
                  <Typography variant="h4">
                    <Link
                      component={RouterLink}
                      to={`/agenda/${agendaItem.id}`}
                    >
                      {agendaItem.title}
                    </Link>
                  </Typography>
                  <Typography
                    variant="body1"
                  >
                    {truncate(agendaItem.description, { length: 500 })}
                  </Typography>
                </Grid>

                <Grid item md={3}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Agenda File
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                  >
                    {agendaItem.agendaFile ? (
                      <Link href={agendaItem.agendaFile}>Link to File</Link>
                    ) : (
                      <span>N/A</span>
                    )}
                  </Typography>
                  <br />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Calendar Link
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                  >
                    <Link href={agendaItem.eventUrl}>Link</Link>
                  </Typography>
                  <br />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Testimony Due By
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                  >
                    {format(
                      addBusinessDays(agendaItem.sessionTime.toDate(), -1),
                      DATETIME_FMT_HUMANIZED,
                    )}
                  </Typography>
                  <br />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Hearing On
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                  >
                    {format(agendaItem.sessionTime.toDate(), DATETIME_FMT_HUMANIZED)}
                  </Typography>

                </Grid>

              </Grid>
            </CardContent>
          </div>

        </Card>
      ))}
    </>
  );
}

export default AgendaRows;
