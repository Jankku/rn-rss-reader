import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import FeedController from '../../data/FeedController';
import { RegionIdContext } from '../../pages/Feed';
import ItemDivider from './ItemDivider';
import NewsItem from './NewsItem';

function NewsList() {
  const navigation = useNavigation();
  const regionId = useContext(RegionIdContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await FeedController.getFeedById(regionId);
      setItems(res.rss.channel.item);
    })();
  }, []);

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <NewsItem
          title={item?.title}
          description={item?.description}
          imageUrl={item?.enclosure?.url}
          onPress={() => navigation.navigate('Details', { guid: item.guid['#text'] })}
        />
      )}
      keyExtractor={(item) => item.guid['#text']}
      ItemSeparatorComponent={ItemDivider}
    />
  );
}

export default NewsList;
