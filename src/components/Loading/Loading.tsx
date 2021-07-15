import React, { useEffect } from "react";
import { Text, View, Animated, Easing } from "react-native";
import { page } from "./Loading.style";
import { AntDesign } from "@expo/vector-icons";

const Loading = () => {
  const rotateValueHolder = new Animated.Value(0);
  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  useEffect(() => {
    startImageRotateFunction();
  }, []);

  return (
    <View data-testid="Loading" style={page.container}>
      <Animated.View
        style={{
          transform: [{ rotate: RotateData }],
        }}
      >
        <AntDesign name="loading1" size={32} color="#8acc4b" />
      </Animated.View>
    </View>
  );
};

export default Loading;
