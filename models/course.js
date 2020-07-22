const mongoose = require('mongoose');
const {Schema} = mongoose;
const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        maxStudents: {
            type: Number,
            default: 0,
            min: [0, "Course cannot hava a negative number of students"]
        },
        cost: {
            type: Number,
            default: 0,
            min: [0, "Course cannot have a negative cost"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Course", courseSchema);