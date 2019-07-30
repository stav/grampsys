<script>
  import { database as db } from '../../public/gramps.json';
  import { Person }         from './models';

  const
    people = db.people.person,
    mapped = people.map( person => new Person(person) ),
    soborn = mapped.filter( person => person.dob ),
    unborn = mapped.filter( person => !person.dob );
    // filter = mapped.filter( person => person.dob && person.id === 'I0076' ),  // Debug

  export default {
    all: mapped,
    born: soborn.sort( (a, b) => ('' + a.dob).localeCompare(b.dob) ),
    unborn: unborn.sort( (a, b) => ('' + a.dob).localeCompare(b.dob) ),
  }
</script>
