import { webStorageDatabaseFactory } from '@/data/browser';
import log from '@/data/log';
import u from '@/data/utils';

function formFamilies ( getters ) {
  const familys = getters.totalFamilys;
  log.object( 'store formFamilies: familys', familys )

  function date( family ) {
    let date = '';

    if ( family.mother && family.mother.hlink ) {
      u.extend( family.mother, getters.personByHandle( family.mother.hlink ) )
      if ( family.mother.dob )
        date = family.mother.dob;
    }
    if ( family.father && family.father.hlink ) {
      u.extend( family.father, getters.personByHandle( family.father.hlink ) )
      if ( family.father.dob ) {
        if ( !family.mother || !family.mother.dob || ( family.father.dob < family.mother.dob ) )
          date = family.father.dob;
      }
    }
    return date
  }

  for ( let family of familys ) {
    // Build up the children
    const
      children = u.toArray( family ? family.childref : [] ),
      childBranches = children.map( ref => getters.memberByHandle( ref.hlink ) );
    family.children = childBranches.sort( (a, b) => a.age < b.age );

    // Set the family date to the birth date of the oldest parent
    family.date = date( family );
  }
}

export default {

  setupDatabase ({ getters, commit }) {
    const webStorageDb = webStorageDatabaseFactory();
    log.object('store setupDatabase: webStorageDb', webStorageDb)
    if ( webStorageDb ) {
      // Load web storage database
      commit('loadDatabase', webStorageDb)
    }
    else if ( !getters.publicDatabaseEmpty ) {
      // Load public database
      commit('loadPublicDatabase')
    }
    else {
      // We need to upload a database file
      // console.log('No data found, click the upload button to upload a gramps JSON export')
      return
    }
    formFamilies( getters )
  },

  loadDataFile ( {commit}, datafile ) {
    let db = null;
    try {
      db = JSON.parse( datafile ).database;
    }
    catch (e) {
      // console.log('store loadDataFile:', e, 'Cannot load datafile', datafile)
      return
    }
    commit('loadDatabase', db)
    commit('loadWebStorageDatabase', db)
    localStorage.setItem('datafile', datafile)
  },

  activatePerson ({getters, commit}, id) {
    if ( id.startsWith('I') ) { // Individual
      commit('activatePerson', getters.memberById( id ))
    }
  },

}
