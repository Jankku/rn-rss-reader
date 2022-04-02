import { useTheme } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import { View, Share, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import ArticleSaveButton from '../components/NewsDetail/ArticleSaveButton';
import ArticleShareButton from '../components/NewsDetail/ArticleShareButton';
import SavedArticleController from '../data/local/SavedArticleController';
import useToast from '../hooks/useToast';

function SavedArticleDetailScreen({ navigation, route }) {
  const { showToast } = useToast();
  const { colors } = useTheme();
  const [article, setArticle] = useState();
  const [isSaved, setIsSaved] = useState();
  const guid = route.params.guid;

  useEffect(() => {
    const item = SavedArticleController.getArticleById(guid);
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
          <>
            <ArticleShareButton
              style={styles.shareButton}
              color={colors.headerText}
              onPress={() => shareArticleAction()}
            />
            <ArticleSaveButton
              isSaved={isSaved}
              color={colors.headerText}
              onPress={() => {
                if (isSaved) deleteArticleAction();
              }}
            />
          </>
        ),
      });
    }
  }, [article, colors.headerText, deleteArticleAction, isSaved, navigation, shareArticleAction]);

  const deleteArticleAction = useCallback(() => {
    try {
      SavedArticleController.deleteArticle(article);
      setIsSaved(false);
      showToast('Article deleted');
      navigation.goBack();
    } catch (error) {
      showToast("Error: Couldn't delete article");
    }
  }, [article, navigation, showToast]);

  const shareArticleAction = useCallback(async () => {
    try {
      if (article) await Share.share({ message: `${article.link}` });
    } catch (_) {
      showToast('Error while sharing article');
    }
  }, [article, showToast]);

  return (
    <View style={styles.container}>
      {article ? (
        <WebView
          source={{
            uri: article.link,
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  shareButton: { marginRight: 24 },
});

export default SavedArticleDetailScreen;
