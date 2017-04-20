const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			courses,
			allCourses = server.db.getState().courses;
		console.log(sort);
		console.log(queryStr);
		if (allCourses.length < to) {
			to = allCourses.length;
		}
    courses = allCourses.slice(from, to);

		res.json({
      courses: courses,
      total: allCourses.length
    });
	});

	return router;
};
