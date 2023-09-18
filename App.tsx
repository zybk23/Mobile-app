import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Cart, Favorites, Home, Login, MyTabBar, ProductList } from './src/components';
import store from "./src/store";
import { getProducts } from "./src/store/dataSlice";
import { useAppDispatch, useAppSelector } from "./src/store/hooks";

const Tab = createBottomTabNavigator();

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
