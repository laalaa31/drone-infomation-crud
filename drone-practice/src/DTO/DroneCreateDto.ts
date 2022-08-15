export interface DroneCreateDto {
    drone_name: string;
    drone_video: string;
    armed?: boolean;
    altitude?: number;
    groundspeed?: number;
    verticalspeed?: number;
    disttowp?: number;
    yaw?: number;
}