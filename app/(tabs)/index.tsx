import { Image, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AddOneCig } from '@/components/AddOneCig';
import { TodayCigsCount } from '@/components/TodayCigsCount';
import { SmokingTrackerProvider } from '@/context/SmokingTrackerContext';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      title="Did you just smoke?"
      >
      <ThemedView style={styles.stepContainer}>
        <ThemedText>This app is built to help you quit, or at least reduce your smoking.</ThemedText>
        <ThemedText>Whenever you smoke one, hit the counter below, your goal is to reduce the number by 5% everyday.</ThemedText>
        <ThemedText>Your allowance is calcualted based on your average smoking habits across the last week.</ThemedText>
      </ThemedView>
      <SmokingTrackerProvider>
        <TodayCigsCount />
        <AddOneCig />
      </SmokingTrackerProvider>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
