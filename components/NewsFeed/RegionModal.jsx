import { useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { Modal, View, Text, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import Regions from '../../data/Regions';
import RegionModalItem from './RegionModalItem';
import useToast from '../../hooks/useToast';
import { RegionContext } from '../../context/RegionContext';
import { LocationContext } from '../../context/LocationContext';

function RegionModal({ listRef, isVisible, onClose }) {
  const { updateRegion } = useContext(RegionContext);
  const { updateShouldUseLocation } = useContext(LocationContext);
  const { showToast } = useToast();
  const { colors } = useTheme();
  const modalWidth = useWindowDimensions().width;
  const modalHeight = useWindowDimensions().height * 0.5;
  const styles = makeStyles(colors, modalWidth, modalHeight);
  const regions = [['Automatic', 'automatic']].concat(Object.entries(Regions));

  const _renderItem = ({ item }) => (
    <RegionModalItem
      name={item[0]}
      onPress={async () => {
        try {
          if (item[1] === 'automatic') {
            updateShouldUseLocation(true);
          } else {
            updateShouldUseLocation(false);
            updateRegion(item[0]);
          }
        } catch (error) {
          showToast(error);
        }

        onClose();
        listRef.current.scrollToOffset({ animated: true, offset: 0 });
      }}
    />
  );

  const _keyExtractor = (item) => item[1];

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Choose region</Text>
          <FlatList data={regions} renderItem={_renderItem} keyExtractor={_keyExtractor} />
        </View>
      </View>
    </Modal>
  );
}

const makeStyles = (colors, modalWidth, modalHeight) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      position: 'absolute',
      top: 55,
    },
    modalView: {
      backgroundColor: colors.background,
      color: colors.text,
      elevation: 5,
      height: modalHeight,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      width: modalWidth,
    },
    title: {
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      color: colors.text,
      fontSize: 20,
      fontWeight: '700',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
  });

export default RegionModal;
