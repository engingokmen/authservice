import mongoose from "mongoose";

export async function mongoConnect() {
  console.log(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}`
  );
  const db = await mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}`,
    { dbName: "users" }
  );

  db.connection.useDb("users");
}
