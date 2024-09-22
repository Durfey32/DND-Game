import express from 'express';
import sequelize from './src/config/connection.js';
import routes from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

const forceDatabaseSync = false;

app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseSync }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});