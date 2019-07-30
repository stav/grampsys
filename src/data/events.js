import { database as db } from '../../public/gramps.json';

let event_map = new Map();

for (let event of db.events.event) {
  event_map.set(event.handle, event)
}

export default event_map
