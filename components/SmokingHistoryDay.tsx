import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';

export function SmokingHistoryDay({ date, cigTotal }: { date: string, cigTotal: number }) {
    return (
        <ThemedView style={styles.container}>
            <ThemedText>{date}</ThemedText>
            <ThemedView style={styles.cigsContainer}>
                <ThemedText style={styles.cigsText}>Smoked: {cigTotal}</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DCDCDC',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cigsContainer: {
        backgroundColor: '#333333',
        padding: 8,
        borderRadius: 8
    },
    cigsText: {
        color: '#FFFFFF'
    }
});