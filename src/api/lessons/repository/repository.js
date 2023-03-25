const { knex: Knex } = require('knex')
const config = require('../../../../knexfile');

const decodeLesson = ({
  id,
  course_id,
  title,
  description
}) => ({
  id,
  course_id,
  title,
  description
})

const decodeLessons = rows => rows.map(decodeLesson)

const Repository = () => {
  const knex = Knex(config)

  const list = () =>
    knex
      .select('*')
      .from('lessons')
      .then(decodeLessons)

  return {
    list
  }
}

module.exports = {
  Repository
}
