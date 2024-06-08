import { Request, Response } from "express";
import httpService from "../services/httpService";

export const getStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await httpService.get("/");
    res.json(response.data);
  } catch (error: any) {
    res.status(error.code).send(error.message);
  }
};

export const getLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await httpService.get("/");
    res.json(response.data);
  } catch (error: any) {
    res.status(error.code).send(error.message);
  }
};
