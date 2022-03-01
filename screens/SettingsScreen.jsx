import { SectionList } from 'react-native';
import SettingsSectionItem from '../components/Settings/SettingsSectionItem';
import SettingsSectionHeader from '../components/Settings/SettingsSectionHeader';
import ItemDivider from '../components/NewsFeed/ItemDivider';
import { nativeApplicationVersion } from 'expo-application';

function SettingsScreen() {
  const settingsData = [
    {
      title: 'About',
      data: [
        {
          title: 'RSS Reader',
          value: `${nativeApplicationVersion ?? '-'}`,
          icon: 'logo-android',
        },
        {
          title: 'Developer',
          value: 'Jankku',
          link: 'https://github.com/Jankku/',
          icon: 'person',
        },
        {
          title: 'GitHub',
          value: 'https://github.com/Jankku/rn-rss-reader',
          link: 'https://github.com/Jankku/rn-rss-reader',
          icon: 'logo-github',
        },
      ],
    },
  ];

  return (
    <SectionList
      sections={settingsData}
      renderSectionHeader={({ section: { title } }) => <SettingsSectionHeader title={title} />}
      renderItem={({ item }) => (
        <SettingsSectionItem title={item.title} value={item.value} link={item.link} icon={item.icon} />
      )}
      keyExtractor={(item, index) => item + index}
      ItemSeparatorComponent={ItemDivider}
    />
  );
}

export default SettingsScreen;
