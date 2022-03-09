import { useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { Modal, View, Text, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import Regions from '../../data/Regions';
import RegionModalItem from './RegionModalItem';
import useToast from '../../hooks/useToast';
import { RegionContext } from '../../App';

function RegionModal({ listRef, isVisible, onClose }) {
  const { updateRegion } = useContext(RegionContext);
  const { colors } = useTheme();
  const { showToast } = useToast();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height * 0.5;
  const regions = Object.entries(Regions);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      position: 'absolute',
      top: 55,
    },
    modalView: {
      width: width,
      height: height,
      backgroundColor: colors.background,
      color: colors.text,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '700',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  });

  const _renderItem = ({ item }) => (
    <RegionModalItem
      name={item[0]}
      onPress={async () => {
        try {
          await updateRegion(item[0]);
        } catch (error) {
          showToast(error);
        }
        onClose();
        listRef.current.scrollToOffset({ animated: true, offset: 0 });
      }}
    />
  );

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Choose region</Text>
          <FlatList data={regions} renderItem={_renderItem} keyExtractor={(item) => item[1]} />
        </View>
      </View>
    </Modal>
  );
}

export default RegionModal;
