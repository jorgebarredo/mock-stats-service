const router = require('express').Router();
const Stats = require('../controllers/stats').Stats;

const stats = new Stats();

/**
 * Fetches a single study session.
 */
router.get('/:courseId', (req, res) => {
    const userId = req.header('X-User-Id');
    if (!userId) {
        res.sendStatus(401); // Unauthorized.
        return;
    }

    try {
        const courseStats = stats.getCourseStats(userId, req.params.courseId);
        res.send(courseStats);
    } catch {
        res.sendStatus(404); // Not found.
    }
});

/**
 * Fetches course lifetime statistics.
 */
router.get('/:courseId/sessions/:sessionId', (req, res) => {
    const userId = req.header('X-User-Id');
    if (!userId) {
        res.sendStatus(401); // Unauthorized
        return;
    }

    try {
        const sessionStats = stats.getSessionStats(userId, req.params.courseId, req.params.sessionId);    
        res.send(sessionStats);
    } catch {
        res.sendStatus(404); // Not found
    }
});

/**
 * Persists a session study event.
 */
router.post('/:courseId', (req, res) => {
    const userId = req.header('X-User-Id');
    if (!userId) {
        res.sendStatus(401); // Unauthorized
        return;
    }

    if (!isBodyValid(req.body)) {
        res.sendStatus(400); // Bad request
        return;
    }

    const stat = stats.saveSessionStats(userId, req.params.courseId, req.body);
    res.sendStatus(201);
});

/**
 * Returns true if the body fields are valid; false otherwise.
 * @param {Object} body 
 */
const isBodyValid = (body) => {
    if (!body) {
        return false;
    }

    if (typeof(body.sessionId) !== "string") {
        return false;
    }

    if (typeof(body.totalModulesStudied) !== "number") {
        return false;
    }

    if (typeof(body.averageScore) !== "number") {
        return false;
    }

    if (typeof(body.timeStudied) !== "number") {
        return false;
    }

    return true;
};

module.exports = router;