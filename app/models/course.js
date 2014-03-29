'use strict';

var mongoose = require('mongoose'),
    rrule = require('rrule'),
    moment = require('moment'),
    _ = require('lodash'),
    colorList = require('../colorlist');

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
    modified: Date,
    rule: {
        wkdays: {
            sun: Boolean,
            mon: Boolean,
            tue: Boolean,
            wed: Boolean,
            thu: Boolean,
            fri: Boolean,
            sat: Boolean
        },
        duration: Number,
        count: Number
    }
});


/**
 * Validations
 */
CourseSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');


/**
 * Methods
 */
CourseSchema.methods.getMeetings = function(cb) {
    var meetings = [];
    var Semesters = mongoose.model('Semester');
    var startDate = this.startDate;
    if (!startDate) {
        Semesters.findOne({_id: this.semester}, function(err, sem) {
            if (err) startDate = undefined;
            else startDate = sem.startDate;
        });
    }
    if (this.rule && this.rule.count) {
        var dtstart = moment(startDate);
        var time = (this.rule.startTime) ? this.rule.startTime.split(':') : ['17','0'];
        dtstart.set('hour', time[0]).set('minute',time[1]).set('second', 0);
        
        var wds = [rrule.SU, rrule.MO, rrule.TU, rrule.WE, rrule.TH, rrule.FR, rrule.SA];
        var byweekday = _.filter(wds, function(wd, idx) { return this.rule.days[idx]; });
        
        var rule =  new rrule({
            dtstart: dtstart.toDate(),
            freq: rrule.WEEKLY,
            byweekday: byweekday,
            count: this.rule.count,
        });

        _.each(rule.all(), function(date, idx) {
            meetings.push({
                id: this._id + '_' + idx,
                title: this.title,
                start: date,
                end: moment(date).add('hours', this.duration || 1).toDate(),
                color: colorList[this.index % colorList.length]
            });
        });
    }
    // no errors ever
    cb(null, meetings);

};

/**
 * Hooks
 */
CourseSchema.pre('save', function(next) {
    this.modified = new Date();
    next();
});

/**
 * Statics
 */
CourseSchema.statics.load = function(id, cb) {
    this.findOne({_id: id}).populate('createdBy', 'name username').exec(cb);
};


var Course = mongoose.model('Course', CourseSchema);
