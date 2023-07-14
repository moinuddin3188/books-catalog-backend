import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import routers from "./app/routes";

const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

//application routes
app.use("/api/v1", routers);

// HAndle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Not found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'Api not found',
        },
      ],
    });
  
    next();
  });

app.use(globalErrorHandler)

export default app
