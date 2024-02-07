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
    return Promise.resolve(db.notes.filter(n => n.patientId === patientId));
  },
);

const updateNote = createAsyncThunk<
  Note[] | undefined,
  {note: Note; patientId: number}
>('nutrimons/updateNote', async ({note, patientId}) => {
  console.log(note);
  return Promise.resolve(db.notes.filter(n => n.patientId === patientId));
});

const addNote = createAsyncThunk<
  Note[] | undefined,
  {note: Note; patientId: number}
>('nutrimons/addNote', async ({note, patientId}) => {
  console.log(note);
  return Promise.resolve(db.notes.filter(n => n.patientId === patientId));
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
    // getNotes
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
    // updateNote
    builder.addCase(updateNote.pending, state => {
      state.loading = true;
      state.error = false;
      state.errMsg = '';
    });
    builder.addCase(updateNote.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.errMsg = '';
      state.noteItems = payload || [];
    });
    builder.addCase(updateNote.rejected, (state, {error}) => {
      state.loading = false;
      state.error = true;
      state.errMsg = error.message;
    });
    // addNote
    builder.addCase(addNote.pending, state => {
      state.loading = true;
      state.error = false;
      state.errMsg = '';
    });
    builder.addCase(addNote.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.errMsg = '';
      state.noteItems = Array.from(payload || []);
    });
    builder.addCase(addNote.rejected, (state, {error}) => {
      state.loading = false;
      state.error = true;
      state.errMsg = error.message;
    });
  },
});

export {getNotes, updateNote, addNote};

export const {deleteNote} = notesSlice.actions;

export default notesSlice.reducer;
