import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Patient} from '../../../types';
import db from '../../db';

export interface PatientSliceState {
  patientItems: Patient[];
  loading: boolean;
  error: boolean;
  errMsg?: string;
}

const initialState: PatientSliceState = {
  patientItems: [],
  loading: true,
  error: false,
  errMsg: '',
};

const getPatients = createAsyncThunk<Patient[] | undefined>(
  'nutrimons/getPatients',
  async () => {
    return Promise.resolve(db.patients);
  },
);

const updatePatient = createAsyncThunk<Patient | undefined, {patient: Patient}>(
  'nutrimons/updatePatient',
  async ({patient}) => {
    const idx = db.patients.findIndex(p => p.id === patient.id);
    db.patients.splice(idx, 1, patient);
    return Promise.resolve(patient);
  },
);

const addPatient = createAsyncThunk<Patient | undefined, {patient: Patient}>(
  'nutrimons/addPatient',
  async ({patient}) => {
    db.patients.push(patient);
    return Promise.resolve(patient);
  },
);

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    deletePatient: (state, {payload}) => ({
      ...state,
      patientItems: state.patientItems.filter(
        patient => patient.id !== payload.id,
      ),
    }),
  },
  extraReducers: builder => {
    builder.addCase(getPatients.pending, state => {
      state.loading = true;
      state.error = false;
      state.errMsg = '';
    });
    builder.addCase(getPatients.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.errMsg = '';
      if (payload) {
        state.patientItems = payload;
      }
    });
    builder.addCase(getPatients.rejected, (state, {error}) => {
      state.loading = false;
      state.error = true;
      state.errMsg = error.message;
    });
  },
});

export {getPatients, addPatient, updatePatient};

export const {deletePatient} = patientSlice.actions;

export default patientSlice.reducer;
