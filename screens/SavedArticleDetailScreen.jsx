import { useEffect, useState } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import ArticleSaveButton from '../components/NewsDetail/ArticleSaveButton';
import SavedArticleController from '../data/local/SavedArticleController';
import useToast from '../utils/useToast';

function SavedArticleDetailScreen({ navigation, route }) {
  const guid = route.params.guid;
  const [article, setArticle] = useState();
  const [isSaved, setIsSaved] = useState();
  const { showToast } = useToast();

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
          <ArticleSaveButton
            isSaved={isSaved}
            onPress={() => {
              if (article && isSaved) deleteArticleAction();
            }}
          />
        ),
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
