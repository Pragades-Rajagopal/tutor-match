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
        },
        resetPassword: {
            success: 'Password reset successful',
            error: 'Error occurred while resetting password'
        }
    },
    user: {
        notRegistered: 'User not registered or OTP not verified',
        incorrectAuth: 'Please enter the correct password',
        registered: 'User registered and OTP sent to your email address'
    },
    student: {
        interestAdded: 'Interests added',
        addInterestError: 'Error while adding interests for the student',
        addIntrstCheckError: 'Either the user is not a student or not yet activated as student',
        interestNotFound: 'Interests not found for the student',
        getInterest: 'Interests found',
        fetchTutorListSuccess: 'Tutor list based on student interest',
        fetchTutorListError: 'Error while fetching tutor list'
    },
    tutor: {
        profileAdded: 'Profile added',
        addInterestError: 'Error while adding profile for the tutor',
        addIntrstCheckError: 'Either the user is not a tutor or not yet activated as tutor',
        interestNotFound: 'Interests not found for the tutor',
        getInterest: 'Interests found'
    }
}