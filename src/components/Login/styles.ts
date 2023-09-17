import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
	loginAreaContainer: {
		flex: 1,
		backgroundColor: "#fff"
	},
	loginContainer: {
		flex: 1,
		marginHorizontal: 22
	},
	textContainer: {
		marginVertical: 22
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginVertical: 12,
		color: "#000"
	},
	subTitle: {
		fontSize: 16,
		color: "#000"
	},
	inputTitle: {
		fontSize: 16,
		fontWeight: "400",
		marginVertical: 8
	},
	inputArea: {
		width: "100%",
		height: 48,
		borderColor: "#000",
		borderWidth: 1,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 22
	},
	divideContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 20
	},
	divideArea: {
		flex: 1,
		height: 1,
		backgroundColor: "#CCCCCC",
		marginHorizontal: 10
	},
	iconContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		height: 52,
		borderWidth: 1,
		borderColor: "#CCCCCC",
		marginRight: 4,
		borderRadius: 10
	},
	registerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 22
	},
	registerText: {
		fontSize: 16,
		color: "#007260",
		fontWeight: "bold",
		marginLeft: 6
	}
})
