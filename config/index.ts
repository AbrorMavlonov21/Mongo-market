import * as dotenv from 'dotenv';
import { IConfig } from './interfaces/config.interface';

dotenv.config();

export const config: IConfig = {
  PORT: Number(process.env.PORT),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || '',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
  DB_URL: process.env.DB_URL || '',
};
