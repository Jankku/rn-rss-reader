import realm from './Realm';

const getArticles = () => {
  return realm.objects('Article');
};

const saveArticle = (article) => {
  realm.write(() => {
    const newArticle = realm.create('Article', article);
    console.log(newArticle);
  });
};

const newsItemToDbArticle = (item) => {
  return {
    title: item.title,
    description: item.description,
    url: item.link,
    imageUrl: item?.enclosure?.url,
    savedAt: new Date(),
  };
};

export { getArticles, saveArticle, newsItemToDbArticle };
