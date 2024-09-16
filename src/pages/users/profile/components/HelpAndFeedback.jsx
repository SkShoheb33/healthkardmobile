import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Navbar from '@components/Navbar';
import Dropdown from '@components/DropDown';
import Button from '@components/Button';
import { emptyFeedback } from '../constants';

function HelpAndFeedback() {
    const [feedback, setFeedback] = useState(emptyFeedback || {});

    const categories = [
        { name: 'Features', value: 'features' },
        { name: 'Bugs', value: 'bugs' },
        { name: 'Improvement', value: 'improvement' },
        { name: 'Payment Issues', value: 'payment_issues' }
    ];

    const handleSend = async () => {

        // TODO: Implement API call to send feedback
        console.log('Feedback:', feedback);
    };

    return (
        <View style={ { flex: 1 } } className='bg-white'>
            <Navbar />
            <View style={ styles.container }>

                <Text style={ styles.title }>Help and Feedback</Text>
                <View style={ styles.form }>
                    <Dropdown
                        list={ categories }
                        value={ feedback.category }
                        setValue={ (value) => setFeedback({ ...feedback, category: value }) }
                        label="Select Category"
                    />
                    <Text style={ styles.label }>Description:</Text>
                    <TextInput
                        style={ styles.input }
                        multiline
                        numberOfLines={ 20 }
                        onChangeText={ (text) => setFeedback({ ...feedback, description: text }) }
                        value={ feedback.description }
                        placeholder="Enter your feedback here"
                    />
                    <Button label="Send Feedback" onPress={ handleSend } />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#000'
    },
    form: {
        marginTop: 16,
    },
    label: {
        marginTop: 16,
        marginBottom: 8,
        color: '#000'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
});

export default HelpAndFeedback;
