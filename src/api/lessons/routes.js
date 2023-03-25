const { Router } = require('express')

const withAsyncErrorHandler = require('../../middlewares/async-error')

const router = Router()

const { LessonsRepository } = require('./repository')

const repository = LessonsRepository()

const listLessons = async(_req, res) =>
  repository
    .list()
    .then(lessons => res.status(200).send({lessons}))

router.get('/', withAsyncErrorHandler(listLessons))

module.exports = router
