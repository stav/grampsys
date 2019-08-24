/*
 * Web browser data storage functions
 */

function webStorageDatabaseFactory () {
  // log.datafile('store setupDatabase')
  try {
    return JSON.parse( localStorage.getItem('datafile') ).database;
  }
  catch (e) {}
}

export {
  webStorageDatabaseFactory,
}
