import faunadb from 'faunadb'

const client = new faunadb.Client({ 
  secret: process.env.FAUNADB_KEY,
  domain: "db.us.fauna.com"
})
const q = faunadb.query

export { client , q }