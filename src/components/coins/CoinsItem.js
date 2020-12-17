import React from 'react';
import {View, Image, Text, StyleSheet, Platform, Pressable} from 'react-native';

import colors from '../../resources/colors';

const CoinsItem = ({item, onPress}) => {
	getImageArrow = () => {
		if (item.percent_change_1h > 0) {
			return require('../../assets/arrow_up.png');
		} else {
			return require('../../assets/arrow_down.png');
		}
	};

	return (
		<Pressable onPress={onPress} style={styles.container}>
			<View style={styles.row}>
				<Text style={styles.symbolText}>{item.symbol}</Text>
				<Text style={styles.nameText}>{item.name}</Text>
				<Text style={styles.price}>{`$${item.price_usd}`}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.percentText}>{item.percent_change_1h}</Text>
				<Image source={getImageArrow()} style={styles.imageIcon} />
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
		borderBottomColor: colors.zircon,
		borderBottomWidth: 1,
		marginLeft: Platform.OS == 'ios' ? 16 : 0,
		paddingLeft: Platform.Os == 'ios' ? 0 : 16,
	},
	row: {
		flexDirection: 'row',
	},
	symbolText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
		marginRight: 12,
	},
	nameText: {
		color: 'white',
		fontSize: 14,
	},
	percentText: {
		color: 'white',
		fontSize: 12,
		marginRight: 8,
	},
	price: {
		color: 'white',
		fontSize: 14,
		marginLeft: 12,
	},
	imageIcon: {
		width: 22,
		height: 22,
	},
});

export default CoinsItem;
