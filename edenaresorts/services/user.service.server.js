var app = require("../../express");
var fs = require('fs');
var userModel = require("../model/user.model.server");
var bcrypt = require("bcrypt-nodejs");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : "1061797896647-dsveelhn428l2urc5h18f3ks555kedui.apps.googleusercontent.com",//process.env.GOOGLE_CLIENT_ID,
    clientSecret : "acNmmB3q5vXcJkPLXnVnxy86",//process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : "http://localhost:3000/auth/google/callback",//process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));


// http handlers
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#!/profile',
        failureRedirect: '/'
    }));

app.post("/userapi/user", createUser);
app.post("/userapi/login", passport.authenticate('local'), login);
app.post("/userapi/logout", logout);
app.get("/userapi/user", findUser);
app.get("/userapi/user/:userId", findUserById);
app.get("/userapi/users", findAllUsers);
app.get("/userapi/checkLogin", checkLogin);
app.put("/userapi/user/:userId", updateUser);



function findAllUsers(req,res) {
    var publicUsers = [];
    userModel
        .findAllUsers()
        .then(function (users) {
            for(i = 0; i < users.length; i++){
                if (users[i].type !== 'ADMIN'){
                    publicUsers.push(users[i]);
                }
            }
            return res.json(publicUsers);
        });
}


function createUser(req,res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            var template = __dirname + '/' + "emailTemplates/registrationConfirmation.html";
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'service@edenaresorts.com',
                    pass: 'Edena123!'
                }
            });



            fs.readFile(template, 'utf8', function(err, file) {
                if (err) {
                    //handle errors
                    console.log('FILE ERROR!');
                    //return res.send('ERROR!');
                }
                else {
                    // //compile jade template into function
                    // var compiledTmpl = _jade.compile(file, {filename: template});
                    // // set context to be used in template
                    // var context = {title: 'Express'};
                    // // get html back as a string with the context applied;
                    // var html = compiledTmpl(context);
                    var mailOptions = {
                        from: 'service@edenaresorts.com',
                        to: user.username,
                        subject: 'Thank you for register edena account',
                        html: file
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json(user);
                }
            });

        },function (err) {
            console.log(err);
        });
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function findUserById(req,res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findUser(req,res) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user === null){
                return res.send("0");
            }
            else
                return res.json(user);

        }, function (err) {
            return res.sendStatus(404).send(err);
        });
}

function updateUser(req,res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId,user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}


function login(req, res) {
        var user = req.user;
        res.json(user);
    }

function localStrategy(username, password, done) {
        userModel
            .findOne({"username":username})
            .then(
                    function(user) {
                            if (user && bcrypt.compareSync(password, user.password)) {
                                return done(null, user);
                                }
                            return done(null, false);
                        },
                    function(err) {
                            if (err) {
                                    return done(err);
                                }
                        }
                );
    }

function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

function serializeUser(user, done) {
        done(null, user);
    }

function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                    function (user) {
                            done(null, user);
                        },
                    function (err) {
                            done(err, null);
                        }
                );
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {//.length !== 0
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        google: {
                            id:    profile.id,
                            token: token
                        },
                    };
                    return userModel.create(newGoogleUser);
                }
            },
            function(err) {
                console.log("errrrrrrr");
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

