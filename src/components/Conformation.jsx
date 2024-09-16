import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Confirmation = ({ message, onCancel, onProceed, visible }) => {
    if (!visible) return null;

    return (
        <View style={ styles.overlay }>
            <View style={ styles.confirmationAlert }>
                <Text style={ styles.message }>{ message }</Text>
                <View style={ styles.buttonGroup }>
                    <TouchableOpacity style={ styles.button } onPress={ onCancel }>
                        <Text style={ styles.buttonText }>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button } onPress={ onProceed }>
                        <Text style={ styles.buttonText }>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        // ... overlay styles ...
    },
    confirmationAlert: {
        // ... alert styles ...
    },
    message: {
        // ... message styles ...
    },
    buttonGroup: {
        // ... button group styles ...
    },
    button: {
        // ... button styles ...
    },
    buttonText: {
        // ... button text styles ...
    },
});

export default Confirmation;
