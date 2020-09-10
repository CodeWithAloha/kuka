import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Image as ImageIcon, } from 'react-feather';

import {
  Box,
  Link,
  makeStyles,
  Paper,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import type { Theme } from 'src/theme';
import type { Agenda } from "src/types/agenda";
import moment from 'moment';

interface ResultsProps {
  className?: string;
  agendaItems: Agenda[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  imageCell: {
    fontSize: 0,
    width: 68,
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0
  },
  image: {
    height: 68,
    width: 68
  }
}));

function Results({ className, agendaItems, ...rest }: ResultsProps) {
  const classes = useStyles();

  return (
    <TableContainer
      className={clsx(classes.root, className)}
      component={Paper}
      {...rest}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Hearing Time</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agendaItems.map((agendaItem) => {
            return (
              <TableRow
                hover
                key={agendaItem.id}
              >
                <TableCell className={classes.imageCell}>
                  {agendaItem.heroImage ? (
                    <img
                      alt="Bill Preview"
                      src={agendaItem.heroImage}
                      className={classes.image}
                    />
                  ) : (
                    <Box
                      p={2}
                      bgcolor="background.paper"
                    >
                      <SvgIcon>
                        <ImageIcon />
                      </SvgIcon>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    variant="body1"
                    color="textPrimary"
                    component={RouterLink}
                    underline="none"
                    to={`/admin/agenda-detail/${agendaItem.id}/edit`}
                  >
                    {agendaItem.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {moment(agendaItem.hearingTime.toDate()).format('lll')}
                </TableCell>
                <TableCell>{agendaItem.isActive ? 'Active' : 'Inactive'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Results;
