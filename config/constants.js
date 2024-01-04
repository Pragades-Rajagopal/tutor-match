module.exports = {
    otpMessages: {
        generated: 'OTP generated',
        generateError: 'Error while generating OTP',
        validated: 'OTP validated',
        notValidated: 'OTP not validated',
        error: 'Error while validating OTP',
        notFound: 'Email not found',
        verified: 'Status updated after email verification',
        verifyError: 'Error while updating status after email verification',
        otpSent: 'OTP sent to your registered email address',
        otpSentError: 'Error while resending OTP'
    },
    emailTemplates: {
        otp: 'otp',
        tutorRequest: 'tutor-request',
    },
    email: {
        verificationSubject: 'Tutoree - Email verification',
        resentOTPsubject: 'Tutoree - OTP request',
        messages: {
            sent: 'Email triggered successfully',
            triggerError: 'Error occured while triggering the email'
        },
        studentRequest: 'Tutoree - Student Request'
    },
    emailType: {
        register: 'register',
        resendOtp: 'otp'
    },
    statusCode: {
        success: 200,
        error: 400,
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        serverError: 500
    },
    authenticationMessage: {
        tokenMissing: 'Please send auth token in request header',
        invalidToken: 'Invalid token! Cannot authenticate at this moment'
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
        registered: 'User registered and OTP sent to your email address',
        userLoginNotFound: 'User have not logged in. Cannot logout now',
        userlogoutSuccess: 'User logged out successfully',
        userlogoutError: 'Error while logging out'
    },
    student: {
        interestAdded: 'Interests added',
        addInterestError: 'Error while adding interests for the student',
        addIntrstCheckError: 'Either the user is not a student or not yet activated as student',
        interestNotFound: 'Interests not found for the student',
        getInterest: 'Interests found',
        fetchTutorListSuccess: 'Tutor list based on student interest',
        fetchTutorListError: 'Error while fetching tutor list',
        infoNotFound: 'Either Student or Tutor information not found',
        sendRequestError: 'Unable to send request at this moment',
        sendRequestSuccess: 'Request sent successfully',
        requestExists: 'Request has already been sent'
    },
    tutor: {
        profileAdded: 'Profile added',
        addInterestError: 'Error while adding profile for the tutor',
        addIntrstCheckError: 'Either the user is not a tutor or not yet activated as tutor',
        interestNotFound: 'Interests not found for the tutor',
        getInterest: 'Interests found',
        requestsNotFound: 'Requests not available for this tutor',
        requestsFound: 'Requests for the tutor'
    },
    feeds: {
        feedAdded: 'Feed added',
        addFeedError: 'Error adding feed',
        getFeeds: 'Feeds found',
        getFeedsError: 'Error while retrieving feeds',
        deleteFeed: 'Feed deleted successfully',
        deleteFeedError: 'Error while deleting feed'
    }
}