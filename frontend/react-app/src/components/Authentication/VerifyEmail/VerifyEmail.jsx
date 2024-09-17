import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { checkEmailVerification } from './VerifyEmail';
import './VerifyEmail.css';

export default function VerifyEmail() {
    const [loading, setLoading] = useState(true);
    const [queryParameters] = useSearchParams();
    const token = queryParameters.get("token");
    const [verificationStatus, setVerificationStatus] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        checkEmailVerification(token, setLoading, setError, setVerificationStatus);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error}</div>;
    }

      return (
        <div className="verification-container">
          <div className="verification-content">
            <h1>Email Verified!</h1>
            <p>Thank you for verifying your email. Your account is now fully activated and you can start using all of our services.</p>
            <a href="/authentication" className="login-button">Go to Login</a>
          </div>
        </div>
      );
}
