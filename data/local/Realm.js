import Realm from 'realm';
import ArticleSchema from './ArticleSchema';

const realm = new Realm({
  schema: [ArticleSchema],
  schemaVersion: 5,
  deleteRealmIfMigrationNeeded: true,
});

export default realm;
