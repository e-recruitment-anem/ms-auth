import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { Router } from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
import swaggerDocs from "./helpers/swagger.helper";

const app = express();
dotenv.config();
// const isProduction = process.env.NODE_ENV === 'production'

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(cors());
app.use("/api", Router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
  swaggerDocs(app, Number(PORT));
});
