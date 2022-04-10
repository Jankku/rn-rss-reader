import { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Share, StyleSheet, useWindowDimensions } from 'react-native';
import WebView from 'react-native-webview';
import FeedController from '../data/FeedController';
import SavedArticleController from '../data/local/SavedArticleController';
import useToast from '../hooks/useToast';
import AppbarButton from '../components/NewsDetail/AppbarButton';
import { openBrowserAsync } from 'expo-web-browser';
import * as Progress from 'react-native-progress';
import useDebounce from '../hooks/useDebounce';

function NewsDetailScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { showToast } = useToast();
  const [article, setArticle] = useState();
  const [isSaved, setIsSaved] = useState();
  const [scrollValue, setScrollValue] = useState({
    contentHeight: 1,
    currentScrollY: 0,
    layoutHeight: 0,
  });
  const debouncedScrollValue = useDebounce(scrollValue, 10);
  const [articleProgress, setArticleProgress] = useState(0);
  const styles = makeStyles(colors);
  const guid = route.params?.guid;
  const openWebView = article && article.encoded === undefined;
  const windowWidth = useWindowDimensions().width;
  const bodyFontSize = '2.25rem';
  const figureFontSize = '2.0rem';

  useEffect(() => {
    const articleProgress = Math.abs(
      debouncedScrollValue.currentScrollY /
        (debouncedScrollValue.layoutHeight - debouncedScrollValue.contentHeight)
    );
    setArticleProgress(articleProgress);
  }, [debouncedScrollValue]);

  useEffect(() => {
    const item = FeedController.findItemById(guid);
    const saved = SavedArticleController.isArticleSaved(guid);

    setArticle(item);
    setIsSaved(saved);
  }, [guid]);

  useEffect(() => {
    if (article) {
      navigation.setOptions({
        headerRight: () => (
          <>
            <AppbarButton
              icon={'share-social-outline'}
              style={styles.appbarButton}
              onPress={() => shareArticleAction()}
            />
            <AppbarButton
              icon={'globe-outline'}
              style={styles.appbarButton}
              onPress={() => openInWebAction()}
            />
            <AppbarButton
              icon={isSaved ? 'heart' : 'heart-outline'}
              onPress={() => {
                if (isSaved) {
                  deleteArticleAction();
                } else {
                  saveArticleAction();
                }
              }}
            />
          </>
        ),
      });
    }
  }, [
    article,
    colors.headerText,
    deleteArticleAction,
    isSaved,
    navigation,
    openInWebAction,
    saveArticleAction,
    shareArticleAction,
    styles,
  ]);

  const saveArticleAction = useCallback(() => {
    try {
      const dbArticle = SavedArticleController.articleToDbArticle(article);
      SavedArticleController.saveArticle(dbArticle);
      setIsSaved(true);
      showToast('Article saved');
    } catch (_) {
      showToast("Error: Couldn't save article");
    }
  }, [article, showToast]);

  const deleteArticleAction = useCallback(() => {
    try {
      const dbArticle = SavedArticleController.getArticleById(guid);
      SavedArticleController.deleteArticle(dbArticle);
      setIsSaved(false);
      showToast('Article deleted');
    } catch (_) {
      showToast("Error: Couldn't delete article");
    }
  }, [guid, showToast]);

  const shareArticleAction = useCallback(async () => {
    try {
      if (article) await Share.share({ message: `${article.link}` });
    } catch (_) {
      showToast('Error while sharing article');
    }
  }, [article, showToast]);

  const openInWebAction = useCallback(async () => {
    try {
      if (article) await openBrowserAsync(article.link);
    } catch (_) {
      showToast('Error while opening article');
    }
  }, [article, showToast]);

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
    <View style={styles.container}>
      {openWebView ? (
        <WebView
          source={{
            uri: article.link,
          }}
        />
      ) : article?.encoded ? (
        <>
          <Progress.Bar
            progress={articleProgress}
            width={windowWidth}
            height={3}
            unfilledColor={colors.card}
            color={colors.progressBar}
            borderWidth={0}
            borderRadius={0}
            useNativeDriver={true}
          />
          <WebView
            injectedJavaScriptForMainFrameOnly
            scalesPageToFit
            injectedJavaScript={injectedJS}
            originWhitelist={['*']}
            onLayout={({ nativeEvent }) =>
              setScrollValue({ ...scrollValue, layoutHeight: nativeEvent.layout.height })
            }
            onScroll={({ nativeEvent }) =>
              setScrollValue({
                ...scrollValue,
                contentHeight: nativeEvent.contentSize.height,
                currentScrollY: nativeEvent.contentOffset.y,
              })
            }
            source={{
              html: article.encoded,
            }}
            style={styles.webView}
          />
        </>
      ) : null}
    </View>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    appbarButton: { marginRight: 24 },
    container: { flex: 1 },
    webView: {
      backgroundColor: colors.card,
    },
  });

export default NewsDetailScreen;
