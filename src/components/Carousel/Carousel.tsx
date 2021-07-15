import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { page } from "./Carousel.style";
import Carousel, { Pagination } from "react-native-x2-carousel";

const CarouselCard = () => {
  const DATA = [
    {
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

  const renderItem = (data) => (
    <View key={data.text} style={page.item}>
      <Text>{data.text}</Text>
    </View>
  );

  return (
    <View style={page.containerCarousel}>
      <Carousel
        pagination={Pagination}
        renderItem={renderItem}
        autoplay="true"
        autoplayInterval="4600"
        data={DATA}
      />
      <View style={page.containerText}>
        <Text style={page.containerTitle}>Hola</Text>
        <Text style={page.containerPrice}>Hola</Text>
      </View>
    </View>
  );
};

export default CarouselCard;
