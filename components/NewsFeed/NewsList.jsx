import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import NewsItem from './NewsItem';
import ItemDivider from './ItemDivider';

function NewsList({ data }) {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <NewsItem
          title={item?.title}
          description={item?.description}
          imageUrl={item?.enclosure?.url}
          onPress={() => navigation.navigate('NewsDetail', { guid: item.guid['#text'] })}
        />
      )}
      keyExtractor={(item) => item.guid['#text']}
      ItemSeparatorComponent={ItemDivider}
    />
  );
}

export default NewsList;
