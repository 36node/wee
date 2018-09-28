import fs from "fs";
import path from "path";

import Koa2 from "koa";
import body from "koa-body";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import logger from "koa-logger";
// import jwt from "koa-jwt";
// import mongoose from "mongoose";
import Router from "koa-tree-router";

import { BASE, MONGODB_CONNECTION } from "./config";
import signatureService from "./services/signature";

const app = new Koa2();
const router = new Router({ prefix: BASE });
// const publicKey = fs.readFileSync(path.join(__dirname, "../ssl/rsa_jwt.pub"));

/**
 * connect to mongodb
 */

// mongoose.Promise = Promise;
// mongoose.connect(
//   MONGODB_CONNECTION,
//   { useNewUrlParser: true }
// );
// mongoose.connection.on("error", console.error.bind(console, "数据库连接错误"));

/**
 * register services
 */

signatureService.bind(router);

/**
 * spec openapi.yml
 */

router.get("/openapi.yaml", ctx => {
  ctx.type = "text/yaml";
  ctx.body = fs.createReadStream(path.join(__dirname, "../openapi.yaml"));
});

/**
 * application
 */

app
  .use(logger())
  .use(helmet())
  .use(cors({ exposeHeaders: "*" }))
  // .use(jwt({ secret: publicKey }).unless({ path: `${BASE}/openapi.yaml` }))
  .use(body())
  .use(router.routes());

export default app;
