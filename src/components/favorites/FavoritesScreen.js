import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from '../coins/CoinsItem';
import colors from '../../resources/colors';
import Storage from '../../libs/storage';

const FavoritesScreen = ({navigation}) => {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		navigation.addListener('focus', () => {
			getFavorite()
		})
	}, [navigation]);

	const getFavorite = async () => {
		try {
			const allKeys = await Storage.instance.getAllKeys();

			const keys = allKeys.filter((key) => key.includes('favorite'));

			const favs = await Storage.instance.multiGet(keys);

			const favorit = favs.map((fav) => JSON.parse(fav[1]));
			setFavorites(favorit);
			console.log(favorit);
		} catch (err) {
			console.log('getFavorite err ', err);
		}
	};
	
	const handlePress = (coin) => {
		navigation.navigate('CoinDetail', { coin })
	}

	return (
		<View style={styles.container}>
			{favorites.length === 0 ? (
				<FavoritesEmptyState />
			) : (
				<FlatList
					data={favorites}
					renderItem={({item}) => (
						<CoinsItem item={item} onPress={() => handlePress(item)} />
					)}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.charade,
		flex: 1,
	},
});

export default FavoritesScreen;
