const express = require('express');

const journey = require('./api/journeys/routes')
const course = require('./api/courses/routes')
const resource = require('./api/resources/routes')
const lessons = require('./api/lessons/routes')

const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')

const app = express();
const router = express.Router();

router.use(express.json());
router.use(logger());
router.use('/journeys', journey);
router.use('/courses', course);
router.use('/resource', resource);
router.use('/lessons', lessons);

router.use(errorHandler())

app.use('/api', router);

app.get('/', (_, res) => {
  return res.json({
    message: 'Staart API'
  })
});

app.listen(3333, () => {
  console.log('API executando na porta 3333!')
});
