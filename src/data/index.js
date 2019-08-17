/*
 * Data functions
 */
import { database as db } from '../../public/gramps.json';
import { Person } from './models';


function getPersonByHandle ( handle ) {
  return new Person(db.people.person.find( p => p.handle === handle ))
}

function getFamily ( handle ) {
  return db.families.family.find( f => f.handle === handle )
}

function dbFileHeader () {
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
  getPersonByHandle,
  getFather,
  getMother,
  getFamily,

  dbFileHeader,
}
