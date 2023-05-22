const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Routes
const workersRouter = require('./routes/workersRouter');
const accountRouter = require('./routes/accountsRouter');
const bookingRouter = require('./routes/bookingRouter');
const clientsRouter = require('./routes/clientsRouter');
const schedulingRouter = require('./routes/schedulingRouter');
const notificationRouter = require('./routes/notificationRouter');
const paymentsRouter = require('./routes/paymentsRouter');
const servicesRouter = require('./routes/servicesRouter');
const testimoniesRouter = require('./routes/testimoniesRouter');


const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use(cookieParser());

app.use('/api/v1/workers', workersRouter);
app.use('/api/v1/account', accountRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/schedule', schedulingRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/payment', paymentsRouter);
app.use('/api/v1/services', servicesRouter);
app.use('/api/v1/testimonies', testimoniesRouter);

app.get('/', (req, res) => {
  res.send('Hey, welcome to EATSE\'s REST API');
})

mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(res => {
  if(res)
    console.log(res, 'mongodb connection successful!');
})
.catch(error => {
  console.log(error);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;