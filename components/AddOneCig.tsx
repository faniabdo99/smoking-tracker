import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';
import { supabase } from '@/database/subabase';
import { SmokingTrackerContext } from '@/context/SmokingTrackerContext';
import { useContext } from 'react';

function generateFormattedDate(){
    const date = new Date();
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}


export function AddOneCig() {
    const { triggerRefresh } = useContext(SmokingTrackerContext);
    async function HandleAddOneCig() {
        const formattedDate = generateFormattedDate();
        // Communicate with Subabase
        const { data, error } = await supabase
        .from('smoking_history')
        .insert({
            date: formattedDate,
            cig_count: 1
        })
        .select();
        // Handle Errors
        if (error) {
            alert(error.message);
        }
    
        if (data) {
            alert('Success! You smoked 1 cigarette 🚬');
            triggerRefresh();
        }
    }


    return (
        <ThemedView>
            <TouchableOpacity style={styles.container} onPress={HandleAddOneCig}>
                <View style={styles.iconContainer}>
                    <ThemedText style={styles.textContainer}>
                        Just poped one 🚬
                    </ThemedText>
                </View>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginTop: 8,
        backgroundColor: '#000000',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 100
    },
    textContainer: {
        color: '#ffffff'
    }
});