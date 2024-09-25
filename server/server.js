import express from 'express';
import sequelize from './src/config/connection.js';
import routes from './src/routes/index.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth-routes.js';
import { Sequelize } from 'sequelize';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;

const forceDatabaseSync = false;

app.use(express.static('../client/dist'));



sequelize.sync({ force: forceDatabaseSync }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});