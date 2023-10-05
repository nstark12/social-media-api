const express = require('express')
const db = require('./config/connection')
const User = require('./models/User')
const Thought = require('./models/Thought')
const Reaction = require('./models/Reaction')
const routes = require('./routes')

const cwd = process.cwd()

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`)
    })
})

// const seedThoughts = async () => {
//     await Thought.deleteMany({})

//     const thoughtData = [
//         {
//             thoughtText: 'This is a thought',
//             username: 'user1',
//             reactions: [
//                 { reactionBody: 'This is a reaction', username: 'user2' }
//             ]
//         },
//         {
//             thoughtText: 'This is another thought',
//             username: 'user2',
//             reactions: [
//                 { reactionBody: 'This is a reaction', username: 'user3' }
//             ]
//         },
//         {
//             thoughtText: 'This is my thought',
//             username: 'user3',
//             reactions: [
//                 { reactionBody: 'This is a reaction', username: 'user4' }
//             ]
//         },
//         {
//             thoughtText: 'This is a fianl thought',
//             username: 'user4',
//             reactions: [
//                 { reactionBody: 'This is a reaction', username: 'user5' }
//             ]
//         }
//     ]

//     await Thought.insertMany(thoughtData)
// }

// const seedUsers = async () => {
//     await User.deleteMany({})

//     const [firstThought, secondThought, thirdThought, fourthThought] = await Thought.find()

//     // const [firstUser, secondUser, thirdUser, fourthUser] = await User.find()

//     const userData = [
//         {
//             username: 'user1',
//             email: 'user1@email.com',
//             thoughts: [firstThought._id]
//         },
//         {
//             username: 'user2',
//             email: 'user2@email.com',
//             thoughts: [secondThought._id]
//         },
//         {
//             username: 'user3',
//             email: 'user3@email.com',
//             thoughts: [thirdThought._id]
//         },
//         {
//             username: 'user4',
//             email: 'user4@email.com',
//             thoughts: [fourthThought._id]
//         },
//         {
//             username: 'user5',
//             email: 'user5@email.com'
//         }
//     ]

//     await User.insertMany(userData)
// }

// const init = async () => {
    
//     await seedThoughts()
//     await seedUsers()
//     const users = await User.find({}).populate('thoughts')
//     // console.log(JSON.stringify(users, null, 4))
// }

// init()