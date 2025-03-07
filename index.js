const express = require("express");
const {connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');

const app = express();
const PORT = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log('Mongodb Connected'));

//MiddleWare: pass incoming bodies 
app.use(express.json());

// route : server side rendering 
app.get('/test' , (req,res) => {
    return res.end('<h1>Hey From Server</h1>');
});

app.use("/url" ,urlRoute);

// for dynamic route :
app.get('/:shortId', async (req , res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        }, 
        { 
            $push: {
                visitHistory: {
                    timestamp : Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT , () => console.log(`Server Started at PORT : ${PORT}`));