export interface AlphaVantageResponse {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
}

export interface PolygonResponse {
  resultsCount: number;
  results: Array<{
    c: number;
    h: number;
    l: number;
    o: number;
    v: number;
    vw: number;
  }>;
}
