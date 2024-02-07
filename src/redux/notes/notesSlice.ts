import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Note} from '../../../types';
import {storage} from '../../db';

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
    const notesJSON = storage.getString('notes');
    if (notesJSON) {
      const notes = JSON.parse(notesJSON);
      return Promise.resolve(
        notes.filter((n: Note) => n.patientId === patientId),
      );
    }
    return Promise.resolve([]);
  },
);

const updateNote = createAsyncThunk<
  Note | undefined,
  {note: Note; patientId: number}
>('nutrimons/updateNote', async ({note, patientId}, thunkAPI) => {
  const notesJSON = storage.getString('notes');
  note.patientId = patientId;
  if (notesJSON) {
    const notes = JSON.parse(notesJSON);
    const target = notes.findIndex((n: Note) => n.id === note.id);
    notes.splice(target, 1, note);
    storage.set('notes', JSON.stringify(notes));
    return Promise.resolve(note);
  }
  return thunkAPI.rejectWithValue('Note not found');
});

const addNote = createAsyncThunk<
  Note | undefined,
  {note: Note; patientId: number}
>('nutrimons/addNote', async ({note, patientId}) => {
  const notesJSON = storage.getString('notes');
  note.patientId = patientId;
  if (notesJSON) {
    const notes = JSON.parse(notesJSON);
    note.id = notes.length + 1;
    notes.push(note);
    storage.set('notes', JSON.stringify(notes));
  } else {
    note.id = 1;
    storage.set('notes', JSON.stringify([note]));
  }
  return Promise.resolve(note);
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
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
      if (payload) {
        const target = state.noteItems.findIndex(n => n.id === payload.id);
        state.noteItems.splice(target, 1, payload);
      }
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
      if (payload) {
        state.noteItems = [...state.noteItems, payload];
      }
    });
    builder.addCase(addNote.rejected, (state, {error}) => {
      state.loading = false;
      state.error = true;
      state.errMsg = error.message;
    });
  },
});

export {getNotes, updateNote, addNote};

export default notesSlice.reducer;
