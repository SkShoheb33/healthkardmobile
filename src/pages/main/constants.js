export const intialUserRegisterForm = {
    name: '',
    email: '',
    password: '',
    number: ''
}

export const errorsMessages = {
    name: {
        status: false,
        message: 'Please enter the name first'
    },
    email: {
        status: false,
        message: 'Email id already exist',
    },
    otp: {
        status: false,
        message: 'Enter correct otp',
    },
    number: {
        status: false,
        message: 'Please enter valid'
    }
}