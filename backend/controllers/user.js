const userService = require('../service/user');

const userController = {

    async getUserById(req, res) {
        const {id} = req.params
        try {
            const user = await userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({error})
        }
        
    },

    async getUserByEmail(req, res) {
        const { email } = req.body
        try {
            const user = await userService.getUserByEmail(email);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({error})
        }
       
    },

    async createUser(req, res) {
        
        try {
            const user = await userService.createUser(req.body);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({error})
        }
    },

    async updateUser(req, res) {
        const {id} = req.params

        try {
            const user = await userService.updateUser(id, req.body);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({error})
        }
    }, // returns user

    async deleteUser(req, res) {
        const {id} = req.params

        try {
            const user = await userService.deleteUser(id);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({error})
        }
    }, // returns user

    async getAllUsers() {
        try {
            const user = await userService.getAllUsers();
            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting all users:', error);
            res.status(500).json({error})
        }
    }, // returns [] of users

    async userStats() {
        try {
            const user = await userService.userStats();
            res.status(200).json(user);
        } catch (error) {
            console.error('Error rerieving user stats:', error);
            res.status(500).json({error})
        }
    }

};

module.exports = userService;
