import Realm from 'realm';

class ArticleSchema extends Realm.Object {}
ArticleSchema.schema = {
  name: 'Article',
  properties: {
    guid: 'string',
    title: 'string',
    description: 'string',
    link: 'string',
    imageUrl: 'string?',
    pubDate: 'string',
    savedAt: 'date',
  },
  primaryKey: 'guid',
};

export default ArticleSchema;
