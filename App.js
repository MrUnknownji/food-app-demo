import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./pages/HomeScreen";
import HomeScreen2 from "./pages/HomeScreen2";
import HomeScreen3 from "./pages/HomeScreen3";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
        <Stack.Screen name="HomeScreen3" component={HomeScreen3} />
      </Stack.Navigator>
      {/* <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeScreen />
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
