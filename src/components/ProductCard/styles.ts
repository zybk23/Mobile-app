import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
	cartPageContainer: {
		padding: 50,
		flex: 1,
	},

	cartContainer: {
		height: 320,
		backgroundColor: "#ECECEC",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		marginTop: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
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
	iconContainer: {
		flexDirection: "row",
		marginTop: 16,
		justifyContent: "space-around",
		width: "100%"
	},
	icon: {
		width: 30,
		height: 30
	}
})
