const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(express.static('images'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true }
)
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');

app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api', fileRoutes.routes);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});