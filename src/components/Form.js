import React from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router';

const validationSchema = yup.object({
  Nama: yup.string('Enter your Name').required('Name is required'),
  NIS: yup
    .number('Enter your NIS')
    .min(8, 'NIS should be of minimum 8 characters length')
    .required('NIS is required'),
});

const WithMaterialUI = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      Nama: '',
      NIS: '',
      AbsenMasuk: '',
      AbsenPulang: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      let data = {};
      if (new Date().toLocaleTimeString() < 12) {
        data = {
          id: nanoid(16),
          Nama: values.Nama,
          NIS: values.NIS,
          AbsenMasuk: new Date().toLocaleTimeString(),
          Tanggal: new Date().toLocaleDateString('en-GB', {
            timeZone: 'Asia/Makassar',
          }),
        };
        console.log(data);
        resetForm();
      } else {
        data = {
          id: nanoid(16),
          Nama: values.Nama,
          NIS: values.NIS,
          AbsenPulang: new Date().toLocaleTimeString(),
          Tanggal: new Date().toLocaleDateString('en-GB', {
            timeZone: 'Asia/Makassar',
          }),
        };
        console.log(data);
      }
      try {
        const res = await fetch(
          `https://sheet.best/api/sheets/a5cd8656-837b-486d-b53d-7d4b80058ffe`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
        console.log(JSON.stringify(data));

        if (res.ok) {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    },
    // onSubmit: (values, { resetForm }) => {

    // },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextField
        id="Nama"
        name="Nama"
        label="Nama"
        sx={{ mt: '1rem' }}
        value={formik.values.Nama}
        onChange={formik.handleChange}
        error={formik.touched.Nama && Boolean(formik.errors.Nama)}
        helperText={formik.touched.Nama && formik.errors.Nama}
      />
      <TextField
        id="NIS"
        name="NIS"
        label="NIS"
        sx={{ mt: '1rem' }}
        value={formik.values.NIS}
        onChange={formik.handleChange}
        error={formik.touched.NIS && Boolean(formik.errors.NIS)}
        helperText={formik.touched.NIS && formik.errors.NIS}
      />
      <FormLabel component="legend" sx={{ mt: '2rem' }}>
        Absensi
      </FormLabel>
      <RadioGroup
        aria-label="Absensi"
        defaultValue=""
        name="radio-buttons-group"
      >
        {new Date().getHours() < 12 ? (
          <FormControlLabel
            onChange={formik.handleChange}
            value="Masuk"
            name="AbsenMasuk"
            control={<Radio />}
            label="Masuk"
          />
        ) : (
          <FormControlLabel
            onChange={formik.handleChange}
            value="Pulang"
            name="AbsenPulang"
            control={<Radio />}
            label="Pulang"
          />
        )}
      </RadioGroup>
      <Button
        color="primary"
        variant="contained"
        sx={{ mt: '1rem', py: '0.7rem' }}
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

export default WithMaterialUI;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`;
