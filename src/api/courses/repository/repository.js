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
  slug
}) => ({
  id,
  journey_id,
  name: title,
  description,
  thumb,
  instructor,
  level,
  slug
})

const decodeCoursesInJourney = rows => rows.map(decodeCourseInJourney)

const Repository = () => {
  const knex = Knex(config)

  const getAllCoursesInAJorney = (id, transaction = knex) =>
    transaction
      .select('courses.*', 'journeys_courses.journey_id')
      .from('courses')
      .innerJoin('journeys_courses', 'courses.id','journeys_courses.course_id')
      .where('journeys_courses.journey_id', id)
      .then(decodeCoursesInJourney)

  return {
    getAllCoursesInAJorney
  }
}

module.exports = {
  Repository
}
