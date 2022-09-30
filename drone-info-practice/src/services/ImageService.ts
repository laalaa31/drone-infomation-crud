import { ImageResponseDto } from '../dtos/ImageDto';
import Image from '../models/Image';

const createImage = async (
  imageName: string,
  link: string
): Promise<ImageResponseDto> => {
  const image = new Image({
    link,
    imageName,
  });

  await image.save();

  const data = {
    _id: image._id,
    imageName: image.imageName,
    link: image.link,
  };
  return data;
};

export default {
  createImage,
};
