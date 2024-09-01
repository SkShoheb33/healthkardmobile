import uuid from 'react-native-uuid';

export const doctorDetails = {
    id: uuid.v4(),
    doctorLicenseURL: '',
    email: '',
    lisenceNumber: '',
    name: '',
    number: '',
    qualification: '',
}

export const initialHospitals = {
    hospitalId: '',
    email: '',
    isverified: '0',
    agentID: 'Agent id',
    hospitalDetails: {
        daysAvailabilty: [false, true, true, true, true, true, true],
        from: '',
        gstNumber: '',
        hospitalGSTFile: '',
        hospitalLegalName: '',
        hospitalLicense: '',
        hospitalNumber: '',
        hospitalOwnerContactNumber: '',
        hospitalOwnerEmail: '',
        hospitalOwnerFullName: '',
        hospitalTradeName: '',
        licenseNumber: '',
        address: {
            lat: '',
            lng: '',
            city: '',
            code: '',
            country: '',
            landmark: '',
            state: '',
            street: '',
        },
        typeOfHospital: '',
        servicesOffered: [],
        to: '',
    },
    doctorList: [doctorDetails],
    mediaDetails: {
        achivements: [],
        desc: '',
        doctorImageURL: '',
        hospitalImageURL: '',
        logoURL: '',
    },
    users: [],
}

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
            paymentStatus: ''
        }
    ]
}

export const plans = [
    { plan: '1 month', price: 99 },
    { plan: '3 months', price: 299 },
    { plan: '6 months', price: 499 },
    { plan: '1 year', price: 899 },
]
export const WELCOME = 'Welcome';
export const PROGRESS = 'Your Progress of';
export const TARGET = 'Target';