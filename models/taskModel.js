const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    due_date: { type: Date, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, required: false },
    updated_by: { type: mongoose.Schema.Types.ObjectId, required: false },
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

taskSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true
});

taskSchema.virtual('creator', {
    ref: 'User',
    localField: 'created_by',
    foreignField: '_id',
    justOne: true
});

taskSchema.virtual('editor', {
    ref: 'User',
    localField: 'updated_by',
    foreignField: '_id',
    justOne: true
});

taskSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret.id }
});

taskSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret.id }
});

const taskModel = model('Tasks', taskSchema);

module.exports = taskModel;