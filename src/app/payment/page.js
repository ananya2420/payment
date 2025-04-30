'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function PaymentPage() {
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    ccv: '',
  });

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentInfo),
      });

      const data = await res.json();

      if (data.success) {
        alert(`✅ ${data.message}\nTransaction ID: ${data.transactionId}`);
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      alert('❌ Failed to place order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <p className="text-sm mb-4 text-gray-600">Account / My Account / Product / View Cart / Payment</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Payment Form */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Use Saved Card</h2>

          {[
            { label: "Name on Card", name: "cardName", placeholder: "John Doe" },
            { label: "Card Number", name: "cardNumber", placeholder: "**** **** **** 1234" },
            { label: "Expiry Date (MM/YY)", name: "expiry", placeholder: "12/25" },
            { label: "CCV", name: "ccv", placeholder: "123" },
          ].map(({ label, name, placeholder }) => (
            <div key={name} className="mb-4">
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={paymentInfo[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          ))}

          <Image src="/images/bank-icon.png" alt="Card Type" width={80} height={50} />
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex items-center gap-4 mb-4">
              <Image src="/images/summary.png" alt="Product" width={60} height={60} />
              <div>
                <p>Camera</p>
                <p className="text-sm text-gray-600">Qty: 1</p>
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Product Total:</span>
                <span>BDT 5,250</span>
              </div>
              <div className="flex justify-between">
                <span>Discount: 6%</span>
                <span>- BDT 315</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span>
                <span>BDT 5,000</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleOrder}
            className="mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
