import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView title="About">
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Track My Cigs</ThemedText>
      </ThemedView>
      <ThemedText>This app was inspired by the 5% rule of quitting smoking.</ThemedText>
      <ThemedText>The idea is that you smoke 5% less than you did the day before.</ThemedText>
      <ThemedText>This app helps you track your progress and stay motivated.</ThemedText>
      <ThemedText>Credit goes to <ThemedText style={{fontWeight: 'bold'}}>Shiern Badran</ThemedText> for her support</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
