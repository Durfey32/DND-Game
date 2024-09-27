
import express from 'express';
import sequelize from './src/config/connection.js';
import routes from './src/routes/index.js';
const forceDatabaseSync = false;


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

// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

