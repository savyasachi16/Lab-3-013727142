import express from 'express';
import passport from 'passport';
import * as userHandler from '../handlers/user'

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send("Grubhub Server Home");
})

userRouter.post('/register', passport.authenticate('register'), (req, res) => {
    const userDetails = req.body;
    return userHandler.registerUser(userDetails).then(result => {
        res.cookie('grubhubCookie', result.token, {
            maxAge: 900000,
            httpOnly: false
        });
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json(err);
    });
});

userRouter.post('/login', passport.authenticate('login'), (req, res) => {
    const userCredentials = req.body;
    console.log(req.body);
    return userHandler.loginUser(userCredentials).then(result => {
        res.cookie('grubhubCookie', result.token, {
            maxAge: 900000,
            httpOnly: false
        });
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json(err);
    });
});

userRouter.put("/userUpdate/:user_id", passport.authenticate("jwt"), (req, res) => {
    const userDetails = req.body;
    userDetails.user_id = req.params.user_id;
    return userHandler.updateUser(userDetails).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
        console.log("ERROR: ", err)
    })
})

userRouter.get("/user/:user_id", (req, res) => {
    userHandler.getUser(req.params.user_id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

export default userRouter;