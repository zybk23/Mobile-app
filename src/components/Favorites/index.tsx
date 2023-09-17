import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { ProductCard } from "../"
import { useAppSelector } from '../../store/hooks'
import { productsTypes } from '../../types/types'

const Favorites = () => {
	const products = useAppSelector(state => state.dataSlice.products)
	const getFavoritesProduct = products.filter((item: productsTypes) => item.isFavorite)
	return (
		<SafeAreaView style={styles.cartPageContainer} >
			<View style={{ padding: 12 }} >
				<FlatList
					data={getFavoritesProduct}
					renderItem={({ item }) => <ProductCard {...item} />}
					keyExtractor={(item: any) => item.id}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	cartPageContainer: {
		padding: 50,
		flex: 1,
	},
})

export default Favorites
