import React, {useState, useEffect} from 'react';
import {
	View,
	StyleSheet,
	SectionList,
	FlatList,
	Text,
	Alert,
	Image,
	Pressable,
} from 'react-native';

import colors from '../../resources/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';

const CoinDetailScreen = (props) => {
	const [coin, setCoin] = useState({});
	const [markets, setMarkets] = useState([]);
	const [isFavorite, setFavorite] = useState(false);

	props.navigation.setOptions({title: coin.symbol});
	useEffect(() => {
		const itemCoin = props.route.params;
		setCoin(itemCoin.coin);

		getMarkets(itemCoin.coin.id);
	}, [props]);

	useEffect(() => {
		const {coin} = props.route.params;
		getFavorite(coin);
	}, []);
	
	const getSections = (coin) => {
		const section = [
			{
				title: 'Market cap',
				data: [coin.market_cap_usd],
			},
			{
				title: 'Volumen 24h',
				data: [coin.volume24],
			},
			{
				title: 'Change',
				data: [coin.percent_change_24h],
			},
		];
		return section;
	};

	const getMarkets = async (coinId) => {
		const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
		const marketsList = await Http.instance.get(url);
		setMarkets(marketsList);
	};

	const getSymbolIcon = (name) => {
		if (name) {
			const symbol = name.toLowerCase().replace(' ', '-');
			return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
		}
	};

	const toogleFavorite = () => {
		if (isFavorite) {
			removeFavorite();
		} else {
			addFavorite();
		}
	};

	const addFavorite = async () => {
		const coinObject = JSON.stringify(coin);
		const key = `favorite${coin.id}`;
		const stored = await Storage.instance.store(key, coinObject);
		if (stored) {
			setFavorite(true);
		}
	};

	const getFavorite = async (coin) => {
		try {
			const key = `favorite${coin.id}`;
			await Storage.instance.get(key).then((value) => {
				if (value) {
					setFavorite(true);
				}
			});
		} catch (err) {
			console.log('getFavorite err ', err);
		}
	};

	const removeFavorite = async () => {
		Alert.alert('Remove Favorite', 'Are you sure?', [
			{text: 'cancel', onPress: () => {}, style: 'cancel'},
			{
				text: 'Remove',
				onPress: async () => {
					const key = `favorite${coin.id}`;
					await Storage.instance.remove(key);
					setFavorite(false);
				},
				style: 'destructive',
			},
		]);
	};

	return (
		<View style={styles.container}>
			<View style={styles.subHeader}>
				<View style={styles.row}>
					<Image
						style={styles.image}
						source={{uri: getSymbolIcon(coin.name)}}
					/>
					<Text style={styles.titleText}>{coin.name}</Text>
				</View>
				<Pressable
					onPress={toogleFavorite}
					style={[
						styles.btnFavorite,
						isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
					]}>
					<Text style={styles.btnFavoriteText}>
						{isFavorite ? 'Remove favorite' : 'Add favorite'}
					</Text>
				</Pressable>
			</View>
			<SectionList
				style={styles.section}
				sections={getSections(coin)}
				keyExtractor={(item) => item}
				renderItem={({item}) => (
					<View style={styles.sectionItem}>
						<Text style={styles.sectionText}>{item}</Text>
					</View>
				)}
				renderSectionHeader={({section}) => (
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionText}>{section.title}</Text>
					</View>
				)}
			/>

			<Text style={styles.marketsTitle}>Markets</Text>
			<FlatList
				style={styles.list}
				horizontal={true}
				data={markets}
				renderItem={({item}) => <CoinMarketItem item={item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.charade,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	subHeader: {
		backgroundColor: 'rgba(0,0,0, 0.1)',
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	titleText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
	image: {
		width: 25,
		height: 25,
		marginRight: 8,
	},
	section: {
		maxHeight: 220,
	},
	sectionHeader: {
		backgroundColor: 'rgba(0,0,0, 0.2)',
		padding: 8,
	},
	sectionItem: {
		padding: 8,
	},
	itemText: {
		color: 'white',
		fontSize: 14,
	},
	sectionText: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold',
	},
	list: {
		maxHeight: 100,
		paddingLeft: 16,
	},
	marketsTitle: {
		color: 'white',
		fontSize: 16,
		marginBottom: 16,
		marginLeft: 16,
	},
	btnFavorite: {
		padding: 8,
		borderRadius: 8,
	},
	btnFavoriteText: {
		color: 'white',
	},
	btnFavoriteAdd: {
		backgroundColor: colors.picton,
	},
	btnFavoriteRemove: {
		backgroundColor: colors.carmine,
	},
});

export default CoinDetailScreen;
