import type { Mongoose } from "mongoose";
import mongoose from "mongoose";
import { loadConfig } from "../utils/load-config";

let globalMongoose: Mongoose | undefined;

export async function connect() {
  const { mongodbDatabase, mongodbHost, mongodbPassword, mongodbPort, mongodbUser } = await loadConfig();
  let url = "";
  if (mongodbUser && mongodbPassword) {
    url = `mongodb://${mongodbUser}:${mongodbPassword}@${mongodbHost}:${mongodbPort}`;
  } else {
    url = `mongodb://${mongodbHost}:${mongodbPort}`;
  }
  return mongoose.connect(url, {
    dbName: mongodbDatabase,
  }).then((res) => {
    globalMongoose = res;
    return res;
  });
}

export function disconnect() {
  return globalMongoose?.disconnect().then(() => {
    globalMongoose = undefined;
  });
}
