import mongoose from 'mongoose';
import { DroneInfo } from '../interfaces/DroneInfo';

const DroneSchema = new mongoose.Schema({
  drone_name: {
    type: String,
    required: true,
  },
  drone_video: {
    //url로 받으면 String
    type: String,
    required: true,
  },
  armed: {
    type: Boolean,
    default: false, //시동 걸리지 않은 상태가 default
  },
  altitude: {
    type: Number,
    default: 0.0,
  },
  groundspeed: {
    type: Number,
    default: 0.0,
  },
  verticalspeed: {
    type: Number,
    default: 0.0,
  },
  disttowp: {
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
