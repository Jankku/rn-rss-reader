import { useEffect, useState } from 'react';
import NewsList from '../components/Feed/NewsList';

function SavedArticlesScreen() {
  const [newsItems, setNewsItems] = useState([]);

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

export default SavedArticlesScreen;
