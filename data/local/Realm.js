import Realm from 'realm';
import ArticleSchema from './ArticleSchema';

const realm = new Realm({ schema: [ArticleSchema], schemaVersion: 1 });

export default realm;
