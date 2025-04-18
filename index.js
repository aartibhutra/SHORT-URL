const express = require("express");
// use the path module (build-in module)
//use for views connect with express
const path = require("path");
// use the cookie-parser module (build-in module)
const cookieParser = require("cookie-parser");
const{checkForAuthentication,restrictTo} = require('./middlewares/auth');
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const {request} = require("http");
const userRoute = require('./routes/user');
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
// middleware: to pass the cookies
app.use(cookieParser());

app.use(checkForAuthentication)

// inline middleware
app.use("/url" ,restrictTo(["NORMAL" , "ADMIN"]), urlRoute);// restrict to normal user
app.use("/user", userRoute);
app.use("/", staticRoute); 

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
    if (!entry) {
        return res.status(404).send('URL not found');
    }
    return res.redirect(entry.redirectURL);
});

app.listen(PORT , () => console.log(`Server Started at PORT : ${PORT}`));