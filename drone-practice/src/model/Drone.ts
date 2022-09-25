import mongoose from 'mongoose';
import { DroneInfo } from '../interfaces/DroneInfo';

const DroneSchema = new mongoose.Schema({
  droneName: {
    type: String,
    required: true,
  },
  droneVideo: {
    //url로 받으면 String
    type: String,
    required: true,
  },
  videoCapture: {
    type: String,
    default: null,
  },
  armed: {
    type: Boolean,
    default: false, //시동 걸리지 않은 상태가 default
  },
  altitude: {
    type: Number,
    default: 0.0,
  },
  groundSpeed: {
    type: Number,
    default: 0.0,
  },
  verticalSpeed: {
    type: Number,
    default: 0.0,
  },
  distToWp: {
    type: Number,
    default: 0.0,
  },
  yaw: {
    type: Number,
    default: 0.0,
  },
});

export default mongoose.model<DroneInfo & mongoose.Document>(
  'Drone',
  DroneSchema
);
