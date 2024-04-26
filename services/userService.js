const userModel = require('../models/user');
const {v4: uuidv4} = require("uuid");

exports.createUser = async (userData) => {
    try {
        const userId = uuidv4();

        const { actions, ...userDataWithoutActions } = userData;

        const actionsString = JSON.stringify(actions);

        await userModel.create(userId, { ...userDataWithoutActions }, actionsString);

        return await this.getUserById(userId);
    } catch (error) {
        throw error;
    }
};

exports.getUserById = async (userId) => {
    try {
        return await userModel.getById(userId);
    } catch (error) {
        throw error;
    }
}

exports.getAllUsers = async () => {
    try {
        return await userModel.get();
    } catch (error) {
        throw error;
    }
}

exports.updateUser = async (userId, userData) => {
    try {
        return await userModel.update(userId, userData);
    } catch (error) {
        throw error;
    }
}

exports.deleteUser = async (userId) => {
    try {
        return await userModel.delete(userId);
    } catch (error) {
        throw error;
    }
}

exports.deleteAllUsers = async () => {
    try {
        return await userModel.deleteAll();
    } catch (error) {
        throw error;
    }
}


exports.checkEmailExists = async (email) => {
    try {
        return await userModel.checkEmailExists(email);
    } catch (error) {
        throw error;
    }
}

exports.checkIfUserIsEligibleToPerformAction =  (user, action) => {
    try {
        return user.actions.includes(action);
    } catch (error) {
        throw error;
    }
}
