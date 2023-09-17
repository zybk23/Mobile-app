import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Cart, Favorites, Home, Login, ProductList } from './src/components';
import store from "./src/store";
import { getProducts } from "./src/store/dataSlice";
import { useAppDispatch, useAppSelector } from "./src/store/hooks";


function MyTabBar({ state, descriptors, navigation }: any) {
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

const Tab = createBottomTabNavigator();

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

const NavigationWrapper = () => {
	const { isLogin } = useAppSelector(state => state.dataSlice)

	const dispatch = useAppDispatch()
	React.useEffect(() => {
		dispatch(getProducts())
	}, [])
	return (
		<SafeAreaView style={{ flex: 1 }} >
			{
				isLogin ?
					<NavigationContainer>
						<Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
							<Tab.Screen options={{
								tabBarLabel: 'Home',
								tabBarIcon: ({ color, size }) => (
									<Image style={{ backgroundColor: "red", width: 30, height: 30 }} source={require(`./src/images/favorite.png`)} />
								),
							}} name="Home" component={Home} />
							<Tab.Screen name="ProductList" component={ProductList} />
							<Tab.Screen name="Favorites" component={Favorites} />
							<Tab.Screen name="Cart" component={Cart} />
						</Tab.Navigator>
					</NavigationContainer> :
					<Login />
			}
		</SafeAreaView>
	)
}

export default function App() {
	return (
		<Provider store={store} >
			<NavigationWrapper />
		</Provider>
	);
}
