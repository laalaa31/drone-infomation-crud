import mongoose from 'mongoose';
import { DroneCreateDto } from '../DTO/DroneCreateDto';
import { DroneResponseDto } from '../DTO/DroneResponseDto';
import { DroneUpdateDto } from '../DTO/DroneUpdateDto';
import Drone from '../model/Drone';

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

const updateDroneInfo = async (id: string, droneupdateDto: DroneUpdateDto) => {
  try {
    await Drone.findByIdAndUpdate(id, droneupdateDto);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
