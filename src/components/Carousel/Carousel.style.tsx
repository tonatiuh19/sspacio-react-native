import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

export const page = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: width * 0.9,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dbf3fa",
    borderRadius: 20 / 2,
    overflow: "hidden",
    borderWidth: 0.1,
  },
  containerCarousel: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 10,
    paddingBottom: 30,
  },
  tinyPicture: {
    width: imageWidth * 1.1,
    height: imageHeight * 1.1,
  },
  containerText: {
    paddingTop: 15,
    padding: 5,

    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    display: "flex",
  },
  containerTitle: {
    //order: 0,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "auto",
    fontSize: 20,
    fontWeight: "bold",
    color: "#547d2d",
  },
  containerPrice: {
    //order: 0,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "auto",
    fontSize: 23,
    fontWeight: "bold",
  },
  containerPlace: {
    fontSize: 15,
  },
});
