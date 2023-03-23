const { knex: Knex } = require('knex')
const config = require('../../../../knexfile');

const decodeCourseInJourney = ({
  id,
  journey_id,
  title,
  description,
  thumb,
  instructor,
  level,
  slug,
  lessons
}) => ({
  id,
  journey_id,
  name: title,
  description,
  thumb,
  instructor,
  level,
  slug,
  lessons
})

const decodeLessons = ({
  id,
  title,
  description
}) => ({
  id,
  name: title,
  courseDescription: description
})

const decodeLessonsMap = rows => rows.map(decodeLessons)

const decodeCoursesInJourney = rows => rows.map(decodeCourseInJourney)

const Repository = () => {
  const knex = Knex(config)

  const getAllCoursesInAJorney = (id) =>
    knex
      .select('courses.*', 'journeys_courses.journey_id')
      .from('courses')
      .innerJoin('journeys_courses', 'courses.id','journeys_courses.course_id')
      .where('journeys_courses.journey_id', id)
      .then(decodeCoursesInJourney)

  const getACourseInAJorney = (id) =>
      knex
        .select('courses.*', 'journeys_courses.journey_id')
        .from('courses')
        .innerJoin('journeys_courses', 'courses.id','journeys_courses.course_id')
        .where('courses.id', id)
        .then(decodeCoursesInJourney)

  const getLessonsInACourse = (id) =>
    knex
      .select('*')
      .from('lessons')
      .where('course_id', id)
      .then(decodeLessonsMap)

  return {
    getACourseInAJorney,
    getAllCoursesInAJorney,
    getLessonsInACourse
  }
}

module.exports = {
  Repository
}
