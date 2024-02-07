import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Prescription} from '../../../types';
import db from '../../db';

export interface PrescriptionSliceState {
  prescriptionItems: Prescription[];
  loading: boolean;
  error: boolean;
  errMsg?: string;
}

const initialState: PrescriptionSliceState = {
  prescriptionItems: [],
  loading: true,
  error: false,
  errMsg: '',
};

const getPrescriptions = createAsyncThunk<
  Prescription[] | undefined,
  {noteId: number; patientId: number}
>('nutrimons/getPrescriptions', async ({noteId, patientId}) => {
  return Promise.resolve(
    db.patients.find(p => p.id === patientId)?.notes?.find(n => n.id === noteId)
      ?.prescriptions,
  );
});

const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState,
  reducers: {
    updatePrescription: (state, {payload}) => ({
      ...state,
      prescriptionItems: state.prescriptionItems.map(prescription =>
        prescription.id === payload.id ? payload : prescription,
      ),
    }),
    addPrescription: (state, {payload}) => ({
      ...state,
      prescriptionItems: [...state.prescriptionItems, payload],
    }),
    deletePrescription: (state, {payload}) => ({
      ...state,
      prescriptionItems: state.prescriptionItems.filter(
        prescription => prescription.id !== payload.id,
      ),
    }),
  },
  extraReducers: builder => {
    builder.addCase(getPrescriptions.pending, state => {
      state.loading = true;
      state.error = false;
      state.errMsg = '';
    });
    builder.addCase(getPrescriptions.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.errMsg = '';
      if (payload) {
        state.prescriptionItems = payload;
      }
    });
    builder.addCase(getPrescriptions.rejected, (state, {error}) => {
      state.loading = false;
      state.error = true;
      state.errMsg = error.message;
    });
  },
});

export {getPrescriptions};

export const {updatePrescription, addPrescription, deletePrescription} =
  prescriptionSlice.actions;

export default prescriptionSlice.reducer;
