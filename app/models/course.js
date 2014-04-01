'use strict';

var mongoose = require('mongoose'),
    moment = require('moment'),
    RRule = require('rrule').RRule,
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
    },
    startDate: Date,
    instructor: { type: mongoose.Schema.ObjectId, ref: 'User' },
    shortDescription: String,
    description: String
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
CourseSchema.methods = {
    enrollStudent: function(user) {
        console.log("enroll student");
    },
    
    getMeetings: function(start, end, cb) {
        var course = this,
            meetings = [],
            Semesters = mongoose.model('Semester'),
            startDate = course.startDate;

        if(typeof start === 'function') {
            cb = start;
            start = end = null;
        }

        if (!startDate) {
            Semesters.findOne({_id: course.semester}, function(err, sem) {
                if (err) startDate = undefined;
                else startDate = sem.startDate || new Date();
            });
        }

        if (course.rule && course.rule.count) {
            var dtstart = moment(startDate);
            var time = (course.rule.startTime) ? course.rule.startTime.split(':') : ['17','0'];
            dtstart.set('hour', time[0]).set('minute',time[1]).set('second', 0);
            
            var wds = { sun: RRule.SU, mon: RRule.MO, tue: RRule.TU, wed: RRule.WE, thu: RRule.TH, fri: RRule.FR, sat: RRule.SA };
            var byweekday = _.pick(wds, function(value, key) {
                return course.rule.wkdays && course.rule.wkdays[key];
            });
            byweekday = _.values(byweekday);
            
            var rule =  new RRule({
                dtstart: dtstart.toDate(),
                freq: RRule.WEEKLY,
                byweekday: byweekday,
                count: course.rule.count,
            });

            _.each(rule.all(), function(date, idx) {
                if ( (!start || !end) || (date >= start && date <= end)) {
                    meetings.push({
                        id: course._id + '_' + idx,
                        title: course.title,
                        start: date,
                        end: moment(date).add('hours', course.duration || 1).toDate(),
                        color: colorList[course.index % colorList.length]
                    });
                }
            });
        }
        // no errors ever
        if (cb) {
            cb(null, meetings);
        }
        return meetings;
    }
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
