// SuccessPage.js
import React from 'react';
import "./sucess.css"

const SuccessPage = () => {
    return (
        <div className="success-container">
            <h1 className="success-header">Payment Successful!</h1>
            <p className="success-message">Thank you for your purchase!</p>
            <div className="order-summary">
                <h2>Order Summary</h2>
                <p><strong>Order Number:</strong> 987654321</p>
                <p><strong>Total Amount:</strong> $49.99</p>
                <p><strong>Payment Method:</strong> Visa (ending in 1234)</p>
                <p><strong>Transaction ID:</strong> ABCD12345678</p>
                <p><strong>Date of Payment:</strong> November 4, 2024</p>
                <p><strong>Customer Name:</strong> John Doe</p>
                <p><strong>Email:</strong> johndoe@example.com</p>
            </div>
            <button className="continue-shopping-button" onClick={() => window.location.href = '/'}>Continue Shopping</button>
        </div>
    );
};

export default SuccessPage;
