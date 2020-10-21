import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { pick } from 'lodash';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Link,
  makeStyles,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { updateAgendaItem } from 'src/services/AgendaItem';
import firebase, { storage } from 'src/firebase';
import type { AgendaItem } from 'src/types/agendaItem';
import SingleFileDropzone from 'src/components/SingleFileDropzone';
import getSafeFilename from '../../../utils/getSafeFilename';

interface AgendaCreateFormProps {
  className?: string;
  agendaItem?: AgendaItem;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  editor: {
    '& .ql-editor': {
      height: 400,
    },
  },
  heroPreview: {
    objectFit: 'contain',
  },
}));

function AgendaForm({ className, agendaItem, ...rest }: AgendaCreateFormProps) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const updateRecord = async (values, setStatus, setSubmitting) => {
    await updateAgendaItem(agendaItem.id, values).then(() => {
      setStatus({ success: true });
      setSubmitting(true);
      enqueueSnackbar('Agenda Item Updated', {
        variant: 'success',
      });
    }).catch((err) => {
      console.error(err);
      enqueueSnackbar('There was an error updating the record', {
        variant: 'error',
      });
      setStatus({ success: false });
      setSubmitting(false);
    });
  };

  const handleFileUpload = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    const newFilename = getSafeFilename(file.name);

    const task = storage.ref()
      .child(`agenda-images/${agendaItem.id}/${newFilename}`)
      .put(file);

    task.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      error: (snapshot) => {
        console.log('error uploading file');
        console.log(snapshot);
      },
      complete: () => {
        task.snapshot.ref
          .getDownloadURL()
          .then((value) => {
            setFieldValue('heroImage', value);
          })
          .catch((err) => {
            throw new Error(err);
          });
      },
    });
  };

  return (
    <Formik
      initialValues={{
        ...pick(
          agendaItem,
          [
            'isActive',
            'heroImage',
          ],
        ),
      }}
      validationSchema={
        Yup.object().shape({
          heroImage: Yup.string(),
          isActive: Yup.bool(),
        })
      }
      onSubmit={async (values, {
        setStatus,
        setSubmitting,
      }) => {
        await updateRecord(values, setStatus, setSubmitting);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldValue,
        values,
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={8}
            >
              <Card>
                <CardContent>
                  <TextField
                    fullWidth
                    label="Agenda Title"
                    value={agendaItem.title}
                    variant="outlined"
                    disabled
                  />
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          label="Bill Code"
                          fullWidth
                          value={agendaItem.billCode}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Hero Image" />
                  <Divider />
                  {values.heroImage ? (
                    <CardMedia
                      classes={{
                        media: classes.heroPreview,
                      }}
                      component="img"
                      height="200"
                      image={values.heroImage}
                    />
                  ) : null}
                  <CardContent>
                    <SingleFileDropzone
                      onFileDrop={(files) => handleFileUpload(files, setFieldValue)}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <Card>
                <CardHeader title="Publish Details" />
                <Divider />
                <CardContent>
                  <Box mb={2}>
                    <Link
                      variant="body1"
                      component={RouterLink}
                      to={`/agenda/${agendaItem.id}`}
                    >
                      Scoreboard Link
                    </Link>
                  </Box>

                  <Typography
                    variant="h5"
                    color="textPrimary"
                    gutterBottom
                  >
                    Active Item
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    Mark the item as active and allow users to submit testimonies.
                  </Typography>
                  <Switch
                    checked={values.isActive}
                    color="secondary"
                    edge="start"
                    name="isActive"
                    onChange={handleChange}
                    value={values.isActive}
                  />

                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box mt={2}>
            <div>{isValid}</div>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {agendaItem ? 'Update' : 'Create'}
              {' '}
              Agenda Item
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default AgendaForm;
