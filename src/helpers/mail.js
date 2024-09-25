import { Linking } from 'react-native';

/**
 * Opens the default mail client with a new email composition window.
 * @param {string} to - Recipient's email address (optional)
 * @param {string} subject - Email subject (optional)
 * @param {string} body - Email body content (optional)
 */
export function openMailClient(to = '', subject = '', body = '') {
    const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoLink);
}

// Example usage:
// openMailClient('example@example.com', 'Hello from HealthApp', 'This is a test email from our app.');
