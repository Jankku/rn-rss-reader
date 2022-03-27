import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import SavedArticleController from '../data/local/SavedArticleController';
import ItemDivider from '../components/NewsFeed/ItemDivider';
import useToast from '../hooks/useToast';
import ListEmptyComponent from '../components/NewsFeed/ListEmptyComponent';
import SavedNewsItem from '../components/SavedArticles/SavedNewsItem';

function SavedArticlesScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
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
    <SavedNewsItem
      title={item?.title}
      description={item?.description}
      imageUrl={item?.imageUrl}
      pubDate={item.pubDate}
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
        ListEmptyComponent={<ListEmptyComponent text={'Save some articles'} />}
        contentContainerStyle={articles.length === 0 && styles.listContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainerStyle: { alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
});

export default SavedArticlesScreen;
