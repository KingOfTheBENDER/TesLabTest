import React, {useState} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {ICharacter, getCharacterList} from '../../api';
import {FlashList} from '@shopify/flash-list';
import {Spinner, ListEmptyComponent} from '../../components';
import {CharacterCard, ModalInfo} from './components';
import {useInfiniteQuery} from '@tanstack/react-query';
import {ELEMENTS_PER_PAGE} from '../../utils';

const ItemSeparatorComponent = () => <View style={styles.separator} />;

export const ListScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [chooseItem, setChooseItem] = useState<ICharacter | null>(null);

  const fetchCharacter = async (pageParam: number) => {
    const response = await getCharacterList({page: pageParam});

    return {
      data: response.data.results ?? [],
      nextPage: pageParam + 1,
    };
  };

  const {data, refetch, hasNextPage, fetchNextPage, isLoading} =
    useInfiniteQuery({
      queryKey: ['LIST_CHARACTER'],
      queryFn: ({pageParam}) => fetchCharacter(pageParam as number),
      initialPageParam: 1,
      refetchInterval: 30000,
      getNextPageParam: lastPage => {
        if (lastPage && lastPage?.data.length < ELEMENTS_PER_PAGE) {
          return undefined;
        }

        return lastPage?.nextPage;
      },
    });

  const flattenData = data?.pages
    ? data?.pages.flatMap((page: {data: ICharacter[]}) =>
        page ? page.data : [],
      )
    : [];

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = async () => {
    refetch();
  };

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
          data={flattenData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={<ListEmptyComponent />}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          estimatedItemSize={84}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
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
