import mongoose from 'mongoose';
import { INote } from './Note';

export interface ITopic {
  name: string;
  notes: INote[];
}

const TopicSchema = new mongoose.Schema<ITopic>({
  name: {
    type: String,
    required: true
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});

export const Topic = mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema);
