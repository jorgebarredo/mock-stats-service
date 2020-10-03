const CourseStat = require('./courseStat').CourseStat;

class User {
    constructor() {
        this.courses = new Map();
    }

    /**
     * Get a course stat and create one if it does not exist.
     * @param {string} courseId Course Id
     */
    getCourse(courseId) {
        if (!this.courses.has(courseId)) {
            this.courses.set(courseId, new CourseStat());
        }

        return this.courses.get(courseId);
    }
}

module.exports = {
    User: User
}