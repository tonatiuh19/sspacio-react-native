import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { page } from "./TemplateName.style";

const TemplateName = () => {
  return (
    <View data-testid="TemplateName" style={page.container}>
      <Text>TemplateName component</Text>
    </View>
  );
};

export default TemplateName;
