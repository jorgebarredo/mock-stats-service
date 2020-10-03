class SessionStat {
    constructor() {
        this.set(0, 0, 0);
    }

    set(totalModulesStudied, averageScore, timeStudied) {
        this.totalModulesStudied = totalModulesStudied;
        this.averageScore = averageScore;
        this.timeStudied = timeStudied;
    }

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