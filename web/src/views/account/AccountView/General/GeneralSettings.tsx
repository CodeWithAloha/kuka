import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import type { User } from 'src/types/user';
import { Profile } from "src/types/profile";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { profileRef, updateProfile } from "../../../../services/Profile";
import LoadingIndicator from "../../../../components/LoadingIndicator";

interface GeneralSettingsProps {
  className?: string;
  user: User;
}

const useStyles = makeStyles(() => ({
  root: {}
}));

function GeneralSettings({ className, user, ...rest }: GeneralSettingsProps) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [profile, isProfileLoading, hasProfileError] = useDocumentData<Profile>(profileRef.doc(user.id));

  if (isProfileLoading) return <LoadingIndicator />;
  if (hasProfileError) return <div>error loading profile</div>;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        zipCode: profile.zipCode || '',
        lobbyGroup: profile.lobbyGroup || '',
      }}
      validationSchema={Yup.object().shape({
        zipCode: Yup.string().max(32),
        lobbyGroup: Yup.string().max(255),
      })}
      onSubmit={async (values, {
        setSubmitting
      }) => {
        setSubmitting(true);
        await updateProfile(user.id, values)
          .then(() => {
            enqueueSnackbar('Profile updated', {
              variant: 'success'
            });
          })
          .catch(() => {})
          .finally(() => {
            setSubmitting(false);
          })
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    value={user.name}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={user.email}
                    variant="outlined"
                    disabled
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="zipCode"
                    value={values.zipCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    error={Boolean(touched.zipCode && errors.zipCode)}
                    helperText={touched.zipCode && errors.zipCode ? errors.zipCode : 'Your zipcode will be used for testimony submission.'}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Lobbying Group"
                    name="lobbyGroup"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    value={values.lobbyGroup}
                    error={Boolean(touched.lobbyGroup && errors.lobbyGroup)}
                    helperText={touched.lobbyGroup && errors.lobbyGroup ? errors.lobbyGroup : "Fill this in if you're submitting testimony on behalf of a lobbying group."}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

export default GeneralSettings;
