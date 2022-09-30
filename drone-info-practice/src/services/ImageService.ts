import { ImageResponseDto } from '../dtos/ImageDto';
import Image from '../model/Image';

const createImage = async (
  link: string,
  imageName: string
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
