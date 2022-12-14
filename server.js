const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', htmlRoutes);

app.listen(3001, () => console.log("connected to local host"));