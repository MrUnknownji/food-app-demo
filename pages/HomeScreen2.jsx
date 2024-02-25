// Import React and other necessary components
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Define some sample data for the categories and foods
const categories = [
  { id: 1, name: "Fruits", image: require("../assets/foods/fruits.jpg") },
  { id: 2, name: "Vegetables", image: require("../assets/foods/fruits.jpg") },
  { id: 3, name: "Meat", image: require("../assets/foods/fruits.jpg") },
  { id: 4, name: "Bakery", image: require("../assets/foods/fruits.jpg") },
  { id: 5, name: "Dairy", image: require("../assets/foods/fruits.jpg") },
];

const foods = [
  { id: 1, name: "Apple", price: 0.99, image: require("../assets/foods/bananas.jpg") },
  { id: 2, name: "Banana", price: 0.79, image: require("../assets/foods/bananas.jpg") },
  { id: 3, name: "Orange", price: 1.29, image: require("../assets/foods/bananas.jpg") },
  { id: 4, name: "Carrot", price: 0.49, image: require("../assets/foods/bananas.jpg") },
  { id: 5, name: "Broccoli", price: 0.99, image: require("../assets/foods/bananas.jpg") },
  { id: 6, name: "Tomato", price: 0.69, image: require("../assets/foods/bananas.jpg") },
  { id: 7, name: "Chicken", price: 4.99, image: require("../assets/foods/bananas.jpg") },
  { id: 8, name: "Beef", price: 6.99, image: require("../assets/foods/bananas.jpg") },
  { id: 9, name: "Salmon", price: 9.99, image: require("../assets/foods/bananas.jpg") },
  { id: 10, name: "Bread", price: 2.99, image: require("../assets/foods/bananas.jpg") },
  { id: 11, name: "Croissant", price: 1.99, image: require("../assets/foods/bananas.jpg") },
  { id: 12, name: "Cake", price: 3.99, image: require("../assets/foods/bananas.jpg") },
  { id: 13, name: "Milk", price: 1.49, image: require("../assets/foods/bananas.jpg") },
  { id: 14, name: "Cheese", price: 2.49, image: require("../assets/foods/bananas.jpg") },
  { id: 15, name: "Yogurt", price: 0.99, image: require("../assets/foods/bananas.jpg") },
];

// Define a custom component for rendering each category item
const CategoryItem = ({ item, onPress, isActive }) => {
  // Use an Animated.Value to control the scale of the item
  const scale = new Animated.Value(isActive ? 1.1 : 1);

  // Use an Animated.spring to animate the scale when the item is pressed
  const animateScale = () => {
    Animated.spring(scale, {
      toValue: isActive ? 1.1 : 1,
      useNativeDriver: true,
    }).start();
  };

  // Use useEffect to trigger the animation when the isActive prop changes
  useEffect(() => {
    animateScale();
  }, [isActive]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.categoryItem}>
      <Animated.View style={[styles.categoryImageContainer, { transform: [{ scale }] }]}>
        <Image source={item.image} style={styles.categoryImage} />
      </Animated.View>
      <Text style={[styles.categoryName, isActive && styles.categoryNameActive]}>{item.name}</Text>
    </TouchableOpacity>
  );
};

// Define a custom component for rendering each food item
const FoodItem = ({ item, onPress }) => {
  // Use an Animated.Value to control the opacity of the item
  const opacity = new Animated.Value(0);

  // Use an Animated.timing to animate the opacity when the item is mounted
  const animateOpacity = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Use useEffect to trigger the animation when the item is mounted
  useEffect(() => {
    animateOpacity();
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.foodItem}>
      <Animated.View style={[styles.foodImageContainer, { opacity }]}>
        <Image source={item.image} style={styles.foodImage} />
      </Animated.View>
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.foodPrice}>${item.price}</Text>
    </TouchableOpacity>
  );
};

// Define the main component for the Homescreen2
const Homescreen2 = () => {
  // Use useState to store the current category and the search text
  const [currentCategory, setCurrentCategory] = useState(1);
  const [searchText, setSearchText] = useState("");

  // Use useNavigation to navigate to other screens
  const navigation = useNavigation();

  // Define a function to handle the category selection
  const handleCategorySelect = (id) => {
    setCurrentCategory(id);
  };

  // Define a function to handle the food selection
  const handleFoodSelect = (item) => {
    navigation.navigate("FoodDetails", { item });
  };

  // Define a function to handle the notification icon press
  const handleNotificationPress = () => {
    navigation.navigate("Notifications");
  };

  // Define a function to filter the foods based on the current category and the search text
  const filterFoods = () => {
    return foods.filter(
      (food) =>
        food.name.toLowerCase().includes(searchText.toLowerCase()) &&
        categories.find((category) => category.id === currentCategory).name === food.category
    );
  };

  // Define a function to render the header of the screen
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, welcome to Food Shop!</Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  // Define a function to render the search bar
  const renderSearchBar = () => {
    return (
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    );
  };

  // Define a function to render the category bar
  const renderCategoryBar = () => {
    return (
      <View style={styles.categoryBar}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              onPress={() => handleCategorySelect(item.id)}
              isActive={item.id === currentCategory}
            />
          )}
        />
      </View>
    );
  };

  // Define a function to render the food list
  const renderFoodList = () => {
    return (
      <View style={styles.foodList}>
        <FlatList
        //   data={filterFoods()}
        data={foods}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <FoodItem item={item} onPress={() => handleFoodSelect(item)} />}
        />
      </View>
    );
  };

  // Return the JSX elements for the screen
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderSearchBar()}
      {renderCategoryBar()}
      {renderFoodList()}
    </View>
  );
};

// Define the styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  categoryBar: {
    height: 100,
    marginBottom: 10,
  },
  categoryItem: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
  },
  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  categoryName: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  categoryNameActive: {
    color: "#000",
    fontWeight: "bold",
  },
  foodList: {
    flex: 1,
  },
  foodItem: {
    width: "50%",
    padding: 10,
  },
  foodImageContainer: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    overflow: "hidden",
  },
  foodImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  foodName: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
  foodPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});

// Export the component
export default Homescreen2;
