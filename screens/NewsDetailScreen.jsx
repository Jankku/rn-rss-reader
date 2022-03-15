import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import ArticleSaveButton from '../components/NewsDetail/ArticleSaveButton';
import FeedController from '../data/FeedController';
import SavedArticleController from '../data/local/SavedArticleController';
import useToast from '../hooks/useToast';

function NewsDetailScreen({ navigation, route }) {
  const guid = route.params?.guid;
  const { colors } = useTheme();
  const { showToast } = useToast();
  const [article, setArticle] = useState();
  const [isSaved, setIsSaved] = useState();
  const openWebView = article && article.encoded === undefined;
  const bodyFontSize = '2.25rem';
  const figureFontSize = '2.0rem';

  useEffect(() => {
    const item = FeedController.findItemById(guid);
    setArticle(item);

    const saved = SavedArticleController.isArticleSaved(guid);
    setIsSaved(saved);
  }, [guid]);

  useEffect(() => {
    if (article) {
      navigation.setOptions({
        title: article.title,
        headerTitleAlign: 'left',
        headerRight: () => (
          <ArticleSaveButton
            color={colors.headerText}
            isSaved={isSaved}
            onPress={() => {
              if (article && isSaved) {
                deleteArticleAction();
              } else {
                saveArticleAction();
              }
            }}
          />
        ),
      });
    }
  }, [article, isSaved]);

  const saveArticleAction = () => {
    try {
      const dbArticle = SavedArticleController.articleToDbArticle(article);
      SavedArticleController.saveArticle(dbArticle);
      setIsSaved(true);
      showToast('Article saved');
    } catch (error) {
      showToast("Error: Couldn't save article");
      console.error(error);
    }
  };

  const deleteArticleAction = () => {
    try {
      const dbArticle = SavedArticleController.getArticleById(guid);
      SavedArticleController.deleteArticle(dbArticle);
      setIsSaved(false);
      showToast('Article deleted');
    } catch (error) {
      showToast("Error: Couldn't delete article");
      console.error(error);
    }
  };

  const injectedJS = `
    if (window.location.href === 'about:blank') {
      document.body.style.color = "${colors.text}";
      document.body.style.fontSize = "${bodyFontSize}";
      document.body.style.padding = "8px";

      const figures = document.querySelectorAll("figure");
      figures.forEach((f) => {
        f.style.margin = 0;
        f.style.fontSize = "${figureFontSize}";
        f.style.fontStyle = "italic";
      });

      const images = document.querySelectorAll("img");
      images.forEach((i) => {
        i.style.marginRight = "16px";
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
      ) : article?.encoded ? (
        <WebView
          injectedJavaScriptForMainFrameOnly
          scalesPageToFit
          injectedJavaScript={injectedJS}
          originWhitelist={['*']}
          source={{
            html: article.encoded,
          }}
          style={{
            backgroundColor: colors.card,
          }}
        />
      ) : null}
    </View>
  );
}

export default NewsDetailScreen;
