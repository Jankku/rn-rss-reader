import realm from './Realm';

const SavedArticleController = {
  getArticles() {
    return realm.objects('Article');
  },

  getArticleById(guid) {
    return realm.objectForPrimaryKey('Article', guid);
  },

  isArticleSaved(guid) {
    return this.getArticleById(guid) ? true : false;
  },

  saveArticle(article) {
    realm.write(() => realm.create('Article', article));
  },

  deleteArticle(article) {
    realm.write(() => realm.delete(article));
  },

  articleToDbArticle(item) {
    return {
      guid: item.guid['#text'],
      title: item.title,
      description: item.description,
      link: item.link,
      imageUrl: item?.enclosure?.url,
      pubDate: item.pubDate,
      savedAt: new Date(),
    };
  },
};

export default SavedArticleController;
