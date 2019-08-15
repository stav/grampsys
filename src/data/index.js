/*
 * Data functions
 */
import { database as db } from '../../public/gramps.json';
import { Person, Member } from './models';


function getFamilyPatron() {
  const patron = getOldestMalePerson();
  return patron ? new Member( patron ) : undefined
}

function getOldestMalePerson () {
  const
    people = db.people.person,
    mapped = people.map( person => new Person(person) ),
    soborn = mapped.filter( person => person.dob ),
    sorted = soborn.sort( (a, b) => ('' + a.dob).localeCompare(b.dob) );
  return sorted[0]
}

function getPersonByHandle ( handle ) {
  return new Person(db.people.person.find( p => p.handle === handle ))
}

function getPersonById ( id ) {
  return new Person(db.people.person.find( p => p.id === id ))
}

function getMemberById ( id ) {
  return new Member(new Person(db.people.person.find( p => p.id === id )))
}

function getFamily ( handle ) {
  return db.families.family.find( f => f.handle === handle )
}

function header () {
  return db.header
}

function getParents ( person, member ) {
  if ( person._ && person._.childof && person._.childof ) {
    const parents = getFamily( person._.childof.hlink );
    if ( parents && parents[member] && parents[member].hlink ) {
      const parent = getPersonByHandle( parents[member].hlink );
      return parent ? parent.name : null
    }
  }
}

function getFather ( person ) {
  return getParents( person, 'father' )
}

function getMother ( person ) {
  return getParents( person, 'mother' )
}


export {
  getFamilyPatron,
  getMemberById,
  getPersonByHandle,
  getFather,
  getMother,
  getFamily,

  header,
}
