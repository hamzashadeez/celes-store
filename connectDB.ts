import mongoose from "mongoose";

const url = process.env.NEXT_MONGODB_URL as string | undefined;

if (!url) {
  console.error("Missing NEXT_MONGODB_URL environment variable");
  // In CI or production you might want to throw instead — but keeping process exit to match prior behavior
  process.exit(1);
}

// Cache connection across hot-reloads in development (and across imports) so
// we don't create multiple connections.
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalAny: any = global;

if (!globalAny._mongooseCache) {
  globalAny._mongooseCache = { conn: null, promise: null } as MongooseCache;
}

const cached: MongooseCache = globalAny._mongooseCache;

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(url, { autoIndex: false })
      .then((m) => {
        return m;
      })
      .catch((err) => {
        // clear promise so future calls can retry
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;