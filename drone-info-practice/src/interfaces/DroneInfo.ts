import mongoose from 'mongoose';

export interface DroneInfo {
  droneName: string;
  droneVideo: string;
  vedioCapture: mongoose.Types.ObjectId[];
  armed: boolean;
  altitude: number;
  groundSpeed: number;
  verticalSpeed: number;
  distToWp: number;
  yaw: number;
}
