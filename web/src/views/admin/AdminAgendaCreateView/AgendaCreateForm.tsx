import React from 'react';

import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { format, parse } from "date-fns";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  FormHelperText,
  Grid,
  makeStyles,
  Paper,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import QuillEditor from 'src/components/QuillEditor';
import { createAgendaItem, updateAgendaItem } from 'src/services/AgendaItem';
import firebase, { storage } from "src/firebase";
import type { AgendaItem } from "src/types/agendaItem";
import SingleFileDropzone from "src/components/SingleFileDropzone";
import { DATE_FMT_FORM } from "src/constants";
import getSafeFilename from "../../../utils/getSafeFilename";


interface AgendaCreateFormProps {
  className?: string;
  agendaItem?: AgendaItem;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  editor: {
    '& .ql-editor': {
      height: 400
    }
  },
  heroPreview: {
    objectFit: 'contain'
  }
}));

function AgendaCreateForm({ className, agendaItem, ...rest }: AgendaCreateFormProps){
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const updateRecord = async (values, setStatus, setSubmitting) => {
    await updateAgendaItem(agendaItem.id, values).then(() => {
      setStatus({ success: true });
      setSubmitting(true);
      enqueueSnackbar('Agenda Item Updated', {
        variant: 'success'
      });
    }).catch((err) => {
      console.error(err);
      enqueueSnackbar('There was an error updating the record', {
        variant: 'error'
      });
      setStatus({ success: false });
      setSubmitting(false);
    })
  }

  const createRecord = async (values, setStatus, setSubmitting) => {
    createAgendaItem(values).then((docRef) => {
      setStatus({ success: true });
      setSubmitting(true);
      enqueueSnackbar('Agenda Item Created', {
        variant: 'success'
      });
      history.push(`/admin/agenda-detail/${docRef.id}/edit`);
    }).catch((err) => {
      console.error(err);
      setStatus({ success: false });
      setSubmitting(false);
    })
  }

  const handleFileUpload = (acceptedFiles, setFieldValue) => {
    const file = acceptedFiles[0];
    const newFilename = getSafeFilename(file.name);

    const task = storage.ref()
      .child(`agenda-images/${agendaItem.id}/${newFilename}`)
      .put(file)

    task.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      'error': (snapshot) => {
        console.log("error uploading file")
        console.log(snapshot)
      },
      'complete': () => {
        task.snapshot.ref.getDownloadURL().then((value) => {
          setFieldValue('heroImage', value)
        })
      }
    })
  }

  let initialValues = {
    title: '',
    subtitle: '',
    description: '',
    billCode: '',
    sessionTime: format(new Date(), DATE_FMT_FORM),
    deadlineTime: format(new Date(), DATE_FMT_FORM),
    heroImage: '',
    isActive: false,
  }
  if (agendaItem) {
    initialValues = {
      ...initialValues,
      ...agendaItem,
      sessionTime: format(agendaItem.sessionTime.toDate(), DATE_FMT_FORM),
      deadlineTime: format(agendaItem.deadlineTime.toDate(), DATE_FMT_FORM),
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(128).required(),
        subtitle: Yup.string().max(255).required(),
        description: Yup.string().max(10240),
        billCode: Yup.string().max(32).required("Bill Code is required."),
        heroImage: Yup.string(),
        sessionTime: Yup.date(),
        deadlineTime: Yup.date(),
        isActive: Yup.bool(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        const newData = {
          ...values,
          deadlineTime: firebase.firestore.Timestamp.fromDate(parse(values.deadlineTime, DATE_FMT_FORM, new Date())),
          sessionTime: firebase.firestore.Timestamp.fromDate(parse(values.sessionTime, DATE_FMT_FORM, new Date())),
        };
        if (agendaItem) {
          await updateRecord(newData, setStatus, setSubmitting);
        } else {
          await createRecord(newData, setStatus, setSubmitting);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldValue,
        touched,
        values
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
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label="Agenda Title"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                  />
                  <Box mt={3}>
                    <TextField
                      error={Boolean(touched.subtitle && errors.subtitle)}
                      fullWidth
                      helperText={touched.subtitle && errors.subtitle ? errors.subtitle : 'Short description shown on the Agenda item card'}
                      label="Subtitle"
                      name="subtitle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.subtitle}
                      variant="outlined"
                    />
                  </Box>
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          error={Boolean(touched.billCode && errors.billCode)}
                          helperText={touched.billCode && errors.billCode}
                          label="Bill Code"
                          fullWidth
                          name="billCode"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.billCode}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          label="Hearing Date and Time"
                          type="datetime-local"
                          name="sessionTime"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleChange}
                          value={values.sessionTime}
                          error={Boolean(touched.sessionTime && errors.sessionTime)}
                          helperText={touched.sessionTime && errors.sessionTime}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Description
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.description}
                      onChange={(value: string) => setFieldValue('description', value)}
                    />
                  </Paper>
                  {(touched.description && errors.description) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Hero Image" />
                  <Divider />
                  {values.heroImage ? (
                    <CardMedia
                      classes={{
                        media: classes.heroPreview
                      }}
                      component="img"
                      height="200"
                      image={values.heroImage}
                    />
                  ) : null}
                  <CardContent>
                    <SingleFileDropzone onFileDrop={(files) => handleFileUpload(files, setFieldValue)}/>
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
              {agendaItem ? 'Update' : 'Create'} Agenda Item
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default AgendaCreateForm;
