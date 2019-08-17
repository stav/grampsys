/*
 * Utility functions
 */
// http://www.ecma-international.org/ecma-262/5.1/#sec-8.6.2

/**
 * Check if some is of the given type
 */
function _is ( o, type ){
    return Boolean( Object.prototype.toString.call( o ) === type )
}

/**
 * Do we have an Object?
 */
function isObject ( o ){
    return _is( o, '[object Object]')
}

/**
 * Do we have a String?
 */
function isString ( o ){
    return _is( o, '[object String]')
}

/**
 * Do we have a Number?
 */
function isNumber ( o ) {
    return isNaN( o ) ? false : _is( o, '[object Number]')
}

/**
 * Do we have a Date?
 */
function isDate ( o ){
    return _is( o, '[object Date]')
}

/**
 * Do we have a valid Date?
 */
function isValidDate ( o ) {
    return isDate( o ) && !isNaN( o )
}

/**
 * Do we have an Array?
 */
function isArray ( o ){
    return _is( o, '[object Array]')
}

/**
 * Check if the given thing is empty
 */
function isEmpty ( o ) {
    if ( o === undefined || o === null ) return true;
    if ( isArray( o ) ) return Boolean( o.length === 0 );
    // return Boolean( Object.keys( o ).length === 0 )
    return Boolean( Object.getOwnPropertyNames( o ).length === 0 )
}

/**
 * Convert to Array
 */
function toArray ( o ){
    if ( o === undefined ) return [];

    // Wrap objects and strings in an Array
    if ( isObject( o ) || isString( o ) )
        return [ o ];

    try {
      // maybe an iterable
      return [].slice.call( o )
    } catch (e) {
      // just wrap the object
      return [o];
    }
}

/**
 * Extend the first object with all the properties from the second object
 */
function extend ( target, source ) {
    for ( const o of toArray( source ) ) {
        Object.assign( target, o )
    }
}

/**
 * Return the first element in an array
 */
function first ( array ) {
    if ( !isEmpty( array ))
        return array[0]
}

/**
 * Determine the type of object provided: Date, Array, String, etc.
 */
function type ( o ) {
    if ( o === undefined ) return 'Undefined';
    if ( o === null ) return 'Null';

    // First check if object has a class constructor
    if ( o.constructor ) {
        return o.constructor.name
    }
    // Otherwise call toString and parse out the type
    const
        type = Object.prototype.toString.call( o ),
        matches = new RegExp("\\[object (\\w+)\\]").exec(type);

    return matches && matches.length === 2 ? matches[1] : 'Unknown'
    // return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
}


export default {

    isArray,
    isDate,
    isEmpty,
    isNumber,
    isObject,
    isString,
    isValidDate,
    toArray,

    extend,
    first,
    type,

}
