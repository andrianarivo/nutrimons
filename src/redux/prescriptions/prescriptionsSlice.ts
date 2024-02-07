import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Prescription} from '../../../types';
import {storage} from '../../db';

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
  number | undefined
>('nutrimons/getPrescriptions', async noteId => {
  const prescriptionsJSON = storage.getString('prescriptions');
  if (prescriptionsJSON) {
    const prescriptions = JSON.parse(prescriptionsJSON);
    return Promise.resolve(
      prescriptions.filter((p: Prescription) => p.noteId === noteId),
    );
  }
  return Promise.resolve([]);
});

const addPrescription = createAsyncThunk<
  Prescription | undefined,
  {prescription: Prescription; noteId: number}
>('nutrimons/addPrescription', async ({prescription, noteId}) => {
  const prescriptionsJSON = storage.getString('prescriptions');
  prescription.noteId = noteId;
  if (prescriptionsJSON) {
    const prescriptions = JSON.parse(prescriptionsJSON);
    prescription.id = prescriptions.length + 1;
    prescriptions.push(prescription);
    storage.set('prescriptions', JSON.stringify(prescriptions));
  } else {
    prescription.id = 1;
    storage.set('prescriptions', JSON.stringify([prescription]));
  }
  return Promise.resolve(prescription);
});

const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // getPrescriptions
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
    // addPrescription
    builder.addCase(addPrescription.pending, state => {
      state.loading = true;
      state.error = false;
      state.errMsg = '';
    });
    builder.addCase(addPrescription.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.errMsg = '';
      if (payload) {
        state.prescriptionItems = [...state.prescriptionItems, payload];
      }
    });
    builder.addCase(addPrescription.rejected, (state, {error}) => {
      state.loading = false;
      state.error = true;
      state.errMsg = error.message;
    });
  },
});

export {getPrescriptions, addPrescription};

export default prescriptionSlice.reducer;
