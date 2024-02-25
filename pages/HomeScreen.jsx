import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      style={styles.container}
      colors={["#F2A541", "#F28705", "#A63F03"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView>
        <View style={styles.greetingsAndNotificationIconContainer}>
          <Text style={styles.text}>Welcome, Sir!</Text>
          <Feather
            name="bell"
            size={32}
            color="#442305"
            onPress={() => {
              navigation.navigate("HomeScreen2");
              console.log("HomeScreen2 pressed");
            }}
          />
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput placeholder="Search" style={styles.searchBarInput} />
          <Feather
            name="search"
            size={24}
            color="#442305"
            onPress={() => {
              navigation.navigate("HomeScreen3");
              console.log("HomeScreen3 pressed");
            }}
          />
        </View>
        <View style={styles.categoryListContainer}>
          <FlatList
            horizontal={true}
            data={["Category 1", "Category 2", "Category 3"]}
            keyExtractor={(item) => item}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log("pressed");
                  }}
                >
                  <View
                    style={[
                      styles.categoryListItemContainer,
                      item.index == 0 ? styles.activeCategory : {},
                    ]}
                  >
                    <Image
                      style={styles.categoryListContainerImage}
                      source={require("../assets/foods/apples.jpg")}
                    />
                    <Text style={styles.categoryListItemText}>{item.item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.foodListContainer}>
          <FlatList
            horizontal={false}
            data={[
              "Food Item 1",
              "Food Item 2",
              "Food Item 3",
              "Food Item 4",
              "Food Item 5",
              "Food Item 6",
              "Food Item 7",
              "Food Item 8",
              "Food Item 9",
              "Food Item 10",
            ]}
            numColumns={2}
            columnWrapperStyle={styles.foodListContainerWrapperContent}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <Text style={styles.foodListContainerTitle}>Food List</Text>
              );
            }}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log("Food item pressed");
                  }}
                >
                  <View style={styles.foodListItemContainer}>
                    <Image
                      style={styles.foodListContainerImage}
                      source={require("../assets/foods/apples.jpg")}
                    />
                    <View style={styles.foodListItemTextContainer}>
                      <Text style={styles.foodListItemText}>Apple</Text>
                      <Text style={styles.foodListItemPrice}>$2.99</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    width: "100%",
  },
  text: {
    fontSize: 32,
    fontWeight: "800",
    color: "#442305", // Slightly darker brown
    textShadowColor: "rgba(245, 170, 102, 0.4)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  greetingsAndNotificationIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2A541",
    borderRadius: 10,
    padding: 10,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 20,
    color: "#442305", // Slightly darker brown
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2A541",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  categoryListItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2A541",
    borderRadius: 10,
    padding: 10,
    opacity: 0.7,
  },
  categoryListContainerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryListItemText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#442305", // Slightly darker brown
  },
  activeCategory: {
    opacity: 1,
  },
  foodListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2A541",
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    height: height / 1.6,
  },
  foodListContainerTitle: {
    alignSelf: "center",
    fontSize: 23,
    fontWeight: "600",
    color: "#442305", // Slightly darker brown
  },
  foodListItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2A541",
    borderRadius: 10,
    padding: 10,
  },
  foodListContainerImage: {
    width: width / 2.6,
    height: height / 4,
    borderRadius: 15,
  },
  foodListItemTextContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  foodListItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#442305", // Slightly darker brown
  },
  foodListItemPrice: {
    fontSize: 14,
    fontWeight: "400",
    color: "#442305", // Slightly darker brown
  },
  foodListContainerWrapperContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
