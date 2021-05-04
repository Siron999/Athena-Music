import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import audioRoutes from './routes/audioRoutes.js';


const app = express();

dotenv.config();

app.use('/static', express.static('public'));
app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

//audio routes
app.use("/audio",audioRoutes);


app.get('/', function(req, res) {
    res.send("Hello");
});



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> app.listen(PORT,()=> console.log(`Server running on PORT: ${PORT}`)))
    .catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify',false);
