import React from 'react';
import clsx from 'clsx';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core';
import type { Theme } from 'src/theme';

interface QuillEditorProps {
  className?: string;
  [key: string]: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .ql-toolbar': {
      borderLeft: 'none',
      borderTop: 'none',
      borderRight: 'none',
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    '& .ql-container': {
      border: 'none',
      '& .ql-editor': {
        fontFamily: theme.typography.fontFamily,
        fontSize: 16
      }
    }
  }
}));

function QuillEditor({ className, ...rest }: QuillEditorProps) {
  const classes = useStyles();

  return (
    // @ts-ignore
    <ReactQuill
      className={clsx(classes.root, className)}
      {...rest}
    />
  );
}

export default QuillEditor;
