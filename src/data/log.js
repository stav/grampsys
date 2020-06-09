/* eslint no-console: "off" */
/*
 * Logging helper functions
 */
import u from './utils';

/**
 * Log web storage to standard out
 */
function datafile ( text ) {
  const datafile = localStorage.getItem('datafile');
  console.log( '*', text, 'datafile', _meta(datafile),
    (datafile || '')
    .substring(0, 99)
    .replace(/\s+/g, ' ')
  )
}

/**
 * Log object to standard out
 */
function object ( text, object ) {
  console.log( '*', text, _meta(object), object )
}

/**
 * Log db from store to standard out
 */
function store ( text, store ) {
  const db = store.state.db;
  const level = u.isEmpty( db ) ? 'empty' : '';
  console.log( '*', text, 'store', level, '*', store.getters.appDatabaseEmpty, store )
}

/**
 * Log stars to separate streams
 */
function header () {
  console.log('*******************')
}

/**
 * Log Gramps database to standard out
 */
function db ( text, db ) {
  const
    event = db && db.events && db.events.event ? db.events.event.length : 0,
    person = db && db.people && db.people.person ? db.people.person.length : 0,
    family = db && db.families && db.families.family ? db.families.family.length : 0;
  console.log( '*', text, _meta(db),
    family, 'families',
    person, 'people',
    event, 'events',
    db
  )
}

/**
 * Return given object type and size
 */
function _meta ( o ) {
  return `(${u.type(o)},${Object.keys(o||{}).length})`
}

export default {

  datafile,
  header,
  object,
  store,
  db,

}
