import React from 'react';
import { Typography } from "@material-ui/core";
import { Agenda } from "../../../types/agenda";
import { makeStyles } from "@material-ui/core";

interface AgendaPanelProps {
  agendaItem: Agenda;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  descriptionText: {
    marginTop: theme.spacing(3)
  }
}));


function AgendaPanel({ agendaItem }: AgendaPanelProps){
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant={"h1"}
      >
        {agendaItem.title}
      </Typography>

      <Typography
        variant="body1"
        className={classes.descriptionText}
      >
        <span dangerouslySetInnerHTML={{ __html: agendaItem.description }} />
      </Typography>
    </div>
  )
}

export default AgendaPanel;
