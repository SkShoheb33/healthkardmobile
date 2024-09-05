export const plans = [
    { id: '1 month', label: 'Monthly plan', price: 'Rs.99/month', duration: '28 days', amount: 99 },
    { id: '3 months', label: 'Three months plan', price: 'Rs.297', duration: '84 days', amount: 297 },
    { id: '6 months', label: 'Six months plan', price: 'Rs.499', duration: '170 days', amount: 499 },
    { id: '1 year', label: 'One year plan', price: 'Rs.899', duration: '1 year', amount: 899 }
];


export const initialUser = {
    name: '',
    image: '',
    email: '',
    number: '',
    gender: '',
    age: '',
    dob: '',
    address: '',
    city: '',
    pincode: '',
    agent: '',
    payments: [
        {
            plan: '1 month',
            amount: 99,
            transactionId: '',
            issueDate: '',
            paymentStatus: false
        }
    ]
}