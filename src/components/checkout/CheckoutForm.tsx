import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DeliveryOptions from './DeliveryOptions';
import PaymentOptions from './PaymentOptions';
import CustomerDetails from './CustomerDetails';
import OrderSummary from './OrderSummary';
import CardPaymentForm from './CardPaymentForm';
import { useCart } from '../../context/CartContext';
import { processCardPayment } from '../../services/payment';
import { createOrder } from '../../services/orders';

export default function CheckoutForm() {
  const { state, dispatch } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      deliveryType: 'delivery',
      paymentMethod: 'card'
    }
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      
      let transactionId;
      if (data.paymentMethod === 'card') {
        const paymentResult = await processCardPayment(state.total, {
          cardNumber: data.cardNumber,
          expiryDate: data.expiryDate,
          cvv: data.cvv
        });
        
        if (!paymentResult.success) {
          throw new Error(paymentResult.error || 'Payment failed');
        }
        
        transactionId = paymentResult.transactionId;
      }
      
      const order = await createOrder({
        items: state.items,
        total: state.total,
        paymentMethod: data.paymentMethod,
        deliveryType: data.deliveryType,
        transactionId,
        address: data.deliveryType === 'delivery' ? {
          street: data.street,
          city: data.city,
          postalCode: data.postalCode,
          instructions: data.instructions
        } : undefined
      });
      
      // Clear cart after successful order
      dispatch({ type: 'CLEAR_CART' });
      
      // Redirect to success page or show success message
      alert('Commande confirmée !');
      
    } catch (error) {
      alert('Une erreur est survenue: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <CustomerDetails register={register} errors={errors} />
          <DeliveryOptions register={register} />
          <PaymentOptions register={register} />
          {paymentMethod === 'card' && (
            <CardPaymentForm register={register} errors={errors} />
          )}
        </div>
        <OrderSummary />
      </div>
      
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full mt-8 bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Traitement en cours...' : 'Confirmer la commande'}
      </button>
    </form>
  );
}