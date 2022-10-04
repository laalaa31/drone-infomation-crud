import { ImageResponseDto } from '../dtos/ImageDto';
import Image from '../models/Image';

const createImages = async (
  imageList: {
    location: string;
    originalname: string;
  }[]
): Promise<ImageResponseDto[]> => {
  const data = await Promise.all(
    imageList.map(async (singleImage) => {
      const image = new Image({
        link: singleImage.location,
        imageName: singleImage.originalname,
      });

      await image.save();

      return {
        _id: image._id,
        imageName: image.imageName,
        link: image.link,
      };
    })
  );

  return data;
};

export default {
  createImages,
};
