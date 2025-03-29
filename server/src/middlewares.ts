import { Request, Response, NextFunction } from 'express';

function notFound(req: Request, res: Response, next: NextFunction): void {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'An error has occurred.' : err.stack
  });
}

export default {
  notFound,
  errorHandler
}; 