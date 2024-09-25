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
    healthId: null,
    image: '',
    email: '',
    number: '',
    gender: '',
    age: '',
    dob: new Date(),
    address: '',
    city: '',
    pincode: '',
    agent: '',
    payments: []
}

export const WELCOME = 'Welcome';
export const PROGRESS = 'Your Progress of';
export const TARGET = 'Target';

export const fullYear = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
}


export const agentHomeImage1 = 'https://firebasestorage.googleapis.com/v0/b/healthkard-mobile-9599d.appspot.com/o/assets%2Flogin%20page%2FagentHome.png?alt=media&token=d39b1bb5-316a-401a-8e7f-b82fe7987aae';
export const userImagePlaceholder = 'https://firebasestorage.googleapis.com/v0/b/healthkard-mobile-9599d.appspot.com/o/assets%2Fuser-placeholder.png?alt=media&token=c4f6118d-c05c-4061-9dc0-06b6250d15d5';