import React from 'react';
import {TouchableOpacity, Image, View, Text, StyleSheet} from 'react-native';
import {Gender, ICharacter, Status} from '../../../../api';

interface IProps {
  onPress(): void;
  item: ICharacter;
}

export const CharacterCard: React.FC<IProps> = ({onPress, item}) => (
  <TouchableOpacity onPress={onPress} style={styles.touchContainer}>
    <Image style={styles.image} source={{uri: item.image}} />
    <View style={styles.textContainer}>
      <Text numberOfLines={1} ellipsizeMode="tail">
        Имя: {item.name}
      </Text>
      <Text>Пол: {item.gender === Gender.UNKNOWN ? '–' : item.gender}</Text>
      <Text>Статус: {item.status === Status.UNKNOWN ? '–' : item.status}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  touchContainer: {
    padding: 16,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginRight: 64,
    flexDirection: 'column',
    flexGrow: 1,
  },
});
