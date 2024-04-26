const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);


exports.create = async (userId, userData, actions) => {
    try {
        return await knex('users').insert({ id: userId, ...userData, actions: actions });
    } catch (error) {
        throw error;
    }
};

exports.getById = async (userId) => {
    try {
        return await knex('users').where({id: userId}).first();
    } catch (error) {
        throw error;
    }
}

exports.get = async () => {
    try {
        return await knex('users');
    } catch (error) {
        throw error;
    }
}

exports.update = async (userId, userData) => {
    try {
        const { actions, ...userDataWithoutActions } = userData;

        const actionsString = JSON.stringify(actions);

        await knex('users').where({id: userId}).update({ ...userDataWithoutActions, actions: actionsString });

        return await knex('users').where({id: userId}).first();
    } catch (error) {
        throw error;
    }
}

exports.delete = async (userId) => {
    try {
        await knex('users').where({id: userId}).del();
    } catch (error) {
        throw error;
    }
}

exports.deleteAll = async () => {
    try {
        await knex('users').del();
    } catch (error) {
        throw error;
    }
}

exports.checkEmailExists = async (email) => {
    try {
        const user = await knex('users').where({email}).first();
        return !!user;
    } catch (error) {
        throw error;
    }
}