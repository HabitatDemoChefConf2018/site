import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

const COLLECTION_NAME = 'orders';

const loadCollection = function (colName, db) {
  return new Promise(resolve => {
    db.loadDatabase({}, () => {
      const _collection = db.getCollection(colName) || db.addCollection(colName);
      resolve(_collection);
    })
  });
}

const formatLokiObject = ({ meta, $loki, ...rest }) => ({ id: $loki, ...rest });

export default ({ config, db }) => {
	let api = Router();

	api.post('/orders', async (req, res) => {
		const col = await loadCollection(COLLECTION_NAME, db);
		const data = col.insert(req.body);
		db.saveDatabase();
		res.json(formatLokiObject(data));
	});

	api.get('/orders', async (req, res) => {
		const col = await loadCollection(COLLECTION_NAME, db);
		console.log(col);
		res.json(col.data.map(formatLokiObject));
	});

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version, name: config.name });
	});

	return api;
}
