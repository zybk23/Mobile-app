import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const MyTabBar = ({ state, descriptors, navigation }: any) => {
	return (
		<View style={styles.tabBarContainer}>
			{state.routes.map((route: { key: string | number; name: any; }, index: any) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.tabbarItem}
					>
						<View
							style={[
								styles.inlineView,
								{ backgroundColor: isFocused ? '#FFAC81' : '#FF928B' },
							]}>
							<Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
								{label}
							</Text>
						</View>

					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	tabBarContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#FF928B',
		height: 50,
		paddingHorizontal: 20
	},
	tabbarItem: {
		borderRadius: 50,
		backgroundColor: 'yellow',
	},
	inlineView: {
		width: "auto",
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
		borderRadius: 50,
	},
})

export default MyTabBar
