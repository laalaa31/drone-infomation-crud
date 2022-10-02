import express, { Request, Response } from 'express';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import { ImageService } from '../services';

/**
 *  @route POST /image
 *  @desc Upload image
 *  @access Public
 */
const createImage = async (req: Request, res: Response) => {
  if (!req.file)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;

  try {
    const data = await ImageService.createImage(
      image.originalname,
      image.location
    );
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, message.CREATE_IMAGE_SUCCESS, data)
      );
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.SERVER_ERROR));
  }
};

/**
 *  @route POST /image
 *  @desc Upload images
 *  @access Public
 */
const createImages = async (req: Request, res: Response) => {
  if (!req.file)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

  const images: Express.MulterS3.File[] = req.file as Express.MulterS3.File[];

  try {
    const imageList: {
      location: string;
      originalname: string;
    }[] = await Promise.all(
      images.map((image: Express.MulterS3.File) => {
        return {
          location: image.location,
          originalname: image.originalname,
        };
      })
    );

    const data = await ImageService.createImages(imageList);
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, message.CREATE_IMAGE_SUCCESS, data)
      );
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.SERVER_ERROR));
  }
};

export default {
  createImage,
  createImages,
};
