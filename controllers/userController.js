const { ObjectId } = require('mongoose').Types
const { User, Thought } = require('../models')

const userController = {
    async getUsers(req, res) {
        try {
            const users = await User.find({})
            return res.json(users)
        } catch(err) {
            res.status(500).json(err)
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')
                .populate('friends')
                .select('-__v')

            if (!user) {
                return res.status(404).json({ message: 'No user wiht that ID' })
            }

            res.json(user)

        } catch(err) {
            res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })

            if (!user) {
                return res.status(404).json({ message: 'No user wiht that ID' })
            }

            res.json(user)

        } catch(err) {
            res.status(500).json(err)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: 'No user wiht that ID' })
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } })

            res.json({ message: 'User deleted' })

        } catch(err) {
            res.status(500).json(err)
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })

            if (!user) {
                return res.status(404).json({ message: 'No user wiht that ID' })
            }

            res.json(user)

        } catch(err) {
            res.status(500).json(err)
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })

            if (!user) {
                return res.status(404).json({ message: 'No user wiht that ID' })
            }

            res.json(user)

        } catch(err) {
            res.status(500).json(err)
        }
    }
}

module.exports = userController