import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv with the path
config({ path: `${__dirname}/../.env` });

export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET