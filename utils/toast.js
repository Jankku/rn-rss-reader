import Toast from 'react-native-root-toast';

const showToast = (message) =>
  Toast.show(message, {
    position: 100,
    opacity: 0.9,
    shadow: false,
  });

export default showToast;
