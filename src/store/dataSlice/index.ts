import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { cartTypes, productsTypes } from "../../types/types";

export const getProducts = createAsyncThunk("data/getPosts", async () => {
	const response = await axios.get(
		"https://honey-badgers-ecommerce.glitch.me/products"
	);
	const { data } = response;
	const modifiedData = data.map((item: productsTypes) => {
		return {
			...item,
			isFavorite: false,
			isItInCartList: false,
			price: Number(item.price)
		}
	})
	return modifiedData;
});


export interface stateType {
	products: productsTypes[]
	cartList: cartTypes[]
	brands: string[]
	selectedProducts: productsTypes | any
	isLogin: boolean
}

export const dataSlice = createSlice({
	name: "data",
	initialState: {
		products: [],
		cartList: [],
		brands: [],
		selectedProducts: {},
		isLogin: false
	},
	reducers: {
		setAddProductToCart: (state: stateType, action: PayloadAction<cartTypes>) => {
			const productInCartListIndex = state.cartList.findIndex(item => item.id === action.payload.id)
			const productInProductsListIndex = state.products.findIndex(item => item.id === action.payload.id)
			if (productInCartListIndex < 0) {
				const updatedFavorites = [...state.cartList]
				updatedFavorites.push(action.payload)
				state.cartList = updatedFavorites
				state.products[productInProductsListIndex].isItInCartList = true
			}
		},
		setAddProductToFavorites: (state: stateType, action: PayloadAction<{ id: number }>) => {
			const isProductExist = state.products.findIndex(item => item.id === action.payload.id)
			state.products[isProductExist].isFavorite = !state.products[isProductExist].isFavorite
		},
		setIncreaseProductCount: (state: stateType, action: PayloadAction<{ id: number }>) => {
			const findProductIndex = state.cartList.findIndex(item => item.id === action.payload.id)
			const productInProductsListIndex = state.products.findIndex(item => item.id === action.payload.id)
			state.cartList[findProductIndex].count += 1
			state.cartList[findProductIndex].price = state.cartList[findProductIndex].count * state.products[productInProductsListIndex].price
		},
		setDecreaseProductCount: (state: stateType, action: PayloadAction<{ id: number }>) => {
			const findProductIndex = state.cartList.findIndex(item => item.id === action.payload.id)
			const productInProductsListIndex = state.products.findIndex(item => item.id === action.payload.id)
			state.cartList[findProductIndex].count -= 1
			if (state.cartList[findProductIndex].count === 0) {
				state.cartList = state.cartList.filter(item => item.id !== action.payload.id)
				state.products[productInProductsListIndex].isItInCartList = false
			} else {
				state.cartList[findProductIndex].price = state.cartList[findProductIndex].count * state.products[productInProductsListIndex].price
			}
		},
		setRemoveItemFromCart: (state: stateType, action: PayloadAction<{ id: number }>) => {
			const productInProductsListIndex = state.products.findIndex(item => item.id === action.payload.id)
			state.cartList = state.cartList.filter(item => item.id !== action.payload.id)
			state.products[productInProductsListIndex].isItInCartList = false
		},
		setSelectedProducts: (state: stateType, action: PayloadAction<productsTypes>) => {
			state.selectedProducts = action.payload
		},
		setIsLogin: (state: stateType, action: PayloadAction<boolean>) => {
			state.isLogin = action.payload
		}
	},
	extraReducers: (builder: ActionReducerMapBuilder<stateType>) => {
		builder.addCase(getProducts.fulfilled, (state: stateType, action: PayloadAction<productsTypes[]>) => {
			const brands: string[] = ["All"];
			action.payload.map((item) => {
				brands.push(item.name);
			});
			const uniqueBrands = [...new Set(brands.sort())];
			state.products = action.payload
			state.brands = uniqueBrands
		})
	}
});

export const {
	setAddProductToFavorites, setAddProductToCart, setIncreaseProductCount,
	setDecreaseProductCount, setRemoveItemFromCart, setSelectedProducts, setIsLogin
} = dataSlice.actions;

export default dataSlice.reducer;


