var models = require("../models/models.js");
// GET /statistics -- Muestra estadísticas
exports.index = function(req, res, next){
	var numQuestions = 0;
	var numComments = 0;
	models.Quiz.count().then(function(count){
		var numQuestions = count;
		models.Comment.count().then(function(count){		
		var numComments = count;
		var commentsAvg = numComments/numQuestions;
		models.Quiz.count({include: [ {model: models.Comment, where: {id: {$gt: 0}}} ]}).then(function(questionsWithComments){
			var withComments = questionsWithComments;
			var withOutComments = numQuestions - withComments;		
			res.render('statistics/index', {questions: numQuestions, comments:numComments, avg: commentsAvg, withComments: withComments, withOutComments: withOutComments, errors: []});
			});
		});
	});

};
