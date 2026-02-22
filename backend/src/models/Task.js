const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },

    status:{
        type: String,
        enum: ['todo', 'in_progess', 'done'],
        default: 'todo'
    },

    createdAt:{
        type: Date,
        default: Date.now,
        index: true
    }
});

module.exports = mongoose.model('Task',TaskSchema);