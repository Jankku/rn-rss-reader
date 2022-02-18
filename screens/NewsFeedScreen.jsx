import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RegionContext } from '../App';
import Regions from '../data/Regions';
import NewsList from '../components/Feed/NewsList';
import FeedController from '../data/FeedController';

function NewsFeedScreen() {
  const region = useContext(RegionContext);
  const [regionId, setRegionId] = useState();
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    setRegionId(Regions[region]);
  }, [region]);

  useEffect(() => {
    (async () => {
      const res = await FeedController.getFeedById(regionId);
      setNewsItems(res.rss.channel.item);
    })();
  }, [regionId]);

  return (
    <View style={{ flex: 1 }}>
      <NewsList data={newsItems} />
    </View>
  );
}

export default NewsFeedScreen;
