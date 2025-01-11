import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showSlideIndicator?: boolean;
  slideIndicatorColor?: string;
  loop?: boolean;
  containerStyle?: object;
  imageStyle?: object;
}

const {width} = Dimensions.get('window');

const CustomSlider: React.FC<CarouselProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 3000,
  showSlideIndicator = true,
  slideIndicatorColor = '#000',
  loop = false,
  containerStyle,
  imageStyle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay) {
      interval = setInterval(() => {
        let nextIndex = currentIndex + 1;

        if (loop) {
          nextIndex = nextIndex % images.length; // Loop back to the first slide
        } else if (nextIndex >= images.length) {
          clearInterval(interval); // Stop autoplay when reaching the last slide if loop is false
          return;
        }

        setCurrentIndex(nextIndex);

        // Programmatically scroll to the next slide
        scrollViewRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
      }, autoPlayInterval);
    }

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, images.length, loop]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{uri: image}}
            style={[styles.image, imageStyle]}
          />
        ))}
      </ScrollView>

      {showSlideIndicator && (
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    currentIndex === index ? slideIndicatorColor : '#ccc',
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
  },
  image: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
