/*
 * Data models
 */
import {
  getFamily,
  getPersonByHandle,
  getFather,
  getMother,
} from './';
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


export {
  Member,
  Person,
}
