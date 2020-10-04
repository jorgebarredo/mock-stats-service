const sessionStat = require('../models/sessionStat');

const User = require('../models/user').User;

class Course {
    constructor() {
        this.users = new Map();
    }

    /**
     * Get aggregated stats for the given userId and curseId.
     * @param {string} userId User Id
     * @param {string} courseId Course Id
     */
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

    /**
     * Get stats for the given userId, courseId and sessionId.
     * @param {string} userId User Id
     * @param {string} courseId Course Id
     * @param {string} sessionId Session Id
     */
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

    /**
     * Save session stats event.
     * @param {string} userId User Id
     * @param {string} courseId Course Id
     * @param {object} session Object with sessionId, totalModulesStudied, averageScore, timeStudied fields
     */
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
    Course: Course
}
