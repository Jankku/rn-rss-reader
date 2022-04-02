import { View, Text, SectionList, StyleSheet } from 'react-native';
import { applicationName, nativeApplicationVersion } from 'expo-application';
import { openBrowserAsync } from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import SettingsSectionItem from './SettingsSectionItem';
import SettingsSectionHeader from './SettingsSectionHeader';
import ItemDivider from '../NewsFeed/ItemDivider';

const aboutSectionData = [
  {
    title: 'About',
    data: [
      {
        title: `${applicationName ?? '-'}`,
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

function AboutSection() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const openLink = (item) => {
    if (item.link) openBrowserAsync(item.link);
  };

  const _renderItem = ({ item }) => (
    <SettingsSectionItem onPress={() => openLink(item)}>
      <View style={styles.container}>
        <Ionicons name={item.icon} size={24} color={colors.text} style={styles.icon} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      </View>
    </SettingsSectionItem>
  );

  const _renderSectionHeader = ({ section: { title } }) => <SettingsSectionHeader title={title} />;

  const _keyExtractor = (item, index) => item + index;

  return (
    <SectionList
      sections={aboutSectionData}
      renderSectionHeader={_renderSectionHeader}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      ItemSeparatorComponent={ItemDivider}
    />
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      paddingEnd: 16,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '700',
    },
    value: {
      color: colors.text,
    },
  });

export default AboutSection;
