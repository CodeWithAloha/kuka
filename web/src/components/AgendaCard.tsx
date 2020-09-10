import React from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography, Link } from '@material-ui/core';
import { Agenda } from "../types/agenda";
import { Link as RouterLink } from 'react-router-dom';
import daysRemaining from "../utils/daysRemaining";
import type { Theme } from 'src/theme';
import moment from 'moment';

interface AgendaCardProps {
  agendaItem: Agenda;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


function AgendaCard({ agendaItem }: AgendaCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link
          component={RouterLink}
          to={`/agenda/${agendaItem.id}`}
          underline="none"
        >
          <CardMedia
            className={classes.media}
            image={agendaItem.heroImage || '/static/images/maui-iao-valley.jpg'}
          />
          <CardContent>
            <Box mb={2}>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                {agendaItem.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                Testimony deadline in {daysRemaining(agendaItem.deadlineTime.toDate())} days
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              {agendaItem.subtitle}
            </Typography>

              <Grid
                alignItems="center"
                container
                justify="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Bill
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                  >
                    {agendaItem.billCode}
                  </Typography>
                </Grid>
                <Grid item>
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
                    {moment(agendaItem.hearingTime.toDate()).format('lll')}
                  </Typography>
                </Grid>
              </Grid>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default AgendaCard;
