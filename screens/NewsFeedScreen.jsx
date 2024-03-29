import { useContext, useEffect, useState, useRef } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Regions from '../data/Regions';
import FeedController from '../data/FeedController';
import NewsItem from '../components/NewsFeed/NewsItem';
import ItemDivider from '../components/NewsFeed/ItemDivider';
import RegionMenuButton from '../components/NewsFeed/RegionMenuButton';
import RegionModal from '../components/NewsFeed/RegionModal';
import { RegionContext } from '../context/RegionContext';
import { useTheme } from '@react-navigation/native';
import ListEmptyComponent from '../components/NewsFeed/ListEmptyComponent';

function NewsFeedScreen({ navigation }) {
  const { region } = useContext(RegionContext);
  const { colors } = useTheme();
  const [newsItems, setNewsItems] = useState([]);
  const [regionModalVisible, setRegionModalVisible] = useState(false);
  const listRef = useRef();

  useEffect(() => {
    (async () => {
      if (region) {
        const feed = await FeedController.getFeedById(Regions[region]);
        setNewsItems(feed.rss.channel.item);
      }
    })();
  }, [region]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RegionMenuButton color={colors.headerText} onPress={() => setRegionModalVisible(true)} />
      ),
    });
  }, [colors.headerText, navigation]);

  const _renderItem = ({ item }) => (
    <NewsItem
      title={item?.title}
      description={item?.description}
      imageUrl={item?.enclosure?.url}
      pubDate={item.pubDate}
      onPress={() => navigation.navigate('NewsDetail', { guid: item.link })}
    />
  );

  const _keyExtractor = (item) => item.link;

  const onRegionModalClose = () => setRegionModalVisible(false);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={newsItems}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={ItemDivider}
        renderItem={_renderItem}
        ListEmptyComponent={<ListEmptyComponent text={"Couldn't find news"} />}
      />

      <RegionModal listRef={listRef} isVisible={regionModalVisible} onClose={onRegionModalClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default NewsFeedScreen;
