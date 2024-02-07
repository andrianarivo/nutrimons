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

const updateNote = createAsyncThunk<
  Note | undefined,
  {note: Note; patientId: number}
>('nutrimons/updateNote', async ({note, patientId}) => {
  const idx =
    db.patients
      .find(p => p.id === patientId)
      ?.notes?.findIndex(n => n.id === patientId) || 0;
  db.patients.find(p => p.id === patientId)?.notes?.splice(idx, 1, note);
  return Promise.resolve(note);
});

const addNote = createAsyncThunk<
  Note | undefined,
  {note: Note; patientId: number}
>('nutrimons/addNote', async ({note, patientId}) => {
  db.patients.find(p => p.id === patientId)?.notes?.push(note);
  return Promise.resolve(note);
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
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

export {getNotes, updateNote, addNote};

export const {deleteNote} = notesSlice.actions;

export default notesSlice.reducer;
