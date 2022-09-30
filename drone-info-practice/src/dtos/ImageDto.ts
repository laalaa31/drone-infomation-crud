import mongoose from 'mongoose';

export interface ImageResponseDto {
  _id: mongoose.Schema.Types.ObjectId;
  link: string;
}
