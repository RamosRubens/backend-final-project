const { Router } = require('express')
const Joi = require('joi')
const { NotFoundError, ValidationError } = require('../../errors')

const withAsyncErrorHandler = require('../../middlewares/async-error')
const validate = require('../../middlewares/validate')

const router = Router()

const { CoursesRepository } = require('../courses/repository')
const { JourneyRepository } = require('../journeys/repository')

const coursesRepository = CoursesRepository()
const journeyRepository = JourneyRepository()

const ParamTypes = {
  JOURNEYS: 'journeys',
  COURSES: 'courses',
  LESSONS: 'lessons',
  ALL: 'all'
}

const getResource = async(req, res) => {

  const resourceName = req.query.resourceName
  const identifier = req.query.identifier

  validateRequest(resourceName, identifier)

  switch (resourceName) {
    case ParamTypes.JOURNEYS:
      journeyRepository
        .list()
        .then(journeys => res.status(200).send({journeys}))

      break;

    case ParamTypes.COURSES:
      const allCourses = await coursesRepository.getAllCoursesInAJorney(identifier)

      res.status(200).send(allCourses);
      break;
    case ParamTypes.LESSONS:

      const courses = await coursesRepository.getACourseInAJorney(identifier)
      const lessons = await coursesRepository.getLessonsInACourse(identifier)

      const completedCourse = prepareCourseObject(...courses, lessons)

      res.status(200).send(completedCourse)
      break;
  }
}

const validateRequest = (resourceName, id) => {

  if (!Object.values(ParamTypes).includes(resourceName)) {
    throw new NotFoundError({resourceName, id})
 }

  if (resourceName != ParamTypes.JOURNEYS){
    if(id == null || id == undefined || id == "") {
        throw new ValidationError({ validations: [{
              message: 'Parameter is not valid',
              path: [],
              type: 'object.unknown',
              context: []
        }]
      })
    }
  }
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

router.get('/', withAsyncErrorHandler(getResource))

module.exports = router
