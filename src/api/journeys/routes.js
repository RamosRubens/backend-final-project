const { Router } = require('express')

const withAsyncErrorHandler = require('../../middlewares/async-error')

const router = Router()

const { JourneyRepository } = require('./repository')

const repository = JourneyRepository()

const listJourneys = async(_req, res) =>
  repository
    .list()
    .then(journeys => res.status(200).send({journeys}))

router.get('/', withAsyncErrorHandler(listJourneys))

module.exports = router
