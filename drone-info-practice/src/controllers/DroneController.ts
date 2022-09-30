import express, { Request, Response } from 'express';
import { DroneUpdateDto } from '../dtos/DroneDto';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import DroneService from '../services/DroneService';

/**
 *  @route POST /drone
 *  @desc Create drone information
 *  @access Public
 */
const createDroneInfo = async (req: Request, res: Response) => {
  try {
    const data = await DroneService.createDroneInfo(req.body);
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, message.CREATE_DRONEINFO_SUCCESS, data)
      );
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.SERVER_ERROR));
  }
};

/**
 *  @route GET /drone/:id
 *  @desc Read drone information
 *  @access Public
 */
const readDroneInfo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await DroneService.readDroneInfo(id);
    if (!data)
      return res
        .status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND_RESOURCE));

    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.READ_DRONEINFO_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.SERVER_ERROR));
  }
};

/**
 *  @route PUT /drone/:id
 *  @desc Update drone information
 *  @access Public
 */
const updateDroneInfo = async (req: Request, res: Response) => {
  const droneupdateDto: DroneUpdateDto = req.body;
  const { id } = req.params;

  try {
    await DroneService.updateDroneInfo(id, droneupdateDto);
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.UPDATE_DRONEINFO_SUCCESS, id));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.SERVER_ERROR));
  }
};

/**
 *  @route DELETE /drone/:id
 *  @desc Delete drone information
 *  @access Public
 */
const deleteDroneInfo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await DroneService.deleteDroneInfo(id);
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.DELETE_DRONEINFO_SUCCESS, id));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.SERVER_ERROR));
  }
};

export default {
  createDroneInfo,
  readDroneInfo,
  updateDroneInfo,
  deleteDroneInfo,
};
