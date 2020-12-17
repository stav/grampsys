import { database as publicDatabase } from '../../public/gramps.json';
import { Person, Member } from '@/data/models';

function getOldestMalePerson ( db, events ) {
  if ( !db ) return;
  const
    people = db.people.person,
    mapped = people.map( person => new Person(person, events) ),
    soborn = mapped.filter( person => person.dob ),
    sorted = soborn.sort( (a, b) => ('' + a.dob).localeCompare(b.dob) );
  return sorted[0]
}

export default {

  appDatabaseEmpty ( state ) {
    return state.db === null
  },

  publicDatabaseEmpty () {
    if (
      publicDatabase &&
      publicDatabase.events   && publicDatabase.events.event    && publicDatabase.events.event.length  &&
      publicDatabase.people   && publicDatabase.people.person   && publicDatabase.people.person.length &&
      publicDatabase.families && publicDatabase.families.family && publicDatabase.families.family.length
    ) return false;
    else return true
  },

  familyPatronPerson ( state, getters ) {
    return getOldestMalePerson( state.db, getters.events )
  },

  familyPatronMember ( state, getters ) {
    const patron = getOldestMalePerson( state.db, getters.events );
    return patron ? new Member( patron, getters ) : undefined
  },

  memberById ( state, getters ) {
    return ( id ) => new Member( new Person(state.db.people.person.find( p => p.id === id ), getters.events), getters )
  },

  memberByHandle ( state, getters ) {
    return ( handle ) => new Member( new Person(state.db.people.person.find( p => p.handle === handle ), getters.events), getters )
  },

  personByHandle ( state, getters ) {
    return ( handle ) => new Person(state.db.people.person.find( p => p.handle === handle ), getters.events)
  },

  familyById ( state ) {
    return ( id ) => state.db.families.family.find( f => f.id === id )
  },

  familyByHandle ( state ) {
    return ( handle ) => state.db.families.family.find( f => f.handle === handle )
  },

  allPeople ( state, getters ) {
    return (getters.appDatabaseEmpty ? [] : state.db.people.person)
      .map( person => new Person(person, getters.events) )
  },

  bornPeople ( state, getters ) {
    return getters.allPeople
      .filter( person => person.dob )
      .sort( (a, b) => ('' + a.dob).localeCompare(b.dob) )
  },

  unbornPeople ( state, getters ) {
    return getters.allPeople
      .filter( person => !person.dob )
  },

  /*
  ** events
  **
  ** Public file database events map with handle as the key
  **
  ** Example list:
  **
  **   _dafb69389cc268ca202225bfa10 → { handle: "_dafb69389cc268ca202225bfa10", change: "1504833356", id: "E0000", … }
  *​*   _dafb696950427b6635e0aacc420 → { handle: "_dafb696950427b6635e0aacc420", change: "1504833375", id: "E0001", … }
  *​*   _dafb90107f5414a56ca26a1accd → { handle: "_dafb90107f5414a56ca26a1accd", change: "1504837429", id: "E0002", … }
  *​*   _dafb9049f741c454ad0263d3851 → { handle: "_dafb9049f741c454ad0263d3851", change: "1538777118", id: "E0003", … }
  **
  ** Example entry:
  **
  **   <key>:
  **    "_dafb69389cc268ca202225bfa10"
  *​​​*
  **   <value>:
  **    ​​​​​id: "E0000"
  **    ​​​​​type: "Birth"
  **    ​​​​​place: { hlink: "_dafb692976a7108efb419dd963" }
  **    ​​​​​handle: "_dafb69389cc268ca202225bfa10"
  **    ​​​​​change: "1504833356"
  **    ​​​​​dateval: { val: "1965-12-26" }
  */
  events ( state, getters ) {
    let event_map = new Map();
    const events = getters.appDatabaseEmpty ? [] : state.db.events.event;
    for (let event of events) {
      event_map.set(event.handle, event)
    }
    return event_map
  },

  /*
  ** roots
  **
  ** Acquire the root nodes of the tree
  **
  ** { "database": {
  **     "xmlns": "http://gramps-project.org/xml/1.7.1/",
  **     "header": {
  **       "created": {
  **         "date": "2019-09-12",
  **         "version": "5.1.0"
  **       },
  **       "roots": {
  **         "root": [
  **           {"id": "F0037"},
  **           {"id": "F0040"}
  **       ] },
  **       "researcher": "Steven Almeroth"
  **     },...
  */
  roots ( state ) {
    return state.db?.header?.roots?.root
  },

  totalFamilys ( state ) {
    try {
      return state.db.families.family
    }
    catch (e) {
      return []
    }
  },

  oldestFamily ( state, getters) {
    return getters.totalFamilys
      .filter( family => family.date )
      .sort( (a, b) => a.date > b.date )[0];
  }

}
