import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Dummy data for categories and foods
const categories = [
  { id: 1, name: "Fruits", image: require("../assets/foods/fruits.jpg") },
  { id: 2, name: "Vegetables", image: require("../assets/foods/fruits.jpg") },
  { id: 3, name: "Bakery", image: require("../assets/foods/fruits.jpg") },
  { id: 4, name: "Dairy", image: require("../assets/foods/fruits.jpg") },
];

const foods = [
  {
    id: 1,
    title: "Apple",
    subtitle: "₹100/kg",
    image: require("../assets/foods/apples.jpg"),
  },
  {
    id: 2,
    title: "Banana",
    subtitle: "₹50/dozen",
    image: require("../assets/foods/apples.jpg"),
  },
  {
    id: 3,
    title: "Carrot",
    subtitle: "₹40/kg",
    image: require("../assets/foods/apples.jpg"),
  },
  {
    id: 4,
    title: "Tomato",
    subtitle: "₹30/kg",
    image: require("../assets/foods/apples.jpg"),
  },
  {
    id: 5,
    title: "Bread",
    subtitle: "₹20/loaf",
    image: require("../assets/foods/apples.jpg"),
  },
  {
    id: 6,
    title: "Cake",
    subtitle: "₹200/piece",
    image: require("../assets/foods/apples.jpg"),
  },
  {
    id: 7,
    title: "Milk",
    subtitle: "₹25/litre",
    image: require("../assets/foods/apples.jpg"),
  },
  {
    id: 8,
    title: "Cheese",
    subtitle: "₹300/kg",
    image: require("../assets/foods/apples.jpg"),
  },
];

// A custom component for rendering each category item
const CategoryItem = ({ item, onPress }) => {
  const handlePress = () => {
    onPress(item.id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={{
          margin: 10,
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={item.image}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text>{item.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// A custom component for rendering each food item
const FoodItem = ({ item, onPress }) => {
  const handlePress = () => {
    onPress(item.id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={{ margin: 10, borderRadius: 10, overflow: "hidden" }}
      >
        <Image
          source={item.image}
          style={{ width: 150, height: 150, borderRadius: 15 }}
        />
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>{item.subtitle}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// The main component for the Homescreen
const HomeScreen3 = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(1);

  // A function to handle the search input change
  const handleSearchChange = (text) => {
    setSearch(text);
  };

  // A function to handle the notification icon press
  const handleNotificationPress = () => {
    // Navigate to the notification screen
    navigation.navigate("Notification");
  };

  // A function to handle the category item press
  const handleCategoryPress = (id) => {
    setActiveCategory(id);
  };

  // A function to handle the food item press
  const handleFoodPress = (id) => {
    // Navigate to the food details screen with the food id as a parameter
    navigation.navigate("FoodDetails", { id });
  };

  // A function to filter the foods based on the active category
  const filterFoods = () => {
    return foods.filter(
      (food) => food.id % categories.length === activeCategory - 1
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 20, backgroundColor: "orange" }}>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Hello, </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>User</Text>
        </View>
        <Text style={{ fontSize: 18 }}>What would you like to buy today?</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <TextInput
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
            placeholder="Search for food"
            value={search}
            onChangeText={handleSearchChange}
          />
          <TouchableOpacity onPress={handleNotificationPress}>
            <View
              style={{
                marginLeft: 10,
                padding: 10,
                borderRadius: 25,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>🔔</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              onPress={handleCategoryPress}
              isActive={item.id === activeCategory}
            />
          )}
        />
        <FlatList
          data={filterFoods()}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FoodItem item={item} onPress={handleFoodPress} />
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen3;
