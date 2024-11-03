import mongoose from 'mongoose';

export interface QuillFormat {
  insert?: string; 
  attributes?: { [key: string]: any };
  retain?: number; 
  delete?: number; 
}

export interface IContent {
  content: QuillFormat[];
  createdAt: Date;
}

export interface QuillEditorData {
  "ops": QuillFormat[]
}

const DeltaJSONSchema = new mongoose.Schema<QuillFormat>({
  insert: { type: String },
  attributes: { type: Map, of: mongoose.Schema.Types.Mixed }, // Using Map to store flexible attribute key-value pairs
  retain: { type: Number },
  delete: { type: Number }
}, { _id: false }); // Disable _id for each DeltaOp to keep the document simpler

const ContentSchema = new mongoose.Schema<IContent>({
  content: {
    type: [DeltaJSONSchema], // Array of DeltaOp
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);