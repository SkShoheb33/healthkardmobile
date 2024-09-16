import { getUserPhoneNumber } from "src/helpers/mobileVerification"

export const payments = [
    {
        "healthId": "HID000001",
        "amount": "150.00",
        "transactionId": "TXN000001",
        "issueDate": "2024-08-25T10:00:00Z",
        "paymentStatus": true
    },
    {
        "healthId": "HID000002",
        "amount": "200.00",
        "transactionId": "TXN000002",
        "issueDate": "2024-08-26T11:30:00Z",
        "paymentStatus": false
    },
    {
        "healthId": "HID000003",
        "amount": "75.50",
        "transactionId": "TXN000003",
        "issueDate": "2024-08-27T14:45:00Z",
        "paymentStatus": true
    },
    {
        "healthId": "HID000004",
        "amount": "300.00",
        "transactionId": "TXN000004",
        "issueDate": "2024-08-28T16:00:00Z",
        "paymentStatus": true
    },
    {
        "healthId": "HID000004",
        "amount": "300.00",
        "transactionId": "TXN000004",
        "issueDate": "2024-08-28T16:00:00Z",
        "paymentStatus": true
    },
    {
        "healthId": "HID000004",
        "amount": "300.00",
        "transactionId": "TXN000004",
        "issueDate": "2024-08-28T16:00:00Z",
        "paymentStatus": true
    },
    {
        "healthId": "HID000004",
        "amount": "300.00",
        "transactionId": "TXN000004",
        "issueDate": "2024-08-28T16:00:00Z",
        "paymentStatus": true
    },
    {
        "healthId": "HID000004",
        "amount": "300.00",
        "transactionId": "TXN000004",
        "issueDate": "2024-08-28T16:00:00Z",
        "paymentStatus": true
    },
    {
        "healthId": "HID000004",
        "amount": "300.00",
        "transactionId": "TXN000004",
        "issueDate": "2024-08-28T16:00:00Z",
        "paymentStatus": true
    },
    {
        "healthId": "HID000004",
        "amount": "300.00",
        "transactionId": "TXN000004",
        "issueDate": "2024-08-28T16:00:00Z",
        "paymentStatus": true
    },
    {
        "healthId": "HID000005",
        "amount": "120.00",
        "transactionId": "TXN000005",
        "issueDate": "2024-08-29T09:00:00Z",
        "paymentStatus": false
    }
]



export const emptyFeedback = [
    {
        "category": "Features",
        "description": "",
        "phoneNumber": getUserPhoneNumber(),
        "date": new Date().toISOString(),
        "seen": false
    }
]

