import express, { Request, Response } from "express"
import { DroneUpdateDto } from "../DTO/DroneUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import DroneService from "../services/DroneService";

//CREATE
//드론정보 생성(POST/drone)

const createDroneInfo = async (req: Request, res: Response) => {
    try {
        const data = await DroneService.createDroneInfo(req.body);
        res.status(statusCode.CREATED).send(util.success(message.CREATE_DRONEINFO_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(message.SERVER_ERROR));
    }
}

//READ
//드론정보 조회(GET /drone/:id)

const readDroneInfo = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const data = await DroneService.readDroneInfo(id);
        if (!data) return res.status(statusCode.NOT_FOUND).send(util.fail(message.NOT_FOUND_RESOURCE));

        res.status(statusCode.OK).send(util.success(message.READ_DRONEINFO_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(message.SERVER_ERROR));
    }
}

//READ
//드론정보 업데이트(PUT /drone/:id)
const updateDroneInfo = async (req: Request, res: Response) => {
    const droneupdateDto: DroneUpdateDto = req.body;
    const { id } = req.params;

    try {
        await DroneService.updateDroneInfo(id, droneupdateDto);
        res.status(statusCode.OK).send(util.success(message.UPDATE_DRONEINFO_SUCCESS, id));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(message.SERVER_ERROR));
    }
}

//DELETE
//드론정보 삭제(DELETE /drone/:id)
const deleteDroneInfo = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await DroneService.deleteDroneInfo(id);
        res.status(statusCode.OK).send(util.success(message.DELETE_DRONEINFO_SUCCESS, id));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(message.SERVER_ERROR));
    }
}

export default {
    createDroneInfo,
    readDroneInfo,
    updateDroneInfo,
    deleteDroneInfo
}


