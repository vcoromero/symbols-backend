interface AuthenticatedRequest extends Request {
  query: { symbol: any; provider: any; limit: any };
  user?: { userId: number };
}

export default AuthenticatedRequest;
