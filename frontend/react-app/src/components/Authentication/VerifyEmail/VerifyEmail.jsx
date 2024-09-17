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
        <div className="email-verification-message">
            {verificationStatus.message}
        </div>

    );
}
