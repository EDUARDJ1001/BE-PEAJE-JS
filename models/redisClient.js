import dotenv from 'dotenv';
import { createClient } from "redis"

dotenv.config();

const redisUrl = process.env.REDIS_CLIENT;

const client = createClient({
    url: redisUrl
});

client.on('error', (err) => console.error('Redis client error', err));

await client.connect();

export default client;