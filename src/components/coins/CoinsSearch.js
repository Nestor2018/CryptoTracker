import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';

import colors from '../../resources/colors';

const CoinsSearch = (props) => {
	const [query, setQuery] = useState('');

	const handleText = (queryInput) => {
		setQuery(queryInput);
		if (props.onChange) {
			props.onChange(queryInput);
		}
	};

	return (
		<View>
			<TextInput
				style={[
					styles.textInput,
					Platform.OS == 'ios' ? styles.textInputIos : styles.textInputAndroid,
				]}
				onChangeText={handleText}
				value={query}
				placeholder="Search coins"
				placeholderTextColor="white"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	textInput: {
		height: 46,
		backgroundColor: colors.blackPearl,
		paddingLeft: 16,
		color: 'white',
	},
	textInputAndroid: {
		borderWidth: 2,
		borderBottomColor: colors.zircon,
	},
	textInputIos: {
		margin: 8,
		borderRadius: 8,
	},
});

export default CoinsSearch;
