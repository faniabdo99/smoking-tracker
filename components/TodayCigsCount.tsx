import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { supabase } from '@/database/subabase';
import { useState, useEffect, useContext } from 'react';
import { SmokingTrackerContext } from '@/context/SmokingTrackerContext';

function generateFormattedDate(){
    const date = new Date();
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}
function generateFormattedDateYesterday(){
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

function generateFormattedDatePastWeek(){
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}



export function TodayCigsCount() {
    const [ todayCigsCount, setTodayCigsCount ] = useState(0);
    const [ yesterdayCigsCount, setYesterdayCigsCount ] = useState('Loading ...');
    const [ pastWeekCigsCount, setPastWeekCigsCount ] = useState(0);
    const [ todayAllowance, setTodayAllowance ] = useState(0);
    const { refresh } = useContext(SmokingTrackerContext);

    useEffect(() => {
        async function fetchData() {
            const { data: todayData, error: todayError } = await supabase
                .from('smoking_history')
                .select('cig_total:cig_count.sum()')
                .eq('date', generateFormattedDate());

            const { data: yesterdayData, error: yesterdayError } = await supabase
                .from('smoking_history')
                .select('cig_total:cig_count.sum()')
                .eq('date', generateFormattedDateYesterday());

            const { data: pastWeekData, error: pastWeekError } = await supabase
                .from('smoking_history')
                .select('cig_total:cig_count.sum()')
                .gte('date', generateFormattedDatePastWeek());

            setTodayCigsCount(todayData[0].cig_total);
            setYesterdayCigsCount(yesterdayData[0].cig_total);
            setPastWeekCigsCount(pastWeekData[0].cig_total);
        }

        fetchData();
    }, [refresh]);

    useEffect(() => {
        if (pastWeekCigsCount > 0) {
            calculateTodayAllowance();
        }
    }, [pastWeekCigsCount]);
    function calculateTodayAllowance() {
        const allowance = Math.ceil(pastWeekCigsCount * 0.95);
        setTodayAllowance(allowance);
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText>Smoked Today: {todayCigsCount}</ThemedText>
            <ThemedText>Smoked Yesterday: {yesterdayCigsCount}</ThemedText>
            <ThemedText>Today's Allowance: {todayAllowance - todayCigsCount}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DCDCDC',
        padding: 16,
        borderRadius: 8,
        textAlign: 'left'
    }
});