import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecur from '../../../../hooks/useAxiosSecur';
import useCarts from '../../../../hooks/useCarts';
import useAuthContext from '../../../../hooks/useAuthContext';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecur();
    const [cart, refetch] = useCarts();
    console.log(cart)
    const { user } = useAuthContext();

    const [clientSecret, setClientSecret] = useState('');
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        address: '',
        phone: '',
    });

    // Calculate total price
    const price = cart.reduce((total, item) => total + item.price, 0);

    // Create payment intent when price > 0
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log('Client Secret:', res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error('Payment Intent Error:', error);
                });
        }
    }, [axiosSecure, price]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);
        setCardError('');
        setSuccess('');

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                category : cart.category,
                address: { line1: formData.address },
            },
        });

        if (error) {
            console.log('[Payment Error]', error);
            setCardError(error.message);
            setProcessing(false);
            return;
        }

        console.log('[PaymentMethod]', paymentMethod);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || formData.name,
                        email: user?.email || formData.email,
                    },
                },
            }
        );

        if (confirmError) {
            console.log('[Confirm Error]', confirmError);
            setCardError(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                console.log('[PaymentIntent]', paymentIntent);
                setSuccess('✅ Payment successful!');
                // Optional: save payment info to database
                const payment = {
                    email : user.email,
                    name : user.displayName,
                    userImage : user.image,
                    address : formData.address,
                    category : cart.category,
                    phone : formData.phone,
                    price : price,
                    date : new Date(),
                    transactionId : paymentIntent.id,
                    cardIds : cart.map(item => item._id),
                    productIds : cart.map(item => item.productId)
                }
               const res = axiosSecure.post('/payments', payment);
               refetch()
            };


        }

        setProcessing(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Complete Your Payment</h2>

                
                <input
                    type="text"
                    name="address"
                    placeholder="Billing Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded"
                />

                <div className="p-3 border rounded">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {processing ? 'Processing...' : `Pay $${price}`}
                </button>

                {cardError && <p className="text-red-500 text-sm text-center">{cardError}</p>}
                {success && <p className="text-green-500 text-sm text-center">{success}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
