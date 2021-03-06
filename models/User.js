import Sequelize from 'sequelize';
import database from '../db.js';
 
const userSchema = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false, 
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: Sequelize.STRING,
        required: true,
        minLength: 3,
        maxLength: 100,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        required: true,
        minLength: 6,
        maxLength: 200
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})
 
export default userSchema;