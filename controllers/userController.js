const userService = require('../services/userService');

exports.createUser = async (req, res) => {
    try {

        const { email } = req.body;
        const emailExists = await userService.checkEmailExists(email);

        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Failed to get users' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await userService.updateUser(userId, req.body);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await userService.deleteUser(userId);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

exports.deleteAllUsers = async (req, res) => {
    try {
        await userService.deleteAllUsers();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({ error: 'Failed to delete users' });
    }
};

exports.checkIfUserIsEligibleToPerformAction = async (req, res, next) => {
    try {
        const { userId, action } = req.body;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isEligible = userService.checkIfUserIsEligibleToPerformAction(user, action);

        if (!isEligible) {
            return res.status(401).json({ error: 'User is not eligible to perform the action' });
        }

        return res.status(200).json({ message: 'User is eligible to perform the action' });
    } catch (error) {
        console.error('Error checking user eligibility:', error);
        res.status(500).json({ error: 'Failed to check user eligibility' });
    }
}