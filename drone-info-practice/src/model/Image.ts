import mongoose from 'mongoose';
import { ImageInfo } from '../interfaces/imageInfo';

const ImageSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ImageInfo & mongoose.Document>(
  'Image',
  ImageSchema
);
