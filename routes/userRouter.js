import express from "express";
import userController from "../controllers/userController.js";
import auth from '../controllers/authController.js'

const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login)


router.get('/admin', auth, (req, res) => {
    if (req.user.admin) res.send("You're Admin")
    else res.status(401).send('Access Denied')
})

router.get('/free', auth, (req, res) => {
    res.send("You're authenticated")
})

export default router;