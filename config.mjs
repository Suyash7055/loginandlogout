import dotenv from 'dotenv';
dotenv.config();
const config = {
  mongoDB: process.env.mongoDB,
  PORT: process.env.PORT || 8080
}
export default config;