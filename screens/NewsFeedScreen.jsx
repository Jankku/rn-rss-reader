import { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { RegionContext } from '../App';
import Regions from '../data/Regions';
import FeedController from '../data/FeedController';
import NewsItem from '../components/NewsFeed/NewsItem';
import ItemDivider from '../components/NewsFeed/ItemDivider';

function NewsFeedScreen({ navigation }) {
  const region = useContext(RegionContext);
  const [regionId, setRegionId] = useState();
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    setRegionId(Regions[region]);
  }, [region]);

  useEffect(() => {
    (async () => {
      const feed = await FeedController.getFeedById(regionId);
      setNewsItems(feed.rss.channel.item);
    })();
  }, [regionId]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={newsItems}
        keyExtractor={(item) => item.guid['#text']}
        ItemSeparatorComponent={ItemDivider}
        renderItem={({ item }) => (
          <NewsItem
            title={item?.title}
            description={item?.description}
            imageUrl={item?.enclosure?.url}
            onPress={() => navigation.navigate('NewsDetail', { guid: item.guid['#text'] })}
          />
        )}
      />
    </View>
  );
}

export default NewsFeedScreen;
