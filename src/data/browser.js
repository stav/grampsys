/*
 * Web browser data storage functions
 */

function webStorageDatabaseFactory () {
  try {
    return JSON.parse( localStorage.getItem('datafile') ).database;
  }
  catch (e) {}
}

export {
  webStorageDatabaseFactory,
}
