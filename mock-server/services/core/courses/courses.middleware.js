const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort || 'date',
			queryStr = query.query.trim(),
			courses,
			allCourses = server.db.getState().courses,
      filteredCourses;
		console.log(sort);
		console.log(queryStr);

		if (queryStr && queryStr.length > 0) {
		  filteredCourses = allCourses.filter(course => (course.name.toLowerCase().indexOf(queryStr.toLowerCase()) > -1));
    } else {
      filteredCourses = allCourses;
    }

    filteredCourses = filteredCourses.sort((a, b) => {
      if ( a[sort] < b[sort] )
        return -1;
      if ( a[sort] > b[sort] )
        return 1;
      return 0;
    });

		if (filteredCourses.length < to) {
			to = filteredCourses.length;
		}
    courses = filteredCourses.slice(from, to);

		res.json({
      courses: courses,
      total: filteredCourses.length
    });
	});

	return router;
};
