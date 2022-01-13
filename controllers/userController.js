import User from '../models/User.js'
import database from '../db.js'

const userController = {
    register: async function (req, res,) {
        try {
            await database.sync();
            const createResult = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.send(createResult)
        } catch (err) {
            res.status(400).send(err);
        }
    },
    login: function (req, res,) {
        console.log('login')
        res.send('login')
    }
}

export default userController;
