import { StyleSheet, Image, Platform } from 'react-native';
import { supabase } from '@/database/subabase';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SmokingHistoryDay } from '@/components/SmokingHistoryDay';
import { useState, useEffect } from 'react';
export default function TabTwoScreen() {
  const [ smokingHistory, setSmokingHistory ] = useState([]);
  
  useEffect(() => {
    async function getSmokingHistory() {
      const { data, error } = await supabase
        .from('smoking_history')
        .select('date, cig_total:cig_count.sum()');
        setSmokingHistory(data);
    }
    getSmokingHistory();
  }, []);

  return (
    <ParallaxScrollView title="Your Smoking History">
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My History</ThemedText>
      </ThemedView>
      <ThemedText>Quick numbers of your progress since you made the decision to quit!</ThemedText>
      { smokingHistory.map(item => {
        return <SmokingHistoryDay key={item.date} date={item.date} cigTotal={item.cig_total} />
      }) }
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
