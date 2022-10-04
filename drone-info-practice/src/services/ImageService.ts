import { ImageResponseDto } from '../dtos/ImageDto';
import Drone from '../models/Drone';
import Image from '../models/Image';

const createImages = async (
  droneId: string,
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

      await Drone.findByIdAndUpdate(droneId, {
        $push: { videoCapture: image._id },
      });

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
