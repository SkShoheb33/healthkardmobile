import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service
        console.log('Error:', error);
        console.log('Error Info:', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <View style={ styles.container }>
                    <Text style={ styles.errorText }>Oops! Something went wrong.</Text>
                    <Text style={ styles.subText }>Please try again later.</Text>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e74c3c',
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: '#7f8c8d',
    },
});

export default ErrorBoundary;
