import { Request, Response } from "express";
import dbConnection from "../db/db";
import {
  AlphaVantageResponse,
  PolygonResponse,
} from "../interfaces/providersResponse";
import { generateToken } from "../jwt/jwt";
import ProvidersName from "../providers/providersName";
import httpService from "../services/httpService";
import { cleanString } from "../utils/cleanString";
import { comparePassword } from "../utils/manage-passwords";

export const getStock = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { symbol, provider } = req.query;
  const userId = req.user?.userId;

  if (userId === undefined) {
    return res.status(400).json({ message: "User ID is missing from request" });
  }

  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({
      message: "Symbol query parameter is required and should be a string",
    });
  }

  if (!provider || typeof provider !== "string") {
    return res.status(400).json({
      message: "Provider query parameter is required and should be a string",
    });
  }

  let currentPrice = 0;
  let response;
  const cleanSymbol = cleanString(symbol.toUpperCase());

  try {
    switch (provider) {
      case ProvidersName.ALPHAVANTAGE:
        response = await httpService.get<AlphaVantageResponse>(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${cleanSymbol}&apikey=X1AN6OR1Y3WI51E3`
        );
        const globalQuote = response.data["Global Quote"];
        if (!globalQuote || !globalQuote["03. high"]) {
          return res.status(404).json({
            message: "Symbol not found",
          });
        }
        currentPrice = parseFloat(globalQuote["03. high"]);
        break;
      case ProvidersName.POLYGON:
        response = await httpService.get<PolygonResponse>(
          `https://api.polygon.io/v2/aggs/ticker/${cleanSymbol}/prev?apiKey=H3AbgxjKB67dVCpcMEuIG59HlFg6U3WZ`
        );
        if (response.data.resultsCount === 0) {
          return res.status(404).json({
            message: "Symbol not found",
          });
        }
        currentPrice = response.data.results[0].h;
        break;
      default:
        return res.status(400).json({
          message: "Invalid provider",
        });
    }

    await dbConnection.insertLog(cleanSymbol, currentPrice, userId);
    return res.json({ cleanSymbol, currentPrice });
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      return res
        .status(error.code)
        .json({ message: "External API request timed out" });
    }
    return res.status(error.code).json({
      message: "Error fetching stock price",
      error: error.message,
    });
  }
};

export const getLogs = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { limit } = req.query;
  const userId = req.user?.userId;

  if (userId === undefined) {
    return res.status(400).json({ message: "User ID is missing from request" });
  }

  const parsedLimit = parseInt(limit as string, 10);
  if (isNaN(parsedLimit)) {
    return res.status(400).json({
      message: "Limit query parameter is required and should be a number",
    });
  }

  try {
    const logs = await dbConnection.getLogs(parsedLimit, userId);
    return res.json(logs);
  } catch (error: any) {
    return res.status(error.code).json({
      message: "Error fetching logs",
      error: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { email, password } = req.body;

  try {
    const [user] = await dbConnection.getUserByEmail(email);

    if (!user || user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);
    return res.json({ token });
  } catch (error: any) {
    return res
      .status(error.code)
      .json({ message: "Error logging in", error: error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { name, email, password } = req.body;

  try {
    await dbConnection.createUser(name, email, password);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    return res
      .status(error.code)
      .json({ message: "Error registering user", error: error.message });
  }
};
