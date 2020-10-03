const SessionStat = require('./sessionStat').SessionStat;

class CourseStat {
    constructor() {
        this.sessions = new Map();
    }

    setSessionStats(sessionId, totalModulesStudied, averageScore, timeStudied) {
        const session = this._getCreateSessionStats(sessionId);
        session.set(totalModulesStudied, averageScore, timeStudied);
        return session;
    }

    getSessionStats(sessionId) {
        if (!this.sessions.has(sessionId)) {
            return null;
        }

        return this.sessions.get(sessionId);
    }

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