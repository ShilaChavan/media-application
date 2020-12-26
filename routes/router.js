const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(session({ secret: 'ewpuYW1lOnNoaWxhCn0=', resave: false, saveUninitialized: true }));

const UserRouter = require('./../routes/api/media.users');
const NewsRouter = require('./../routes/api/media.news');
const weatherRouter = require('./api/media.weather');
const ChatRouter = require('./api/media.chat');


router.get('/', (req, res) => {
    res.send('Welcome');
});

router.post('/users', UserRouter.register);                             //Normal user registration
router.post('/admin', UserRouter.adminRegister);                        // Admin registration
router.post('/login', UserRouter.login);                                //Login

router.post('/news', NewsRouter.addNews);                               //Adding new news
router.get('/news/all', NewsRouter.News);                               //Getting All type of new
router.get('/news/general', NewsRouter.listGeneralNews);                        //general new latest 3
router.get('/news/sports', NewsRouter.listSportsNews);                   //sports new latest 3
router.put('/news/:id', NewsRouter.updateNews);                              //updating news
router.delete('/news/:id', NewsRouter.deleteNews);                          //deleting news

router.get('/getWeather', weatherRouter.weather);                       //getting weather info accouding to location
router.post('/email', weatherRouter.email);                                //email user query

router.get('/message', ChatRouter.get);                                 //getting chat messages
router.get('/message/:user', ChatRouter.getUserMsg);                    //getting particulat user chat message
router.post('/message', ChatRouter.message);                            //Posting chat




module.exports = router;