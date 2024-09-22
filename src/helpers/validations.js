export const validateEmail = (email) => {
    if (email.includes('@gmail.com')) {
        return true;
    }
    return false;
}

export const userValidation = (userData, setErrors) => {
    let isValid = true;
    let newErrors = {};

    // Name validation
    if (!userData.name.trim()) {
        newErrors.name = { status: true, message: 'Name is required' };
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim() || !emailRegex.test(userData.email)) {
        newErrors.email = { status: true, message: 'Valid email is required' };
        isValid = false;
    }

    // Phone number validation
    if (!userData.number.trim() || userData.number.length !== 10) {
        newErrors.number = { status: true, message: 'Valid 10-digit number is required' };
        isValid = false;
    }

    // Street validation
    if (!userData.address.trim()) {
        newErrors.address = { status: true, message: 'Street address is required' };
        isValid = false;
    }

    // Town/City validation
    if (!userData.city.trim()) {
        newErrors.city = { status: true, message: 'Town/City is required' };
        isValid = false;
    }

    // Pincode validation
    const pincodeRegex = /^\d{6}$/;
    if (!userData.pincode.trim() || !pincodeRegex.test(userData.pincode)) {
        newErrors.pincode = { status: true, message: 'Valid 6-digit pincode is required' };
        isValid = false;
    }

    // Date of Birth validation
    if (!userData.dob) {
        newErrors.dob = { status: true, message: 'Date of Birth is required' };
        isValid = false;
    }

    // Gender validation
    if (!userData.gender) {
        newErrors.gender = { status: true, message: 'Gender is required' };
        isValid = false;
    }

    // Image validation
    if (!userData.image) {
        Alert.alert('Image Required', 'Please upload a profile image');
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
}


export function validateHospitalDetails(hospitalDetails) {
    const errors = {};

    // General details
    if (!hospitalDetails.hospitalLegalName) errors.hospitalLegalName = "Hospital legal name is required";
    if (!hospitalDetails.hospitalTradeName) errors.hospitalTradeName = "Hospital trade name is required";
    if (!hospitalDetails.licenseNumber) errors.licenseNumber = "License number is required";
    if (!hospitalDetails.hospitalLicense) errors.hospitalLicense = "Hospital license upload is required";
    if (!hospitalDetails.hospitalNumber) errors.hospitalNumber = "Contact number is required";

    // Contact Address
    if (!hospitalDetails.address.street) errors.street = "Street is required";
    if (!hospitalDetails.address.city) errors.city = "City is required";
    if (!hospitalDetails.address.state) errors.state = "State is required";
    if (!hospitalDetails.address.country) errors.country = "Country is required";
    if (!hospitalDetails.address.landmark) errors.landmark = "Landmark is required";
    if (!hospitalDetails.address.code) errors.code = "Postal code is required";

    // Services
    if (!hospitalDetails.typeOfHospital) errors.typeOfHospital = "Hospital type is required";
    if (!hospitalDetails.from) errors.from = "Opening time is required";
    if (!hospitalDetails.to) errors.to = "Closing time is required";
    if (!hospitalDetails.daysAvailabilty.some(day => day)) errors.daysAvailabilty = "At least one day of availability is required";
    if (!hospitalDetails.servicesOffered || hospitalDetails.servicesOffered.length === 0) errors.servicesOffered = "At least one service is required";

    // Owner Details
    if (!hospitalDetails.hospitalOwnerFullName) errors.hospitalOwnerFullName = "Owner's full name is required";
    if (!hospitalDetails.hospitalOwnerContactNumber) errors.hospitalOwnerContactNumber = "Owner's contact number is required";
    if (!hospitalDetails.hospitalOwnerEmail) errors.hospitalOwnerEmail = "Owner's email is required";

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}