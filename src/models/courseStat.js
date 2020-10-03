const SessionStat = require('./sessionStat').SessionStat;

class CourseStat {
    constructor() {
        this.sessions = new Map();
    }

    /**
     * Set session stats for current course.
     * @param {String} sessionId Session Id.
     * @param {Number} totalModulesStudied Total moduled studied.
     * @param {Number} averageScore Average score for the moduled studied.
     * @param {Number} timeStudied Milliseconds spended in the current session.
     */
    setSessionStats(sessionId, totalModulesStudied, averageScore, timeStudied) {
        const session = this._getCreateSessionStats(sessionId);
        session.set(totalModulesStudied, averageScore, timeStudied);
        return session;
    }

    /**
     * Return a session stat.
     * @param {string} sessionId Get session stat.
     */
    getSessionStats(sessionId) {
        if (!this.sessions.has(sessionId)) {
            return null;
        }

        return this.sessions.get(sessionId);
    }

    /**
     * return an aggregated stat for the current course.
     */
    getCourseStats() {
        return SessionStat.aggregate(this.sessions.values());
    }

    _getCreateSessionStats(sessionId) {
        if (!this.sessions.has(sessionId)) {
            this.sessions.set(sessionId, new SessionStat());
        }

        return this.sessions.get(sessionId);
    }
}

module.exports = {
    CourseStat: CourseStat
}