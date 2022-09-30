import mongoose from 'mongoose';

export interface ImageResponseDto {
  _id: mongoose.Schema.Types.ObjectId;
  imageName: string;
  link: string;
}
