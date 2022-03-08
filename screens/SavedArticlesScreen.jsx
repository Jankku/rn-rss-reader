import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import SavedArticleController from '../data/local/SavedArticleController';
import NewsItem from '../components/NewsFeed/NewsItem';
import ItemDivider from '../components/NewsFeed/ItemDivider';
import useToast from '../utils/useToast';

function SavedArticlesScreen({ navigation }) {
  const [articles, setArticles] = useState();
  const { showToast } = useToast();

  useEffect(() => {
    const items = SavedArticleController.getArticles();

    try {
      items.addListener(() => setArticles([...items]));
    } catch (ignored) {
      showToast('Error loading saved articles');
    }

    return () => items.removeAllListeners();
  }, []);

  const _renderItem = ({ item }) => (
    <NewsItem
      title={item?.title}
      description={item?.description}
      imageUrl={item?.imageUrl}
      onPress={() => navigation.navigate('SavedArticleDetail', { guid: item.guid })}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.guid}
        ItemSeparatorComponent={ItemDivider}
        renderItem={_renderItem}
      />
    </View>
  );
}

export default SavedArticlesScreen;
