const { knex: Knex } = require('knex')
const config = require('../../../../knexfile');

const decodeJourney = ({
  id,
  title,
  icon,
  thumb,
  description,
  slug,
}) => ({
  id,
  name: title,
  icon,
  thumb,
  description,
  slug
})

const decodeJourneys = rows => rows.map(decodeJourney)

const Repository = () => {
  const knex = Knex(config)

  const list = () =>
    knex
      .select('*')
      .from('journeys')
      .then(decodeJourneys)

  return {
    list
  }
}

module.exports = {
  Repository
}
