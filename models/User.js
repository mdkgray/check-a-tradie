const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }

    toJSON () {
        let attributes = Object.assign({}, this.get())
        delete attributes['password']
        
        return attributes
    }
}


User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        businessName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        licenseNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                isAlphanumeric: true,
                len: [7],
            },
        },
        bio: {
            type: DataTypes.STRING(600),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 15],
            },
        },
        specialities: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize, 
        timestamps: false, 
        freezeTableName: true, 
        modelName: 'user',
    }
);

module.exports = User;