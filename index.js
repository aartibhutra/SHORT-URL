const express = require("express");
// use the path module (build-in module)
//use for views connect with express
const path = require("path");
const {connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const URL = require('./models/url');

const app = express();
const PORT = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log('Mongodb Connected'));

// set the view engine to ejs
app.set('view engine', 'ejs');
// let know the express that where are the views(ejs files)
app.set('views', path.resolve('./views'));

//MiddleWare: pass incoming bodies 
app.use(express.json());
// middleware: to pass the form data
app.use(express.urlencoded({ extended: false }));

// route : server side rendering 
// app.get('/test' , async (req,res) => {
//     const allUrls = await URL.find({});
//     // render the home file with the data
//     // here data is the object that we passed in the res.render()
//     // here we can also pass variables
//     return res.render('home',{
//         urls: allUrls,
//     });
// });

app.use("/url" ,urlRoute);

app.use("/" , staticRoute);

// for dynamic route :
app.get('/url/:shortId', async (req , res) => {
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