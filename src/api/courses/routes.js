const { Router } = require('express')
const Joi = require('joi')

const withAsyncErrorHandler = require('../../middlewares/async-error')
const validate = require('../../middlewares/validate')

const router = Router()

const { CoursesRepository } = require('./repository')

const repository = CoursesRepository()

const GetCoursesInJourneySchema = {
  params: Joi.object({
    id: Joi.required()
  })
}

const getCoursesInJourney = async(req, res) => {

  const id = req.params.id

  const courses = await repository.getAllCoursesInAJorney(id)

  res.status(200).send(courses)
}

router.get('/:id', validate(GetCoursesInJourneySchema), withAsyncErrorHandler(getCoursesInJourney))

module.exports = router
