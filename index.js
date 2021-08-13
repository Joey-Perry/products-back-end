require('dotenv').config();
const express = require('express');
const massive = require('massive');
const app = express();

const { CONNECTION_STRING, SERVER_PORT } = process.env;
const { create, getOne, getAll, update, deleteProduct } = require('./products_controller');

app.use(express.json());
app.use(express.static('client/build'));

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false}
})
.then((db) => {
    app.set('db', db);
    console.log('DB connection established successfully!');
}).catch(err => {
    console.log(`Error connecting DB: ${err}`);
})


// ENDPOINTS
app.get('/api/products', getAll);
app.get('/api/products/:id', getOne);
app.put('/api/products/:id', update);
app.post('/api/products', create);
app.delete('/api/products/:id', deleteProduct);


app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`));