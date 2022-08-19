const mongoose = require('mongoose')

const User = mongoose.model('User', {
    primary_name: String,
    secundary_name: String,
    user_type: Number,
    active: Boolean,
    office: Number,
    customer_id: Number,
    blocked: Boolean,
})

module.exports = User