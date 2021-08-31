import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Parachute from './parachute.png';
import Cloud from './cloud.png';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const useCloud = ({height, width}) => {
  const verticalTranslation = useSharedValue(-1 * height);
  const horizontalPosition = useSharedValue(Math.random() * screenWidth);

  const styles = useAnimatedStyle(() => {
    return {
      bottom: verticalTranslation.value,
      left: horizontalPosition.value,
    };
  });

  useEffect(() => {
    verticalTranslation.value = withRepeat(
      withDelay(
        Math.random() * 10000,
        withTiming(screenHeight + height, {duration: 15000}, isFinished => {
          if (isFinished) {
            horizontalPosition.value = Math.random() * width;
          }
        }),
      ),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    verticalTranslation,
    horizontalPosition,
    styles,
  };
};

const App: () => Node = () => {
  const rotation = useSharedValue(-45);

  const parachuteAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  const cloud1 = useCloud({height: 50, width: 50});
  const cloud2 = useCloud({height: 100, width: 100});
  const cloud3 = useCloud({height: 150, width: 150});
  const cloud4 = useCloud({height: 200, width: 200});

  useEffect(() => {
    rotation.value = withRepeat(withTiming(45, {duration: 2000}), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LinearGradient colors={['#9be2fe', '#67d1fb']} style={styles.container}>
      <Animated.View style={[styles.parachuteWrapper, parachuteAnimatedStyles]}>
        <Image
          source={Parachute}
          style={styles.parachute}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View style={[styles.cloud, styles.cloud1, cloud1.styles]}>
        <Image source={Cloud} style={styles.cloud1} resizeMode="contain" />
      </Animated.View>
      <Animated.View style={[styles.cloud, styles.cloud2, cloud2.styles]}>
        <Image source={Cloud} style={styles.cloud2} resizeMode="contain" />
      </Animated.View>
      <Animated.View style={[styles.cloud, styles.cloud3, cloud3.styles]}>
        <Image source={Cloud} style={styles.cloud3} resizeMode="contain" />
      </Animated.View>
      <Animated.View style={[styles.cloud, styles.cloud4, cloud4.styles]}>
        <Image source={Cloud} style={styles.cloud4} resizeMode="contain" />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  parachuteWrapper: {
    flex: 0.6,
    justifyContent: 'flex-end',
  },
  parachute: {
    height: 100,
    width: 100,
  },
  cloud: {
    position: 'absolute',
  },
  cloud1: {
    height: 50,
    width: 50,
    zIndex: -1,
  },
  cloud2: {
    height: 100,
    width: 100,
    zIndex: -1,
  },
  cloud3: {
    height: 150,
    width: 150,
    zIndex: -1,
  },
  cloud4: {
    height: 200,
    width: 200,
    zIndex: 1,
  },
});

export default App;
