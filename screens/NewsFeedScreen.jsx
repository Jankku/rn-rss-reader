import { useContext, useEffect, useState, useRef } from 'react';
import { FlatList, View } from 'react-native';
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
      const feed = await FeedController.getFeedById(Regions[region]);
      setNewsItems(feed.rss.channel.item);
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
      onPress={() => navigation.navigate('NewsDetail', { guid: item.guid['#text'] })}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={listRef}
        data={newsItems}
        keyExtractor={(item) => item.guid['#text']}
        ItemSeparatorComponent={ItemDivider}
        renderItem={_renderItem}
        ListEmptyComponent={<ListEmptyComponent text={"Couldn't find news"} />}
      />

      <RegionModal
        listRef={listRef}
        isVisible={regionModalVisible}
        onClose={() => setRegionModalVisible(false)}
      />
    </View>
  );
}

export default NewsFeedScreen;
