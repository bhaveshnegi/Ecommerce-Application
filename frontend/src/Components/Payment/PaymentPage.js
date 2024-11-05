import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./payment.css"

const PaymentPage = ({ totalAmount }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPaymentStatus('');
    
        // Validate inputs
        if (!validateInputs()) {
            setLoading(false);
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4000/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cardNumber, expiryDate, cvv, amount: totalAmount })
            });
            const data = await response.json();
            setPaymentStatus(data.message);
    
            if (data.success) {
                setTimeout(() => navigate('/success'), 2000); // Redirect to success page
            } else {
                setTimeout(() => navigate('/failure'), 2000); // Redirect to failure page
            }
        } catch (error) {
            setPaymentStatus('Payment failed. Try again.');
        } finally {
            setLoading(false);
        }
    };
    

    const validateInputs = () => {
        if (cardNumber.length < 16) {
            setPaymentStatus('Invalid card number');
            return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            setPaymentStatus('Invalid expiry date (MM/YY)');
            return false;
        }
        if (cvv.length < 3) {
            setPaymentStatus('Invalid CVV');
            return false;
        }
        return true;
    };

    return (
        <div className="payment-page">
            <div className="payment-form-container">
                <h2>Payment Page</h2>
                <form onSubmit={handlePayment}>
                    <div>
                        <label>Card Number:</label>
                        <input 
                            type="text" 
                            value={cardNumber} 
                            onChange={(e) => setCardNumber(e.target.value)} 
                            required 
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>
                    <div>
                        <label>Expiry Date:</label>
                        <input 
                            type="text" 
                            value={expiryDate} 
                            onChange={(e) => setExpiryDate(e.target.value)} 
                            required 
                            placeholder="MM/YY"
                        />
                    </div>
                    <div>
                        <label>CVV:</label>
                        <input 
                            type="text" 
                            value={cvv} 
                            onChange={(e) => setCvv(e.target.value)} 
                            required 
                            placeholder="123"
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : `Pay $${totalAmount}`}
                    </button>
                </form>
                {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
            </div>
        </div>
    );
};

export default PaymentPage;
