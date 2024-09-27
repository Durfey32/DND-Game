import express from 'express';
import sequelize from './src/config/connection.js';
import routes from './src/routes/index.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth-routes.js';
import { Sequelize } from 'sequelize';

dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'postgres',
//   },);

//   let sequelize;
//   if (process.env.DB_URL) {
//     sequelize = new Sequelize(process.env.DB_URL);
//   } else {
//     sequelize = new Sequelize(
//       process.env.DB_NAME,
//       process.env.DB_USER,
//       process.env.DB_PW,
//       {
//         host: 'localhost',
//         dialect: 'postgres',
//       },
//     );
//   }

const app = express();

app.use(express.json());
app.use(express.static('../client/dist'));
app.use(routes);


app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;

const forceDatabaseSync = false;


sequelize.sync({ force: forceDatabaseSync }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});