import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import WebView from 'react-native-webview';
import FeedController from '../data/FeedController';

function NewsDetailScreen({ navigation, route }) {
  const guid = route.params?.guid;
  const { colors } = useTheme();
  const [article, setArticle] = useState();
  const openWebView = article && article.encoded === undefined;

  useEffect(() => {
    const item = FeedController.findItemById(guid);
    navigation.setOptions({ title: item.title, headerTitleAlign: 'left' });
    setArticle(item);
  }, [guid]);

  const injectedJS = `
    if (window.location.href === 'about:blank') {
      document.body.style.backgroundColor = "${colors.background}";
      document.body.style.color = "${colors.text}";

      const images = document.querySelectorAll("img");
      images.forEach((i) => {
        i.width = ${Dimensions.get('window').width / 1.1};
        i.height = ${Dimensions.get('window').width / 1.777};
      });

      const figures = document.querySelectorAll("figure");
      figures.forEach((f) => {
        f.style.padding = 0;
        f.style.margin = 0;
      });

      const links = document.querySelectorAll("a");
      links.forEach((l) => {
        l.style.color = "${colors.text}";
      });
    }

    true;
    `;

  return (
    <View style={{ flex: 1 }}>
      {openWebView ? (
        <WebView
          source={{
            uri: article.link,
          }}
        />
      ) : article?.encoded ? ( // Render HTML
        <WebView
          injectedJavaScript={injectedJS}
          injectedJavaScriptForMainFrameOnly
          onMessage={() => {
            window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
          }}
          scalesPageToFit={false}
          source={{
            html: article.encoded,
          }}
        />
      ) : null}
    </View>
  );
}

export default NewsDetailScreen;
