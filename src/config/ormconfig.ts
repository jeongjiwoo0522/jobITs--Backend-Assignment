import config from "./index";
import { ConnectionOptions } from "typeorm";
import { User } from "../model/user";
import { Post } from "../model/post";
import { Image } from "../model/image";
import { Admin } from "../model/admin";

export const connectionOption: ConnectionOptions = {
  type: "mysql",
  host: config.mysql.dbHost,
  port: +config.mysql.dbPort,
  username: config.mysql.dbUser,
  password: config.mysql.dbPass,
  database: config.mysql.dbName,
  synchronize: false,
  logging: true,
  entities: [User, Post, Image, Admin]
}