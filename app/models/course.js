'use strict';

var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    semester: { type: mongoose.Schema.ObjectId, ref: 'Semester'},
    isModel: { type: Boolean, default: false },
    basedOn: { type: mongoose.Schema.ObjectId, ref: 'Course'},
    created: { type: Date, default: Date.now },
    modified: Date
});


/**
 * Validations
 */
CourseSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');


/**
 * Statics
 */
CourseSchema.statics.load = function(id, cb) {
    this.findOne({_id: id}).populate('createdBy', 'name username').exec(cb);
};


var Course = mongoose.model('Course', CourseSchema);
