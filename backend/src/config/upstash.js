import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv"

dotenv.config()

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, "20 s"),
});

export default ratelimit

// const identifier = getIpAddress();
// const { success } = await ratelimit.limit(identifier);