import express, { Application, Request, Response } from "express";
import cors from "cors";
import passport from "../src/app/middleware/passport";
import { notFoundHandler } from "./app/utils/notFoundHandler";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import router from "./app/routes";
import cookieParser from "cookie-parser"

  
  // export default app;  
function createApp(){
  
const app = express();

// cors middleware
app.use(cors({origin: ["http://localhost:5000"], credentials: true}));

// json parsing middleware
app.use(express.json());

// cookie parse
app.use(cookieParser())

// Initialize Passport Middleware
app.use(passport.initialize());

// application routes
app.use('/', router);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to pxlhunt secure auth system!");
});

// not found handler
app.all("*", notFoundHandler);

// global error handler middleware
app.use(globalErrorHandler);

return app;
}


export default createApp