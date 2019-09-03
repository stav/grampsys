/*
 * Date and time functions
 */

/**
 * Return the number of years between the two dates given
 */
function yearsDifference ( fromDateString, toDateString )
{
  const fromDate = fromDateString ? new Date( fromDateString ) : new Date();
  const toDate   = toDateString   ? new Date( toDateString )   : new Date();

  let yearsDifference = toDate.getFullYear() - fromDate.getFullYear();

  if (
     toDate.getMonth() < fromDate.getMonth() ||
    (toDate.getMonth() === fromDate.getMonth() && toDate.getDate() < fromDate.getDate())
  ) {
    yearsDifference--;
  }

  return yearsDifference
}


export default {

    yearsDifference,

}
