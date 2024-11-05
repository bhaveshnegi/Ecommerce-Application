// FailurePage.js
import React from 'react';
import './FailurePage.css';

const FailurePage = () => {
    return (
        <div className="failure-container">
            <h1 className="failure-header">Payment Failed!</h1>
            <p className="failure-message">We encountered an issue processing your payment. Please try again.</p>
            <button className="retry-payment-button" onClick={() => window.location.href = '/payment'}>Retry Payment</button>
        </div>
    );
};

export default FailurePage;
