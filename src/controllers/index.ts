import { Request, Response } from "express";
import httpService from "../services/httpService";
import { cleanString } from "../utils/cleanString";
import {
  AlphaVantageResponse,
  PolygonResponse,
} from "../interfaces/providersResponse";
import ProvidersName from "../providers/providersName";
import dbConnection from "../db/db";

export const getStock = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { symbol, provider } = req.query;

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
  const cleanSymbol = cleanString(symbol);
  try {
    switch (provider) {
      case ProvidersName.ALPHAVANTAGE:
        response = await httpService.get<AlphaVantageResponse>(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${cleanSymbol}&apikey=X1AN6OR1Y3WI51E3`
        );
        const globalQuote = response.data["Global Quote"];
        currentPrice = parseFloat(globalQuote["03. high"]);
        break;
      case ProvidersName.POLYGON:
        response = await httpService.get<PolygonResponse>(
          `https://api.polygon.io/v2/aggs/ticker/${cleanSymbol}/prev?apiKey=H3AbgxjKB67dVCpcMEuIG59HlFg6U3WZ`
        );
        currentPrice = response.data.results[0].h;
        break;
      default:
        return res.status(400).json({
          message: "Invalid provider",
        });
    }

    await dbConnection.insertLog(cleanSymbol, currentPrice);
    res.json({ cleanSymbol, currentPrice });
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching stock price",
      error: (error as any).message,
    });
  }

  return res;
};

export const getLogs = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { limit } = req.query;

  const parsedLimit = parseInt(limit as string, 10);
  if (isNaN(parsedLimit)) {
    return res.status(400).json({
      message: "Limit query parameter is required and should be a number",
    });
  }

  try {
    const logs = await dbConnection.getLogs(parsedLimit);
    res.json(logs);
  } catch (error) {
    res.status((error as any).code).json({
      message: "Error fetching logs",
      error: (error as any).message,
    });
  }
  return res;
};
