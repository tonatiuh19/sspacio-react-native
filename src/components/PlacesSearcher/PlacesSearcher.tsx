import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { page } from "./PlacesSearcher.style";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const PlacesSearcher = () => {
  return (
    <View data-testid="PlacesSearcher" style={page.container}>
      <GooglePlacesAutocomplete
        placeholder="¿En donde necesitas tu lugar?"
        fetchDetails={true}
        onPress={(data, details: any) => {
          // 'details' is provided when fetchDetails = true
          console.log(details.geometry.location);
        }}
        query={{
          key: "AIzaSyAzm7z1Vn8yZyPLs0rHwdWM6GxzLgaUE6A",
          language: "es",
          types: "(cities)",
          components: "country:mx",
        }}
        styles={{
          textInput: {
            height: 60,
            color: "#5d5d5d",
            fontSize: 16,
            backgroundColor: "#ededed",
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
          row: {
            backgroundColor: "#ededed",
            padding: 13,
            height: 44,
            flexDirection: "row",
          },
        }}
      />
    </View>
  );
};

export default PlacesSearcher;
