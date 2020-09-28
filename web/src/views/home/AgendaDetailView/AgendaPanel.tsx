import React from 'react';
import { Typography } from "@material-ui/core";
import { AgendaItem } from "../../../types/agendaItem";
import { makeStyles, Link } from "@material-ui/core";
import MuiLinkify from 'material-ui-linkify';

interface AgendaPanelProps {
  agendaItem: AgendaItem;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  preformatted: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    whiteSpace: 'pre-wrap',
    wordBreak: 'keep-all',
  },
  header: {
    marginTop: theme.spacing(3),
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

      <pre className={classes.preformatted}>
        {agendaItem.description.trim()}
      </pre>

      <Typography variant={"h3"} className={classes.header}>Location</Typography>
      <pre className={classes.preformatted}>
        <MuiLinkify>{agendaItem.location.trim()}</MuiLinkify>
      </pre>

      <Typography variant={"h3"} className={classes.header}>Attachments</Typography>
      {agendaItem.attachments.length === 0 && (
        <p>No attachments found.</p>
      )}
      {agendaItem.attachments.map((attachment) => {
        return (
          <Typography key={attachment.id}>
            <Link href={attachment.link}>
              {attachment.fileName}
            </Link>
            </Typography>
        )
      })}

    </div>
  )
}

export default AgendaPanel;
