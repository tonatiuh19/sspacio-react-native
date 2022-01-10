import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { page } from "./Carousel.style";
import Carousel, { Pagination } from "react-native-x2-carousel";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const CarouselCard = (props: any) => {
  console.log("props", props);
  const DATA = [
    {
      id: 1,
      text: (
        <Image
          style={page.tinyPicture}
          source={{
            uri: "https://cdn2.mediotiempo.com/uploads/media/2021/07/15/top-jaime-lozano-jo_0_1_899_533.jpg",
          }}
        />
      ),
    },
    {
      id: 2,
      text: (
        <Image
          style={page.tinyPicture}
          source={{
            uri: "https://www.nicepng.com/png/detail/142-1429857_chivas-de-guadalajara-logo.png",
          }}
        />
      ),
    },
    {
      id: 3,
      text: (
        <Image
          style={page.tinyPicture}
          source={{
            uri: "https://cdn2.mediotiempo.com/uploads/media/2021/07/15/top-adelantos-tecnologicos_0_7_823_474.jpg",
          }}
        />
      ),
    },
  ];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const renderItem = (data) => (
    <View key={data.id} style={page.item}>
      <Text>{data.text}</Text>
    </View>
  );

  const renderTypeIcon = (type: number) => {
    if (type == 1) {
      return <FontAwesome5 name="glass-cheers" size={18} />;
    } else if (type == 2) {
      return <Entypo name="box" size={18} />;
    } else if (type == 2) {
      return <FontAwesome5 name="parking" size={18} />;
    }
  };

  return (
    <View style={page.containerCarousel}>
      <Carousel
        pagination={Pagination}
        renderItem={renderItem}
        autoplay={true}
        autoplayInterval={4800}
        data={DATA}
      />
      <View style={page.containerText}>
        <Text style={page.containerTitle}>
          {renderTypeIcon(props.spaceType)}
          &nbsp;
          {props.title}
        </Text>
        <Text style={page.containerPrice}>
          {formatter.format(Number(props.price))}
        </Text>
      </View>
      <View>
        <Text style={page.containerPlace}>
          <MaterialIcons name="place" size={14} color="black" />
          {props.place}
        </Text>
      </View>
    </View>
  );
};

export default CarouselCard;
