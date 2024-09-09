import phonepeSDK from 'react-native-phonepe-pg';
import Base64 from 'react-native-base64'
import sha256 from 'sha256';

const environment = 'SANDBOX';
const merchantId = 'PGTESTPAYUAT86';
const appId = null;
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
            merchantTransactionId: generateTransactionId(), // Changed from merchantTransaction
            amount: 100 * 100, // Amount in paise
            mobileNumber: "9347235528",
            callbackUrl: "https://healthapp-backend.vercel.app/api/payment/callback", // Add a valid callback URL
            paymentInstrument: {
                type: 'UPI_INTENT'  // Changed from PAY_PAGE to UPI_INTENT
            }
        };

        const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
        const salt_index = 1;
        const payload = JSON.stringify(requestBody);
        const payload_main = Base64.encode(payload);
        const string = payload_main + "/pg/v1/pay" + salt_key;
        const checksum = sha256(string) + "###" + salt_index;

        const result = await phonepeSDK.startTransaction(
            payload_main,
            checksum,
            "/pg/v1/pay", // Add the API endpoint
            "UPI_INTENT" // Specify the payment method
        );

        console.log("Transaction result:", result);
        return result;
    } catch (error) {
        console.error("Payment error:", error);
        throw error;
    }
};