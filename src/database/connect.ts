import type { Mongoose } from "mongoose";
import mongoose from "mongoose";
import { loadConfig } from "../utils/load-config";

let globalMongoose: Mongoose | undefined;

export async function connect() {
  const { mongodbDatabase, mongodbHost, mongodbPassword, mongodbPort, mongodbUser, mongodbSRV } = await loadConfig();
  const url = `mongodb${mongodbSRV ? "+srv" : ""}://${mongodbHost}${mongodbPort ? `:${mongodbPort}` : ""}`;
  return mongoose.connect(url, {
    user: mongodbUser,
    pass: mongodbPassword,
    dbName: mongodbDatabase,
    retryWrites: true,
    writeConcern: {
      w: "majority",
    },
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
