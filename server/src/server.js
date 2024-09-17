const forceDatabaseSync = false;

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseSync }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});