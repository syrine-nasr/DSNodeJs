require('./db');
const express = require('express');
const reservation_router=require('./routers/reservations');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use('/api/reservations',reservation_router);

app.listen(port,()=> console.log('Server on..',port)); 