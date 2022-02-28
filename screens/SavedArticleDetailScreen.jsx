import { useEffect, useState } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import ArticleSaveButton from '../components/NewsDetail/ArticleSaveButton';
import SavedArticleController from '../data/local/SavedArticleController';
import showToast from '../utils/toast';

function SavedArticleDetailScreen({ navigation, route }) {
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
        headerRight: () => {
          return (
            <ArticleSaveButton
              icon={isSaved ? 'star' : 'star-outline'}
              onPress={() => {
                if (!article) return;
                if (isSaved) deleteArticleAction();
              }}
            />
          );
        },
      });
    }
  }, [article, isSaved]);

  const deleteArticleAction = () => {
    try {
      SavedArticleController.deleteArticle(article);
      setIsSaved(false);
      showToast('Article deleted');
      navigation.goBack();
    } catch (error) {
      showToast("Error: Couldn't delete article");
    }
  };

  return (
    <View style={{ flex: 1 }}>
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

export default SavedArticleDetailScreen;
