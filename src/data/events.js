/*
 * Events map withhandle as the key
 *
 * Example list:
 *
 *   _dafb69389cc268ca202225bfa10 → { handle: "_dafb69389cc268ca202225bfa10", change: "1504833356", id: "E0000", … }
​​​ *   _dafb696950427b6635e0aacc420 → { handle: "_dafb696950427b6635e0aacc420", change: "1504833375", id: "E0001", … }
​​​ *   _dafb90107f5414a56ca26a1accd → { handle: "_dafb90107f5414a56ca26a1accd", change: "1504837429", id: "E0002", … }
​​​ *   _dafb9049f741c454ad0263d3851 → { handle: "_dafb9049f741c454ad0263d3851", change: "1538777118", id: "E0003", … }
 *
 * Example entry:
 *
 *   <key>:
 *   	"_dafb69389cc268ca202225bfa10"
​​​​ *
 *   <value>:
 *   	​​​​​id: "E0000"
 *   	​​​​​type: "Birth"
 *   	​​​​​place: { hlink: "_dafb692976a7108efb419dd963" }
 *   	​​​​​handle: "_dafb69389cc268ca202225bfa10"
 *   	​​​​​change: "1504833356"
 *   	​​​​​dateval: { val: "1965-12-26" }
 */
import { database as db } from '../../public/gramps.json';

let event_map = new Map();

for (let event of db.events.event) {
  event_map.set(event.handle, event)
}

export default event_map
