import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { Alert, Button, Image, NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { setIsLogin } from "../../store/dataSlice";
import { useAppDispatch } from "../../store/hooks";
import { styles } from "./styles";

const Login = () => {
	const dispatch = useAppDispatch()
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const handleLogin = () => {
		if (!email || !password) {
			return Alert.alert("Fill the email and password")
		}
		dispatch(setIsLogin(true))
	}
	return (
		<SafeAreaView style={styles.loginAreaContainer}>
			<View style={styles.loginContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>
						Hi Welcome Back ! 👋
					</Text>

					<Text style={styles.subTitle}>Hello again you have been missed!</Text>
				</View>

				<View style={{ marginBottom: 12 }}>
					<Text style={styles.inputTitle}>Email address</Text>

					<View style={styles.inputArea}>
						<TextInput
							placeholder='Enter your email address'
							placeholderTextColor={"#000"}
							keyboardType='email-address'
							value={email}
							onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setEmail(e.nativeEvent.text)}
							style={{
								width: "100%"
							}}
						/>
					</View>
				</View>

				<View style={{ marginBottom: 12 }}>
					<Text style={styles.inputTitle}>Password</Text>

					<View style={styles.inputArea}>
						<TextInput
							placeholder='Enter your password'
							placeholderTextColor={"#000"}
							secureTextEntry={isPasswordShown}
							value={password}
							onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setPassword(e.nativeEvent.text)}
							style={{
								width: "100%"
							}}
						/>

						<TouchableOpacity
							onPress={() => setIsPasswordShown(!isPasswordShown)}
							style={{
								position: "absolute",
								right: 12
							}}
						>
							{
								isPasswordShown == true ? (
									<Ionicons name="eye-off" size={24} color={"#000"} />
								) : (
									<Ionicons name="eye" size={24} color={"#000"} />
								)
							}

						</TouchableOpacity>
					</View>
				</View>

				<View style={{
					flexDirection: 'row',
					marginVertical: 6
				}}>

					<Text>Remenber Me</Text>
				</View>

				<Button
					title="Login"
					onPress={handleLogin}
				/>

				<View style={styles.divideContainer}>
					<View
						style={styles.divideArea}
					/>
					<Text style={{ fontSize: 14 }}>Or Login with</Text>
					<View
						style={styles.divideArea}
					/>
				</View>

				<View style={{
					flexDirection: 'row',
					justifyContent: 'center'
				}}>
					<TouchableOpacity
						style={styles.iconContainer}
					>
						<Image
							source={require("../../images/facebook.png")}
							style={{
								height: 36,
								width: 36,
								marginRight: 8
							}}
							resizeMode='contain'
						/>

						<Text>Facebook</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.iconContainer}
					>
						<Image
							source={require("../../images/google.png")}
							style={{
								height: 36,
								width: 36,
								marginRight: 8
							}}
							resizeMode='contain'
						/>

						<Text>Google</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.registerContainer}>
					<Text style={{ fontSize: 16, color: "#000" }}>Don't have an account ? </Text>
					<View

					>
						<Text style={styles.registerText}>Register</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Login
