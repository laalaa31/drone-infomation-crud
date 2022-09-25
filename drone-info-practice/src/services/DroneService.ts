import mongoose from 'mongoose';
import { DroneCreateDto } from '../DTO/DroneCreateDto';
import { DroneResponseDto } from '../DTO/DroneResponseDto';
import { DroneUpdateDto } from '../DTO/DroneUpdateDto';
import Drone from '../model/Drone';

/**
 *  @route POST /drone
 *  @desc Create drone information
 *  @access Public
 */
const createDroneInfo = async (
  dronecreateDto: DroneCreateDto
): Promise<mongoose.Schema.Types.ObjectId> => {
  try {
    const droneinfo = new Drone({
      droneName: dronecreateDto.droneName,
      droneVideo: dronecreateDto.droneVideo,
      armed: dronecreateDto.armed,
      altitude: dronecreateDto.altitude,
      groundSpeed: dronecreateDto.groundSpeed,
      verticalSpeed: dronecreateDto.verticalSpeed,
      distToWp: dronecreateDto.distToWp,
      yaw: dronecreateDto.yaw,
    });
    await droneinfo.save();

    return droneinfo.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *  @route GET /drone/:id
 *  @desc Read drone information
 *  @access Public
 */
const readDroneInfo = async (id: string): Promise<DroneResponseDto | null> => {
  try {
    const droneinfo = await Drone.findById(id);
    if (!droneinfo) return null;

    return droneinfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *  @route PUT /drone/:id
 *  @desc Update drone information
 *  @access Public
 */
const updateDroneInfo = async (id: string, droneupdateDto: DroneUpdateDto) => {
  try {
    await Drone.findByIdAndUpdate(id, droneupdateDto);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *  @route DELETE /drone/:id
 *  @desc Delete drone information
 *  @access Public
 */
const deleteDroneInfo = async (id: string) => {
  try {
    await Drone.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createDroneInfo,
  readDroneInfo,
  updateDroneInfo,
  deleteDroneInfo,
};
