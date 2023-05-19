require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('middleware/errorHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/employees', require('./employees/employees.controller'));

app.use(errorHandler);

const port = process.env.STATUS === 'crud-employee' ? (process.env.PORT || 8888) : 4444;
app.listen(port, () => console.log('Server listening on port ' + port));