import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppSelector } from '../../store/hooks'


const ProductDetail = () => {
	const { selectedProducts }: any = useAppSelector(state => state.dataSlice)

	return (
		<TouchableOpacity style={styles.cartContainer} >
			<View style={styles.imgContainer} >
				<Image style={styles.imgStyle} source={{
					uri: selectedProducts.imageUrl,
				}} />
			</View>
			<Text style={styles.cartText} >{selectedProducts.name}</Text>
			<Text style={styles.cartText} >{selectedProducts.description}</Text>
			<Text style={styles.cartText} >{selectedProducts.price} TL</Text>
			<Text style={styles.cartText} >{selectedProducts.shippingMethod}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cartPageContainer: {
		padding: 50,
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
		height: 120,
		borderRadius: 120,
	},
	imgStyle: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		borderRadius: 120,
	},
	cartText: {
		fontSize: 12,
		fontWeight: "700",
		marginTop: 8,
	},
})

export default ProductDetail

