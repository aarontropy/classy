'use strict';

var mongoose = require('mongoose');

var SemesterSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: Date,
    description: String,
    active: Boolean,
    visible: {type: Boolean, default: false }
});




/**
 * Validations
 */
SemesterSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');


/**
 * Statics
 */
SemesterSchema.statics = {
    load: function(id, cb) {
        this.findOne({_id: id}).populate('createdBy', 'name username').exec(cb);
    }
};

var Semester = mongoose.model('Semester', SemesterSchema);
Semester.find().count().exec(function(err,n) {
    if (n === 0) {
        Semester.create([
            {title: 'Test Semester 1'},
            {title: 'Test Semester 2'}
        ], function(err) {
            console.log(err);
        });
    }
});