import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ICharacter, getCharacterList} from '../../api';
import {FlashList} from '@shopify/flash-list';
import {Spinner, ListEmptyComponent} from '../../components';
import {CharacterCard, ModalInfo} from './components';

const ItemSeparatorComponent = () => <View style={styles.separator} />;

export const ListScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [res, setRes] = useState<ICharacter[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [chooseItem, setChooseItem] = useState<ICharacter | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const {data} = await getCharacterList({page: 1});
      console.log(data.results);
      setRes(data.results);
      setIsLoading(false);
    };
    fetch();
  }, []);

  const handleCloseModal = () => {
    setIsVisible(!isVisible);
    setChooseItem(null);
  };

  const renderItem = ({item}: {item: ICharacter}) => (
    <CharacterCard
      onPress={() => {
        setChooseItem(item);
        setIsVisible(true);
      }}
      item={item}
    />
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlashList
          contentContainerStyle={styles.container}
          data={res}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={<ListEmptyComponent />}
          refreshing
          estimatedItemSize={84}
        />
      )}
      <ModalInfo
        item={chooseItem}
        isVisible={isVisible}
        onClose={handleCloseModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#d8dbe1',
  },
});
