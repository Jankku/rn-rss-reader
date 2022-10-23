import { useTheme } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

function useToast() {
  const { colors } = useTheme();

  const defaultToastOptions = {
    position: 120,
    opacity: 1,
    shadow: false,
    backgroundColor: colors.text,
    textColor: colors.background,
  };

  const showToast = (message, options = defaultToastOptions) => Toast.show(message, options);

  return { showToast, defaultToastOptions };
}

export default useToast;
