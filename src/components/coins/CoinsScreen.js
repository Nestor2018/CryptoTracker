import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';

import Http from '../../libs/http';
import colors from '../../resources/colors';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';

const CoinsScreen = (props) => {
	const [coins, setData] = useState([]);
	const [allCoins, setAllCoins] = useState([]);
	const [loading, setLoading] = useState(false);

	let getData = async () => {
		setLoading(true);
		let resp = await Http.instance.get('https://api.coinlore.net/api/tickers/');
		setData(resp.data);
		setAllCoins(resp.data);
		setLoading(false);
		console.log(resp);
	};

	handleSearch = (query) => {
		const coinsFiltered = allCoins.filter((coin) => {
			return (
				coin.name.toLowerCase().includes(query.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(query.toLowerCase())
			);
		});
		setData(coinsFiltered)
	};

	useEffect(() => {
		getData();
	}, []);

	handlePress = (coin) => {
		props.navigation.navigate('CoinDetail', {coin});
	};
	return (
		<View style={styles.container}>
			<CoinsSearch onChange={handleSearch} />
			{loading ? (
				<ActivityIndicator color="white" size="large" style={styles.loader} />
			) : null}
			<FlatList
				data={coins}
				renderItem={({item}) => (
					<CoinsItem item={item} onPress={() => handlePress(item)}></CoinsItem>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.charade,
		flex: 1
	},
	loader: {
		marginTop: 60,
	},
});

export default CoinsScreen;
