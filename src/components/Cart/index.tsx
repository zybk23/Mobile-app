import React from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { setDecreaseProductCount, setIncreaseProductCount, setRemoveItemFromCart } from '../../store/dataSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { cartTypes } from '../../types/types'


const CartItem = ({ imageUrl, name, price, count, id }: cartTypes) => {
	const dispatch = useAppDispatch()


	const handleIncreaseCount = () => {
		dispatch(setIncreaseProductCount({ id }))
	}
	const handleDecreaseCount = () => {
		dispatch(setDecreaseProductCount({ id }))
	}
	const handleRemoveProductFromCart = () => {
		dispatch(setRemoveItemFromCart({ id }))
	}
	return (
		<View style={styles.cartContainer} >
			<View style={styles.imgContainer} >
				<Image style={styles.imgStyle} source={{
					uri: imageUrl,
				}} />
			</View>
			<Text style={styles.cartText} >{name}</Text>
			<Text style={styles.cartText} >{price} TL</Text>
			<View style={styles.countContainer} >
				<TouchableOpacity onPress={handleDecreaseCount} >
					<Image style={styles.icon} source={require("../../images/minus.png")} />
				</TouchableOpacity>
				<Text style={styles.countText} >{count}</Text>
				<TouchableOpacity onPress={handleIncreaseCount} >
					<Image style={styles.icon} source={require("../../images/plus.png")} />
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={handleRemoveProductFromCart} >
				<Image style={styles.remove} source={require("../../images/remove.png")} />
			</TouchableOpacity>

		</View>
	)
}


const Cart = () => {
	const { cartList } = useAppSelector(state => state.dataSlice)

	return (
		<SafeAreaView style={styles.cartPageContainer} >
			<View style={{ padding: 12 }} >
				<FlatList
					data={cartList}
					renderItem={({ item }) => <CartItem {...item} />}
					keyExtractor={(item: any) => item.id}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	cartPageContainer: {
		flex: 1,
	},
	cartContainer: {
		height: 320,
		backgroundColor: "#FAFAFA",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		marginTop: 8,
	},
	imgContainer: {
		width: "80%",
		height: 180,
		borderRadius: 20,
	},
	imgStyle: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		borderRadius: 20,
	},
	cartText: {
		fontSize: 12,
		fontWeight: "700",
		marginTop: 8,
	},
	countText: {
		fontSize: 12,
		fontWeight: "700",
	},
	iconContainer: {
		flexDirection: "row",
		marginTop: 16,
		justifyContent: "space-around",
		width: "100%"
	},
	icon: {
		width: 20,
		height: 20,
	},
	remove: {
		width: 30,
		height: 30,
	},
	countContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		gap: 20,
		marginTop: 10
	}
})

export default Cart
