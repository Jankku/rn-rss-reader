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
    } catch (_) {
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

  const _keyExtractor = (item) => item.guid;

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={ItemDivider}
        renderItem={_renderItem}
        ListEmptyComponent={<ListEmptyComponent text={'Save some articles'} />}
        contentContainerStyle={articles.length === 0 && styles.listContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainerStyle: { alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
});

export default SavedArticlesScreen;
