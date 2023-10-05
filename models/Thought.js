const dayjs = require('dayjs')

const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')
const formatDate = require('../utils/formatDate')

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dayjs(timestamp).format('dddd, MMMM D')
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
    },
    id: false
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought