import Realm from 'realm';

class ArticleSchema extends Realm.Object {}
ArticleSchema.schema = {
  name: 'Article',
  properties: {
    title: 'string',
    description: 'string',
    url: 'string',
    imageUrl: 'string',
    savedAt: 'date',
  },
};

export default ArticleSchema;
