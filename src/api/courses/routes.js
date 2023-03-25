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

const getCourse = async(req, res) => {

  const id = req.params.id

  const courses = await repository.getACourseInAJorney(id)
  const lessons = await repository.getLessonsInACourse(id)

  const completedCourse = prepareCourseObject(...courses, lessons)

  res.status(200).send(completedCourse)
}

const prepareCourseObject = (courses, lessons) => ({
  id: courses.id,
  journey_id: courses.journey_id,
  name: courses.name,
  courseDescription: courses.description,
  thumb: courses.thumb,
  instructor: courses.instructor,
  level: courses.level,
  slug: courses.slug,
  lessons: lessons
})

const listCourses = async(_req, res) =>
  repository
    .listCourses()
    .then(courses => res.status(200).send({courses}))

router.get('/', withAsyncErrorHandler(listCourses))
router.get('/:id/lessons', validate(GetCoursesInJourneySchema), withAsyncErrorHandler(getCourse))
router.get('/:id', validate(GetCoursesInJourneySchema), withAsyncErrorHandler(getCoursesInJourney))

module.exports = router
