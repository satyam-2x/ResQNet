const express = require('express');
const cors = require('cors');
require('dotenv').config();

const incidentRoutes = require('./routes/incidentRoutes');

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://main.dxseivhko5r62.amplifyapp.com/"
    ],
    credentials: true
}));

app.use(express.json());

app.use('/api/v1', incidentRoutes);


const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

if(require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
} 

module.exports = app;