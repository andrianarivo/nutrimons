import {configureStore} from '@reduxjs/toolkit';
import notesReducer from './notes/notesSlice';
import patientsReducer from './patients/patientsSlice';
import prescriptionsReducer from './prescriptions/prescriptionsSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    patients: patientsReducer,
    prescriptions: prescriptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectNotes = (state: RootState) => state.notes;
export const selectPatients = (state: RootState) => state.patients;
export const selectPrescriptions = (state: RootState) => state.prescriptions;
