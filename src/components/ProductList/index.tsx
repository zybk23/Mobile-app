

import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown';
import { ProductCard, ProductDetail } from "../";
import { useAppSelector } from '../../store/hooks';

const ProductList = () => {
	const [selectedProduct, setSelectedProduct] = useState("")
	const { products, brands } = useAppSelector(state => state.dataSlice)
	let filteredProductData = [...products]
	if (selectedProduct && selectedProduct !== "All") {
		filteredProductData = products.filter(
			(product: { name: string }) => product.name === selectedProduct
		);
	}

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['25%', '50%'], []);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }} >
			<BottomSheetModalProvider  >
				<SafeAreaView style={styles.cartPageContainer} >
					<View style={{ padding: 12 }} >
						<SelectDropdown
							data={brands}
							onSelect={(selectedItem, index) => {
								setSelectedProduct(selectedItem)
							}}
							buttonTextAfterSelection={(selectedItem, index) => {
								return selectedItem
							}}
							rowTextForSelection={(item, index) => {
								return item
							}}
							buttonStyle={styles.dropdown1BtnStyle}
							buttonTextStyle={styles.dropdown1BtnTxtStyle}

							dropdownIconPosition={"right"}
							dropdownStyle={styles.dropdown1DropdownStyle}
							rowStyle={styles.dropdown1RowStyle}

						/>
						<FlatList
							data={filteredProductData}
							renderItem={({ item }) => <ProductCard handlePresentModalPress={handlePresentModalPress} {...item} />}
							keyExtractor={(item: any) => item.id}

						/>
						<BottomSheetModal
							ref={bottomSheetModalRef}
							index={1}
							snapPoints={snapPoints}
						>
							<ProductDetail />
						</BottomSheetModal>
					</View>
				</SafeAreaView>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	cartPageContainer: {
		flex: 1,
		marginBottom: 60
	},
	dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
	dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
	dropdown1RowStyle: {
		backgroundColor: "#EFEFEF",
		borderBottomColor: "#C5C5C5"
	},
	dropdown1BtnStyle: {
		height: 50,
		backgroundColor: "#FFF",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#444",
		marginTop: 12,
		marginBottom: 16
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
	},
})

export default ProductList
