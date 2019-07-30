/*
 * Models
 */
import { database as db } from '../../public/gramps.json';

import events from './events';
import u      from './utils';


class Person
{

  constructor ( json )
  {
    this._ = json;
    this.id = json.id;
    this.name = this._name();
    this.dob = this._dob();
    this.age = this._age();
  }

  _name ()
  {
    function lname () {
      if (u.isObject(name.surname)) {
        return `${name.surname.prefix||''} ${name.surname['$t']||''}`.trim()
      }
      return name.surname
    }
    const name = u.first(u.toArray(this._.name));
    return `${name.first} ${lname()}`.trim()
  }

  _dob ()
  {
    for (let eventref of u.toArray(this._.eventref)) {
      const hlink = eventref ? eventref.hlink : undefined;
      const event = events.get(hlink) || {};
      if (event.type === 'Birth') {
        return event.dateval.val
      }
    }
  }

  _age ()
  {
    if (!this.dob) return '';

    const today = new Date();
    const birthDate = new Date(this.dob);

    let yearsDifference = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      yearsDifference--;
    }

    return yearsDifference;
  }

}


class Member
{

  constructor ( person )
  {
    this._ = person;
    this.id = person.id;
    this.name = person.name;
    this.dob = person.dob;
    this.age = person.age;
    this.gen = 0;
    this.parents = [];
    this.parentins = u.toArray(person._.parentin);
    this.familys = [...this._familiesGenerator()]
    this.children = [...this._getChildren()];
    this.father = getFather( person );
    this.mother = getMother( person );
  }

  // label ()
  // {
  //   const name = this.name;
  //   const dob = this.dob ? `born ${this.dob}` : '';
  //   return `${name} ${dob}`.trim()
  // }

  // setParents () {
  //   if ( this._ && this._.childof && this._.childof.hlink ) {
  //     this.parents = getFamily( this._.childof.hlink );
  //   }
  // }

  *_getChildren () {
    for (let parent of u.toArray(this._._.parentin)) {
      const family = getFamily( parent.hlink );
      const childrefs = u .toArray( family ? family.childref : [] );
      const children = childrefs.map( ref => getPersonByHandle( ref.hlink ) );
      yield* children.sort( (a, b) => a.age < b.age ).map( child => new Member(child) )
    }
  }

  *_familiesGenerator () {
    for ( let parentin of this.parentins ) {
      const
        family = getFamily( parentin.hlink ),
        children = u.toArray( family ? family.childref : [] ),
        childBranches = children.map( ref => getPersonByHandle( ref.hlink ) );
      family.children = childBranches.sort( (a, b) => a.age < b.age );
      yield family
    }
  }

}


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
  getPersonById,

  Person,
}
