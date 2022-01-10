import React, { useState, useEffect } from "react";
import {
  Linking,
  NativeModules,
  Platform,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import * as Location from "expo-location";
import { Text, View } from "../components/Themed";
import Loading from "../src/components/Loading/Loading";
import AwesomeAlert from "react-native-awesome-alerts";
import { getSpacios } from "../services/api.services";
import { Entypo } from "@expo/vector-icons";
import CarouselCard from "../src/components/Carousel/Carousel";
import PlacesSearcher from "../src/components/PlacesSearcher/PlacesSearcher";
import { ScrollView } from "react-native-gesture-handler";

const { RNAndroidOpenSettings } = NativeModules;
const { height, width } = Dimensions.get("window");
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function TabOneScreen() {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [locationAlert, setLocationAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [spacesData, setSpacesData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    initialData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const locationAccess = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return 0;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  };

  const gettingSpaccio = (lat: string, long: string) => {
    getSpacios(lat, long)
      .then((x) => {
        if (x !== 0 && typeof x === "string") {
          setLoading(false);
          console.log("si", x);
          setAlertMessage(x);
          setLocationAlert(true);
        } else {
          setLoading(false);
          setSpacesData(x);
        }
      })
      .finally();
  };

  const dismissLocationAlert = () => {
    setLocationAlert(false);
  };

  const initialData = () => {
    setLoading(true);
    locationAccess()
      .then((x: any) => {
        if (x === 0) {
          gettingSpaccio("", "");
        } else {
          gettingSpaccio(
            x.coords.latitude.toString(),
            x.coords.longitude.toString()
          );
        }
      })
      .catch(() => console.log("nor"));
  };

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      RNAndroidOpenSettings.appDetailsSettings();
    }
  };

  useEffect(() => {
    initialData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading></Loading>
      ) : (
        <View>
          <AwesomeAlert
            show={locationAlert}
            showProgress={false}
            title=""
            message={
              <Text>
                Parece que no tienes señal&nbsp;
                <Entypo name="emoji-sad" size={24} color="black" />
              </Text>
            }
            messageStyle={{
              color: "#000000",
              fontSize: 20,
              textAlign: "center",
            }}
            alertContainerStyle={{ backgroundColor: "#ededed" }}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Volver a intentar"
            confirmButtonColor="#8acc4b"
            confirmButtonTextStyle={{ fontSize: 20 }}
            onCancelPressed={() => {
              dismissLocationAlert();
            }}
            onConfirmPressed={() => {
              setLocationAlert(false);
              initialData();
            }}
          />
          <ScrollView
            style={{
              paddingTop: height * 0.08,
              width: width * 0.9,
              zIndex: 1,
            }}
            keyboardShouldPersistTaps={"handled"}
          >
            <PlacesSearcher></PlacesSearcher>
          </ScrollView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <FlatList
              data={spacesData}
              renderItem={(x: any) => {
                console.log(x.item);
                return (
                  <CarouselCard
                    title={x.item.title}
                    price={x.item.price}
                    place={x.item.city + ", " + x.item.state}
                    spaceType={x.item.space_type}
                  ></CarouselCard>
                );
              }}
              keyExtractor={(item, index: any) => index}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
