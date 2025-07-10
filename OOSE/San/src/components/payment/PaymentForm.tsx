import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

interface PaymentFormProps {
  amount: number;
  onPaymentComplete: (paymentId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onPaymentComplete }) => {
  const { addToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    if (!expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = 'Invalid expiry date (MM/YY)';
    }
    
    if (!cvc.trim()) {
      newErrors.cvc = 'CVC is required';
    } else if (!/^\d{3,4}$/.test(cvc)) {
      newErrors.cvc = 'Invalid CVC';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock payment ID
      const paymentId = `pay_${Date.now()}`;
      
      // Show success toast
      addToast('Payment processed successfully!', 'success');
      
      // Call the onPaymentComplete callback with the payment ID
      onPaymentComplete(paymentId);
    } catch (error) {
      addToast('Payment processing failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let formatted = value.replace(/[^\d]/g, '');
    
    if (formatted.length > 2) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
    }
    
    setExpiry(formatted);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <h2 className="text-white text-lg font-semibold">Secure Payment</h2>
        <p className="text-blue-100 text-sm mt-1">Your data is encrypted and secure</p>
      </div>
      
      <div className="p-6">
        {/* Payment Methods */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Select Payment Method</p>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('credit_card')}
              className={`flex flex-col items-center justify-center py-3 px-4 rounded-md border ${
                paymentMethod === 'credit_card'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Credit Card</span>
            </button>
            
            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`flex flex-col items-center justify-center py-3 px-4 rounded-md border ${
                paymentMethod === 'paypal'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg font-bold mb-1">P</span>
              <span className="text-xs font-medium">PayPal</span>
            </button>
            
            <button
              type="button"
              onClick={() => setPaymentMethod('bank_transfer')}
              className={`flex flex-col items-center justify-center py-3 px-4 rounded-md border ${
                paymentMethod === 'bank_transfer'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <DollarSign className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Bank Transfer</span>
            </button>
          </div>
        </div>
        
        {/* Payment Details */}
        <form onSubmit={handleSubmit}>
          {paymentMethod === 'credit_card' && (
            <>
              <Input
                id="cardNumber"
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                error={errors.cardNumber}
              />
              
              <Input
                id="cardName"
                label="Cardholder Name"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                error={errors.cardName}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="expiry"
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                  error={errors.expiry}
                />
                
                <Input
                  id="cvc"
                  label="CVC"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                  maxLength={4}
                  error={errors.cvc}
                />
              </div>
            </>
          )}
          
          {paymentMethod === 'paypal' && (
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">
                You'll be redirected to PayPal to complete your payment.
              </p>
            </div>
          )}
          
          {paymentMethod === 'bank_transfer' && (
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">
                You'll receive payment instructions via email.
              </p>
            </div>
          )}
          
          {/* Payment Summary */}
          <div className="mt-6 bg-gray-50 -mx-6 px-6 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-sm text-gray-900">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Tax</span>
              <span className="text-sm text-gray-900">$0.00</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-base font-semibold text-gray-900">Total</span>
              <span className="text-base font-semibold text-gray-900">${amount.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={isProcessing}
              disabled={isProcessing}
              icon={isProcessing ? undefined : <CheckCircle className="h-5 w-5" />}
            >
              {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-3">
              By proceeding, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;