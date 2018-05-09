import Loki from 'lokijs';

export default (callback) => {
	// setup
	const DB_NAME = 'db.json';
	const db = new Loki(`${DB_NAME}`, { persistenceMethod: 'fs' });

	callback(db);
}
