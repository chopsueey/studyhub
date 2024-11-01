import mongoose from 'mongoose';

const YourSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

export default mongoose.models.Note || mongoose.model('Note', YourSchema);
