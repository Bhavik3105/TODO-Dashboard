import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  notes?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    notes: { type: String, default: '' },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Task || mongoose.model<ITask>('Task', TaskSchema);
