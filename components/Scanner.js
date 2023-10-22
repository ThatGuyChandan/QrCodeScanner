import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Scanner = ({ navigation }) => {
  const [scan, setScan] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedLinks, setScannedLinks] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");

      // Load scan history from AsyncStorage
      const storedScanHistory = await AsyncStorage.getItem("scanHistory");
      if (storedScanHistory) {
        setScannedLinks(JSON.parse(storedScanHistory));
      }
    })();
  }, []);

  const handleBarCodeScanner = async ({ data }) => {
    if (data && scan) {
      try {
        await Linking.openURL(data); // Open the URL
        // Update scan history
        const updatedScanHistory = [data, ...scannedLinks];
        setScannedLinks(updatedScanHistory);

        // Store updated scan history in AsyncStorage
        await AsyncStorage.setItem(
          "scanHistory",
          JSON.stringify(updatedScanHistory)
        );
      } catch (error) {
        console.error("Error opening URL: ", error);
      } finally {
        setScan(false);
      }
    }
  };

  const startScan = () => {
    setScan(true);
  };

  const goToScanHistory = () => {
    navigation.navigate("History", { scannedLinks });
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scan ? handleBarCodeScanner : undefined}
        style={StyleSheet.absoluteFillObject}
      />
      {scan && (
        <View style={styles.scanOverlay}>
          <Text style={styles.scanMessage}>Scanning...</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Scan" onPress={startScan} disabled={scan} />
        <Button title="History" onPress={goToScanHistory} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  scanOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanMessage: {
    fontSize: 18,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default Scanner;
