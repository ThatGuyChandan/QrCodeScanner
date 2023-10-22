import React from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{
        uri: "https://scopicsoftware.com/wp-content/uploads/2019/12/X-Things-You-Need-to-Know-About-3D-Scanner-Applications-Before-Building-Your-Own-1200x800-1.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to My App</Text>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate("Scanner")}
          style={styles.button}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
  },
});

export default Home;
