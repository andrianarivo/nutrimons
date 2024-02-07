import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Note} from '../../../types';
import db from '../../db';

export interface NoteSliceState {
  noteItems: Note[];
  loading: boolean;
  error: boolean;
  errMsg?: string;
}

const initialState: NoteSliceState = {
  noteItems: [],
  loading: true,
  error: false,
  errMsg: '',
};

const getNotes = createAsyncThunk<Note[] | undefined, number>(
  'nutrimons/getNotes',
  async patientId => {
    return Promise.resolve(
      db.patients.find(patient => patient.id === patientId)?.notes,
    );
  },
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    updateNote: (state, {payload}) => ({
      ...state,
      noteItems: state.noteItems.map(note =>
        note.id === payload.id ? payload : note,
      ),
    }),
    addNote: (state, {payload}) => ({
      ...state,
      noteItems: [...state.noteItems, payload],
    }),
    deleteNote: (state, {payload}) => ({
      ...state,
      noteItems: state.noteItems.filter(note => note.id !== payload.id),
    }),
  },
  extraReducers: builder => {
    builder.addCase(getNotes.pending, state => {
      state.loading = true;
      state.error = false;
      state.errMsg = '';
    });
    builder.addCase(getNotes.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.errMsg = '';
      if (payload) {
        state.noteItems = payload;
      }
    });
    builder.addCase(getNotes.rejected, (state, {error}) => {
      state.loading = false;
      state.error = true;
      state.errMsg = error.message;
    });
  },
});

export {getNotes};

export const {updateNote, addNote} = notesSlice.actions;

export default notesSlice.reducer;
