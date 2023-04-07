const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        validate: {
            validator: function(v) {
              return /^[a-zA-Z]+$/.test(v);
            },
            message: 'First name can only contain letters'
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z]+$/.test(v);
            },
            message: 'First name can only contain letters'
        }
    },
    gender: {
        type: String,
        enum: ["male","female","no-set"],
        default: "not-set"
    },
    birth: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: [String],
        required: true,
        unique: true,
        trim: true
    },
    userId : {
        unique: true,
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true,
        trim: true,
        validate: [
            {
                validator: function(v) {
                    return /^[0-9]+$/.test(v);
                },
                message: 'User ID can only contain numeric characters'
            },
            {
                validator: async function(v) {
                    const user = await this.constructor.findOne({ email: v });
                    if (user) {
                        throw new Error('userId already exists');
                    }
                    return true;
                },
                message: 'userId must be unique'
            }
        ]
    },
    city: {
        type: String,
        trim: true,
        default: 'not-set'
    },
    company: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 40
    },
    position: {
        type: String,
        required: true,
        trim: true,
        enum: ["employee","manager"],
        default: "employee"
    },
    createdAt: {
        type: Date,
        default: new Date
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('employee', EmployeeSchema)