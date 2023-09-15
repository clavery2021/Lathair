import React from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';

const CouponHintCarousel = ({ hints, renderHintItem, setActiveSlide, renderPagination }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Carousel
        data={hints}
        renderItem={renderHintItem}
        sliderWidth={300}
        itemWidth={200}
        onSnapToItem={index => setActiveSlide(index)}
      />
      {renderPagination()}
    </View>
  );
};

export default CouponHintCarousel;
