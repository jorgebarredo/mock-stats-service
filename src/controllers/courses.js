const sessionStat = require('../models/sessionStat');
const User = require('../models/user').User;

class Courses {
    constructor() {
        this.users = new Map();
    }

    getCourseStats(userId, courseId) {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error("Invalid user");
        }

        const course = user.getCourse(courseId);
        if (!course) {
            throw new Error("Invalid course");
        }

        const courseStats = course.getCourseStats();
        return courseStats;
    }

    getSessionStats(userId, courseId, sessionId) {
        const user = this.users.get(userId);
        if (!user) {
            throw new Error("Invalid user");
        }

        const course = user.getCourse(courseId);
        if (!course) {
            throw new Error("Invalid course");
        }

        const sessionStats = course.getSessionStats(sessionId);
        if (!sessionStats) {
            throw new Error("Invalid session");
        }

        return sessionStats;
    }

    saveSessionStats(userId, courseId, session) {
        if (!this.users.has(userId)) {
            this.users.set(userId, new User());
        }

        const user = this.users.get(userId);
        const courseStat = user.getCourse(courseId);
        const {sessionId, totalModulesStudied, averageScore, timeStudied} = session;

        const stat = courseStat.setSessionStats(sessionId, totalModulesStudied, averageScore, timeStudied);
    
        return stat;
    }
}

module.exports = {
    Courses: Courses
}
