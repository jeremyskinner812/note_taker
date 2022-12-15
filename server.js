const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
// bringing in express and api and html routs

const app = express();
const PORT = process.env.PORT || 3001;
// variable for express and port for server

// middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// initiate listen at port
app.listen(PORT, () => console.log("connected to local host"));