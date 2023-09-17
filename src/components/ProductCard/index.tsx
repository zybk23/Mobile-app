import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { setAddProductToCart, setAddProductToFavorites, setSelectedProducts } from '../../store/dataSlice'
import { useAppDispatch } from '../../store/hooks'
import { productsTypes } from '../../types/types'
import { styles } from './styles'


const ProductCard = ({ description, imageUrl, name, price, shippingMethod, id, isFavorite, isItInCartList, handlePresentModalPress }: productsTypes) => {
	const dispatch = useAppDispatch()


	const handleAddItemToFavorites = () => {
		dispatch(setAddProductToFavorites({ id }))
	}

	const handleAddProductToCart = () => {
		const obj = { imageUrl, name, price, id, count: 1 }
		dispatch(setAddProductToCart(obj))
	}

	const handlePressProduct = () => {
		const obj = { description, imageUrl, name, price, shippingMethod, id }
		dispatch(setSelectedProducts(obj))
		handlePresentModalPress && handlePresentModalPress()
	}
	return (
		<TouchableOpacity onPress={handlePressProduct} style={styles.cartContainer} >
			<View style={styles.imgContainer} >
				<Image style={styles.imgStyle} source={{
					uri: imageUrl,
				}} />
			</View>
			<Text style={styles.cartText} >{name}</Text>
			<Text style={styles.cartText} >{description}</Text>
			<Text style={styles.cartText} >{price} TL</Text>
			<Text style={styles.cartText} >{shippingMethod}</Text>
			<View style={styles.iconContainer} >
				<TouchableOpacity onPress={handleAddItemToFavorites} >
					{
						isFavorite ?
							<Image style={styles.icon} source={require(`../../images/favorite.png`)} /> :
							<Image style={styles.icon} source={require(`../../images/favorite1.png`)} />
					}
				</TouchableOpacity>
				<TouchableOpacity onPress={handleAddProductToCart} >
					{
						isItInCartList ?
							<Image style={styles.icon} source={require("../../images/cart1.png")} /> :
							<Image style={styles.icon} source={require("../../images/cart.png")} />
					}
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	)
}



export default ProductCard

