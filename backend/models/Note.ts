import mongoose from 'mongoose';

export interface INote {
  name: string;
  age: number;
}

const noteSchema = new mongoose.Schema<INote>({
  name: String,
  age: Number,
});

const noteDocument = mongoose.models.Note  || mongoose.model<INote>('Note', noteSchema);

export default noteDocument;
