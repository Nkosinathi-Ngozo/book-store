const userModel = require('../models/user');

const userService = {

    async getUserById(userId) {
        const user = await userModel.findById(userId);

        if (!user) return null;
        return user; // returns user
    },

    async getUserByEmail(email) {
        const user = await userModel.findOne({ email });

        if (!user) return null;
        return user; // returns user
    },

    async createUser(userData) {
        const newUser = new userModel(userData);
        await newUser.save();
        return newUser; // returns user
    },

    async updateUser(userId, userData) {
        return await userModel.findByIdAndUpdate(userId, userData, { new: true }); // `new: true` returns the updated document
    }, // returns user

    async deleteUser(userId) {
        return await userModel.findByIdAndDelete(userId);
    }, // returns user

    async getAllUsers() {
        return await userModel.find();
    }, // returns [] of users

    async userStats() {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        // Group users by month and count the number of users per month
        const data = await userModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: lastYear } // Filter users created within the last year
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" }, // Group by month of creation
                    total: { $sum: 1 } // Count users
                }
            },
            {
                $sort: { _id: 1 } // Sort by month in ascending order
            }
        ]);

        return data; // returns 
        // [
        //     { "_id": 1, "total": 10 },
        //     { "_id": 2, "total": 15 }
        //   ]
    }

};

module.exports = userService;
