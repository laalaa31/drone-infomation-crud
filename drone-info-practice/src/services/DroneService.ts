import mongoose from 'mongoose';
import { DroneCreateDto } from '../DTO/DroneCreateDto';
import { DroneResponseDto } from '../DTO/DroneResponseDto';
import { DroneUpdateDto } from '../DTO/DroneUpdateDto';
import Drone from '../model/Drone';

const createDroneInfo = async (
  dronecreateDto: DroneCreateDto
): Promise<mongoose.Schema.Types.ObjectId> => {
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
};

const readDroneInfo = async (id: string): Promise<DroneResponseDto | null> => {
  const droneinfo = await Drone.findById(id);
  if (!droneinfo) return null;

  return droneinfo;
};

const updateDroneInfo = async (id: string, droneupdateDto: DroneUpdateDto) => {
  await Drone.findByIdAndUpdate(id, droneupdateDto);
};

const deleteDroneInfo = async (id: string) => {
  await Drone.findByIdAndDelete(id);
};

export default {
  createDroneInfo,
  readDroneInfo,
  updateDroneInfo,
  deleteDroneInfo,
};
