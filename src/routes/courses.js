const router = require('express').Router();

/**
 * Fetches a single study session.
 */
router.get('/:courseId', (req, res) => {
    const userId = req.header('X-User-Id');
    if (!userId) {
        res.sendStatus(401); // Unauthorized.
    }

    const totalModulesStudied = 7;
    const averageScore = 3;
    const timeStudied = 999;
    res.json({totalModulesStudied, averageScore, timeStudied});
});

/**
 * Fetches course lifetime statistics.
 */
router.get('/:courseId/sessions/:sessionId', (req, res) => {
    const userId = req.header('X-User-Id');
    if (!userId) {
        res.sendStatus(401); // Unauthorized
    }

    const totalModulesStudied = 7;
    const averageScore = 3;
    const timeStudied = 999;
    res.json({totalModulesStudied, averageScore, timeStudied});
});

/**
 * Persists a session study event.
 */
router.post('/:courseId', (req, res) => {
    const userId = req.header('X-User-Id');
    if (!userId) {
        res.sendStatus(401); // Unauthorized
    }

    if (!isBodyValid(req.body)) {
        res.sendStatus(400); // Bad request
    }

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