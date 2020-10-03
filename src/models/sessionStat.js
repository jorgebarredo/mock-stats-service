class SessionStat {
    constructor() {
        this.set(0, 0, 0);
    }

    /**
     * Set stat data.
     * @param {Number} totalModulesStudied Total moduled studied.
     * @param {Number} averageScore Average score for the moduled studied.
     * @param {Number} timeStudied Milliseconds spended in the current session.
     */
    set(totalModulesStudied, averageScore, timeStudied) {
        this.totalModulesStudied = totalModulesStudied;
        this.averageScore = averageScore;
        this.timeStudied = timeStudied;
    }

    /**
     * Returns a new SessionStat with the aggreated sessions stats.
     * @param {Iterable} sessions All sessions to aggregate stats from.
     */
    static aggregate(sessions) {
        const session = new SessionStat();
        for (const sessionStat of sessions) {
            session.totalModulesStudied += sessionStat.totalModulesStudied;
            session.averageScore += sessionStat.averageScore * sessionStat.totalModulesStudied;
            session.timeStudied += sessionStat.timeStudied;
        };

        if (session.totalModulesStudied > 0) {
            session.averageScore /= session.totalModulesStudied;
        }

        return session;
    }
}

module.exports = {
    SessionStat: SessionStat
}