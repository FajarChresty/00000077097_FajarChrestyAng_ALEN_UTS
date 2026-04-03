import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import { useFajarState } from '../constants/FajarChresty_77097_Context';

const SLIDER_WIDTH = 810; 
const SLIDER_HEIGHT = 200;

export default function HomeSlider({ data }: { data: any[] }) {
  const { isDarkMode } = useFajarState(); 
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (!data || data.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        let nextIndex = prevIndex + 1;
        if (nextIndex >= data.length) nextIndex = 0;

        flatListRef.current?.scrollToIndex({
          animated: true,
          index: nextIndex,
        });

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [data]);

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index,
    });
  };

  const handlePrev = () => {
    const nextIndex = activeIndex === 0 ? data.length - 1 : activeIndex - 1;
    scrollToIndex(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(nextIndex);
  };

  const renderSliderItem = ({ item, index }: { item: any, index: number }) => (
    <View style={styles.slide}>
      <Image
        source={item.image}
        style={styles.sliderImg}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderRow}>
        <TouchableOpacity style={[styles.sideNavBtn, { left: -50 }]} onPress={handlePrev}>
          <Ionicons 
            name="chevron-back" 
            size={30} 
            color={isDarkMode ? "#AAA" : "#888"} 
          />
        </TouchableOpacity>

        <View style={styles.listWrapper}>
          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderSliderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            getItemLayout={(_, index) => ({
              length: SLIDER_WIDTH,
              offset: SLIDER_WIDTH * index,
              index,
            })}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / SLIDER_WIDTH
              );
              setActiveIndex(newIndex);
            }}
          />
        </View>

        <TouchableOpacity style={[styles.sideNavBtn, { right: -50 }]} onPress={handleNext}>
          <Ionicons 
            name="chevron-forward" 
            size={30} 
            color={isDarkMode ? "#AAA" : "#888"} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.pagination}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              activeIndex === i 
                ? styles.activeDot 
                : { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)' }
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    zIndex: 10,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  sideNavBtn: {
    position: 'absolute',
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  listWrapper: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
  },
  slide: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
  },
  sliderImg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 20,
  },
});