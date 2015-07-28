var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});


// Autoload
router.param('quizId', quizController.load); 

//Definicion de rutas de session
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/quizes', quizController.index)
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/author', authorController.author);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
