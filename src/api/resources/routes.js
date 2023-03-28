const { Router } = require('express')
const { any } = require('joi')
const Joi = require('joi')
const { NotFoundError, ValidationError } = require('../../errors')

const withAsyncErrorHandler = require('../../middlewares/async-error')
const validate = require('../../middlewares/validate')

const router = Router()

const { CoursesRepository } = require('../courses/repository')
const { JourneyRepository } = require('../journeys/repository')
const { LessonsRepository } = require('../lessons/repository')

const coursesRepository = CoursesRepository()
const journeyRepository = JourneyRepository()
const lessonsRepository = LessonsRepository()

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

const postResource = async(req, res) => {
  try {

    const listType = req.body.listType

    validatePost(listType)

    switch (listType) {
      case ParamTypes.JOURNEYS:
        journeyRepository
          .list()
          .then(journeys => res.status(200).send({journeys}))
        break;

      case ParamTypes.COURSES:
        coursesRepository
          .listCourses()
          .then(courses => res.status(200).send({courses}))

        break;

      case ParamTypes.LESSONS:
        lessonsRepository
          .list()
          .then(lessons => res.status(200).send({lessons}))
        break;

      case ParamTypes.ALL:

        const journeys = await journeyRepository.list()
        const allJourneys = [];

        for (const journey of journeys) {
          const courses = await coursesRepository.getAllCoursesInAJorney(journey.id);
          for (const course of courses) {
            const lessons = await coursesRepository.getLessonsInACourse(course.id);
            course.lessons = lessons
          }

          const journeyWithAllCourses = prepareCompleteObject(journey, courses);

          allJourneys.push(journeyWithAllCourses);
        }

        res.status(200).send(allJourneys)
        break;
      }
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

const prepareCompleteObject = (journey, courses) => ({
  id: journey.id,
  name: journey.name,
  courseDescription: journey.description,
  thumb: journey.thumb,
  slug: journey.slug,
  courses: courses
})

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

const validatePost = (paramType) => {
  if (!Object.values(ParamTypes).includes(paramType)) {
    throw new NotFoundError({paramType, paramType})
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
router.post('/', withAsyncErrorHandler(postResource))

module.exports = router
