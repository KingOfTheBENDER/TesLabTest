import React from 'react';
import {
  Modal,
  Pressable,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import {Gender, ICharacter, Status} from '../../../../api';

interface IProps {
  onClose(): void;
  item: ICharacter | null;
  isVisible: boolean;
}

export const ModalInfo: React.FC<IProps> = ({onClose, item, isVisible}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}>
      <Pressable onPress={onClose} style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.image} source={{uri: item?.image}} />
          <View style={styles.wrapper}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              Имя: {item?.name}
            </Text>
            <Text>
              Пол: {item?.gender === Gender.UNKNOWN ? '–' : item?.gender}
            </Text>
            <Text>
              Статус: {item?.status === Status.UNKNOWN ? '–' : item?.status}
            </Text>
            {item?.type !== '' ? <Text>Тип: {item?.type}</Text> : null}
            {item?.origin && item?.origin.name !== 'unknown' ? (
              <>
                <Text>Происхождение:</Text>
                <Text>{item?.origin.name}</Text>
              </>
            ) : null}
            {item?.location && item?.location.name !== 'unknown' ? (
              <>
                <Text>Последний раз видели:</Text>
                <Text>{item?.location.name}</Text>
              </>
            ) : null}
          </View>
          <Button onPress={onClose} title="Закрыть" />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    margin: 16,
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  wrapper: {
    marginVertical: 16,
    alignItems: 'flex-start',
  },
});
