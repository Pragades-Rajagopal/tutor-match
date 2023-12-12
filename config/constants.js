module.exports = {
    otpMessages: {
        generated: 'OTP generated',
        generateError: 'Error while generating OTP',
        validated: 'OTP validated',
        notValidated: 'OTP not validated',
        error: 'Error while validating OTP',
        notFound: 'Email not found',
        verified: 'Status updated after email verification',
        verifyError: 'Error while updating status after email verification'
    },
    email: {
        verificationSubject: 'Tutoree - Email verification',
        messages: {
            sent: 'Email triggered successfully',
            triggerError: 'Error occured while triggering the email'
        }
    },
    statusCode: {
        success: 200,
        error: 400,
        unauthorized: 401,
        notFound: 404,
        serverError: 500
    },
    loginService: {
        hash: {
            success: 'Password hashed',
            error: 'Error while hashing the password'
        },
        verification: {
            success: 'Password verified',
            error: 'Error while verifying the password'
        }
    },
    user: {
        notRegistered: 'User not registered or OTP not verified',
        incorrectAuth: 'Please enter the correct password'
    }
}