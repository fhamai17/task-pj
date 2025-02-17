
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const port = 4000
dotenv.config();
const mydb = require('./config/db');
const viewRoutes = require('./routes/viewRoutes')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser');

// Use cookie-parser middleware
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: '*',
}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(viewRoutes);
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})