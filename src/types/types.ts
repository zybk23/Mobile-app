export type productsTypes = {
	description: string
	id: number
	imageUrl: string
	name: string
	price: number
	isFavorite?: boolean
	shippingMethod: string
	isItInCartList?: boolean
	handlePresentModalPress?: any
}

export interface cartTypes {
	imageUrl: string
	name: string
	price: number
	id: number
	count: number
}
