import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, View, } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface locationTypes {
	title: string
	location: { latitude: number, longtitude: number }
	description: string
}

let locationOfInteresData = [
	{
		title: "first",
		location: {
			latitude: - 27.2,
			longtitude: 145
		},
		description: "First Marker"
	},
	{
		title: "second",
		location: {
			latitude: -30.2,
			longtitude: 150
		},
		description: "Second Marker"
	}
]

const Home = () => {
	const [draggableMarkerCoord, setDraggableMarkerCoord] = useState<any>({
		latitude: 38.57,
		longtitude: 35.14,
	})

	const [locationOfInteres, setLocationOfInterest] = useState<locationTypes[]>(locationOfInteresData)
	const showLocationsOfInteres = () => {
		return locationOfInteres.map((item, index) => (
			<Marker
				key={index}
				coordinate={item.location}
				title={item.title}
				description={item.description}
			/>
		))
	}

	const handleWriteLocationToStorage = async (e: any) => {
		try {
			await AsyncStorage.setItem('selectedLocation', JSON.stringify(e));
			const updateLocationOfInteres = [...locationOfInteres]
			updateLocationOfInteres.push({
				location: e,
				title: "third",
				description: "third description"
			})
			setLocationOfInterest(updateLocationOfInteres)

		} catch (e) {
			// saving error
		}
	}
	return (
		<View style={styles.container} >
			<MapView
				style={{ height: "100%", width: "100%" }}
				provider={PROVIDER_GOOGLE}
				showsUserLocation={true}
				onPress={(e) => handleWriteLocationToStorage(e.nativeEvent.coordinate)}
				initialRegion={{
					latitude: -26.85,
					longitude: 27.49,
					latitudeDelta: 148.11,
					longitudeDelta: 15.95,
				}}
			>
				{showLocationsOfInteres()}
				<Marker
					draggable
					pinColor='#000ff'
					coordinate={draggableMarkerCoord}
					onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
				/>
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
})

export default Home
