import { useTheme } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import { View, Share, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import AppbarButton from '../components/NewsDetail/AppbarButton';
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
        headerRight: () => (
          <>
            <AppbarButton
              icon={'share-social-outline'}
              style={styles.appbarButton}
              onPress={() => shareArticleAction()}
            />
            <AppbarButton
              icon={isSaved ? 'heart' : 'heart-outline'}
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
  appbarButton: { marginRight: 24 },
  container: { flex: 1 },
});

export default SavedArticleDetailScreen;
