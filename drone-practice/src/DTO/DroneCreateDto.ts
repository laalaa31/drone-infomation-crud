export interface DroneCreateDto {
  droneName: string;
  droneVideo: string;
  armed?: boolean;
  altitude?: number;
  groundSpeed?: number;
  verticalSpeed?: number;
  distToWp?: number;
  yaw?: number;
}
