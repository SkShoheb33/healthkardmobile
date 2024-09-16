import phonepeSDK from 'react-native-phonepe-pg';
import Base64 from 'react-native-base64'
import sha256 from 'sha256';

const environment = 'SANDBOX';
const merchantId = 'PGTESTPAYUAT86';
const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"; // Verify this in your PhonePe dashboard
const salt_index = 1; // Make sure this is correct
const appId = "healthkard"; // Make sure this matches what's in your PhonePe dashboard
const enableLogging = false;

const generateTransactionId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    const merchantPrefix = "T";
    return `${merchantPrefix}${timestamp}${random}`
}

export const pay = async () => {
    try {
        await phonepeSDK.init(environment, merchantId, appId, enableLogging);

        const requestBody = {
            merchantId: merchantId,
            merchantTransactionId: generateTransactionId(),
            amount: 100 * 100, // Amount in paise
            mobileNumber: "9347235528",
            callbackUrl: "https://webhook.site/callback-url", // Change this to a test webhook URL
            redirectUrl: "healthkard://payment-result", // Use your app's custom URL scheme
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        const payload = JSON.stringify(requestBody);
        const payload_main = Base64.encode(payload);
        const string = payload_main + "/pg/v1/pay" + salt_key;
        const checksum = sha256(string) + "###" + salt_index;

        console.log("Request payload:", JSON.stringify(requestBody, null, 2));
        console.log("Encoded payload:", payload_main);
        console.log("Checksum:", checksum);

        const result = await phonepeSDK.startTransaction(
            payload_main,
            checksum,
            "/pg/v1/pay",
            "healthkard", // appSchema (your app's URL scheme)
            null, // Optional callback function
            null  // Additional options (if needed)
        );

        console.log("Full PhonePe response:", JSON.stringify(result, null, 2));
        console.log("Transaction result:", result);
        return result;
    } catch (error) {
        console.error("Payment error:", error);
        throw error;
    }
};