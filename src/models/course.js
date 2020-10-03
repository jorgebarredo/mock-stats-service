class SessionStat {
    constructor() {
        this.set(0, 0, 0);
    }

    set(totalModulesStudied, averageScore, timeStudied) {
        this.totalModulesStudied = totalModulesStudied;
        this.averageScore = averageScore;
        this.timeStudied = timeStudied;
    }
}

class CourseStat {
    constructor() {
        this.sessions = new Map();
    }

    setSessionStats(sessionId, totalModulesStudied, averageScore, timeStudied) {
        const session = this.getSessionStats(sessionId);
        session.set(totalModulesStudied, averageScore, timeStudied);
    }

    getSessionStats(sessionId) {
        if (!this.sessions.has(sessionId)) {
            this.sessions.set(sessionId, new SessionStat());
        }

        return this.sessions.get(sessionId);
    }

    getCourseStats() {
        const session = new SessionStat();
        for (const sessionStat of this.sessions.values()) {
            console.log(sessionStat);
            session.totalModulesStudied += sessionStat.totalModulesStudied;
            session.averageScore += sessionStat.averageScore * sessionStat.totalModulesStudied;
            session.timeStudied += sessionStat.timeStudied;
        };

        session.averageScore /= session.totalModulesStudied;

        return session;
    }
}

class User {
    constructor() {
        this.courses = new Map();
    }

    getCourse(courseId) {
        if (!this.courses.has(courseId)) {
            this.courses.set(courseId, new CourseStat());
        }

        return this.courses.get(courseId);
    }
}

const users = new Map();

const userId = "asd9-a1ba-asdfasdf";
const courseId = "courseId1";
const session1 = {
    "sessionId": "sssss001",
    "totalModulesStudied": 7,
    "averageScore": 2,
    "timeStudied": 999
};

const session2 = {
    "sessionId": "sssss002",
    "totalModulesStudied": 3,
    "averageScore": 3,
    "timeStudied": 19999  
};

const post = (userId, courseId, session) => {
    if (!users.has(userId)) {
        users.set(userId, new User(userId));
    }

    const {sessionId, totalModulesStudied, averageScore, timeStudied} = session;

    const user = users.get(userId);
    const courseStat = user.getCourse(courseId);
    courseStat.setSessionStats(sessionId, totalModulesStudied, averageScore, timeStudied);

    return courseStat.getSessionStats(sessionId);
};

const getSessionStats = (userId, sessionId) => {
    const user = users.get(userId);
    const courseStat = user.getCourse(courseId);
    return courseStat.getSessionStats(sessionId);
};

const getCourseStats = (userId, courseId) => {
    const user = users.get(userId);
    const courseStat = user.getCourse(courseId);
    return courseStat.getCourseStats();
};

console.log(post(userId, courseId, session1));
console.log(post(userId, courseId, session2));
console.log(getSessionStats(userId, session1.sessionId));
console.log(getSessionStats(userId, session2.sessionId));
console.log(getCourseStats(userId, courseId));
