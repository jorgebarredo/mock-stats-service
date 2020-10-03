const express = require('express');
const app = express();

app.use(express.json());
app.use('/courses', require('./routes/courses'));

app.listen('3000');