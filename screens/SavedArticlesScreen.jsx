import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import SavedArticleController from '../data/local/SavedArticleController';
import NewsItem from '../components/NewsFeed/NewsItem';
import ItemDivider from '../components/NewsFeed/ItemDivider';

function SavedArticlesScreen({ navigation }) {
  const [articles, setArticles] = useState();

  useEffect(() => {
    const items = SavedArticleController.getArticles();

    try {
      items.addListener(() => setArticles([...items]));
    } catch (error) {
      console.error(error);
    }

    return () => items.removeAllListeners();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.guid}
        ItemSeparatorComponent={ItemDivider}
        renderItem={({ item }) => (
          <NewsItem
            title={item?.title}
            description={item?.description}
            imageUrl={item?.imageUrl}
            onPress={() => navigation.navigate('SavedArticleDetail', { guid: item.guid })}
          />
        )}
      />
    </View>
  );
}

export default SavedArticlesScreen;
