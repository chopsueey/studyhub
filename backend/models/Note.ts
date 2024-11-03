import mongoose from 'mongoose';

export interface QuillFormat {
  insert?: string; 
  attributes?: { [key: string]: unknown };
  retain?: number; 
  delete?: number; 
}

export interface INote {
  content: QuillFormat[];
  createdAt: Date;
}

export interface QuillEditorData {
  "ops": QuillFormat[]
}

const DeltaJSONSchema = new mongoose.Schema<QuillFormat>({
  insert: { type: String },
  attributes: { type: Map, of: mongoose.Schema.Types.Mixed },
  retain: { type: Number },
  delete: { type: Number }
}, { _id: false });

const ContentSchema = new mongoose.Schema<INote>({
  content: {
    type: [DeltaJSONSchema],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Note || mongoose.model('Note', ContentSchema);