import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  makeStyles,
  Typography
} from '@material-ui/core';
import { AgendaItem } from "../../../types/agendaItem";
import { Link as RouterLink } from 'react-router-dom';
import { format } from "date-fns";
import { DATE_FMT_LONG } from "../../../constants";

interface AgendaCardProps {
  agendaItem: AgendaItem;
}

const useStyles = makeStyles(() => ({
  root: {},
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
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
            </Box>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              {agendaItem.agendaType}
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
                  {format(agendaItem.sessionTime.toDate(), DATE_FMT_LONG)}
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
