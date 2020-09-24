import React from 'react';
import clsx from 'clsx';
import type { DropzoneOptions } from "react-dropzone";
import { useDropzone } from 'react-dropzone';
import { Box, makeStyles, Typography } from '@material-ui/core';
import type { Theme } from '../theme';

interface FilesDropzoneProps {
  className?: string;
  onFileDrop: DropzoneOptions['onDrop'];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5
  },
}));

function SingleFileDropzone({ className, onFileDrop, ...rest }: FilesDropzoneProps) {
  const classes = useStyles();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  });

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <Typography
            gutterBottom
            variant="h3"
          >
            Select file
          </Typography>
          <Box mt={2}>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              Drop file here or click to browse your machine
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SingleFileDropzone;
