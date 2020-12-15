import { database as publicDatabase } from '../../public/gramps.json';
import { webStorageDatabaseFactory } from '@/data/browser';

export default {

  loadDatabase ( state, database ) {
    // console.log('store loadDatabase: database', database)
    state.db = database;
    // this.dispatch('queueInfo', 'db updated');
  },

  clearDatabase ( state ) {
    state.db = null;
  },

  loadPublicDatabase ( state ) {
    // console.log('store loadPublicDatabase: publicDatabase', publicDatabase)
    // const database = { header: 3, events: 100, people: 32, families: 80, danuek: 'winter' };
    state.db = publicDatabase;
  },

  loadWebStorageDatabase ( state , db) {
    // console.log('store loadWebStorageDatabase: db', db)
    state.webStorageDatabase = db;
  },

  webStorageLoad ( state ) {
    const webStorageDb = webStorageDatabaseFactory();
    // console.log('store webStorageLoad: webStorageDb', webStorageDb)
    if ( webStorageDb )
      state.db = webStorageDb;
  },

  webStorageClear ( state ) {
    state.webStorageDatabase = null;
    localStorage.removeItem('datafile')
  },

}
