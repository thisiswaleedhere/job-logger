const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 50
    },
    joblink: {
        type: String,
        required: [true, 'Please provide job link'],
        minlength: 3
    },
    status: {
        type: String,
        enum: ['Applied', 'Declined', 'Interview', 'Rejected', 'Converted'],
        default: 'Applied'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
}, { timestamps: true })


module.exports = mongoose.model('Job', JobSchema)