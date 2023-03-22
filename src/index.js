const express = require('express');

const journey = require('./api/journeys/routes')
const course = require('./api/courses/routes')

const app = express();
const router = express.Router();

router.use(express.json());
router.use('/journeys', journey);
router.use('/courses', course)

app.use('/api', router);

app.get('/', (_, res) => {
  return res.json({
    message: 'Staart API'
  })
});

app.listen(3333, () => {
  console.log('API executando na porta 3333!')
});
