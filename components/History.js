import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // You can choose a different icon library
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const History = ({ route }) => {
  const [scanHistory, setScanHistory] = useState([]);
  const scannedLinks = route.params ? route.params.scannedLinks : [];

  useEffect(() => {
    // Load scan history from AsyncStorage
    AsyncStorage.getItem("scanHistory")
      .then((storedScanHistory) => {
        if (storedScanHistory) {
          setScanHistory(JSON.parse(storedScanHistory));
        }
      })
      .catch((error) => {
        console.error("Error loading scan history: ", error);
      });
  }, []);

  const deleteFromHistory = (index) => {
    // Update scan history by removing the selected item
    const updatedHistory = [...scanHistory];
    updatedHistory.splice(index, 1);
    setScanHistory(updatedHistory);

    // Update AsyncStorage after deleting a link
    AsyncStorage.setItem("scanHistory", JSON.stringify(updatedHistory))
      .then(() => {
        console.log("Scan history updated successfully.");
      })
      .catch((error) => {
        console.error("Error saving scan history: ", error);
      });
  };

  const viewLink = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.historyTitle}>Scan History</Text>
      <FlatList
        data={scanHistory}
        renderItem={({ item, index }) => (
          <View style={styles.historyItem}>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>{item}</Text>
            </View>
            <View style={styles.btnBox}>
              <Icon
                name="trash"
                size={24}
                color="red"
                onPress={() => deleteFromHistory(index)}
              />
              <Icon
                name="eye"
                size={24}
                color="blue"
                onPress={() => viewLink(item)}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f5f5f5",
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
    margin: 20,
  },
  historyItem: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkContainer: {
    flex: 1,
  },
  linkText: {
    fontSize: 16,
  },
  btnBox: {
    flexDirection: "row",
  },
});

export default History;
