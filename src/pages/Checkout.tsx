import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Address, Order } from '../types';

const Checkout: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const subtotal = state.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 499 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      alert('Please fill all address fields');
      return;
    }

    const address: Address = {
      id: Date.now(),
      name: newAddress.name,
      phone: newAddress.phone,
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      zipCode: newAddress.zipCode,
      isDefault: (state.user?.addresses.length || 0) === 0
    };

    // Update user with new address (in real app, this would be API call)
    const updatedUser = {
      ...state.user!,
      addresses: [...(state.user?.addresses || []), address]
    };
    dispatch({ type: 'SET_USER', payload: updatedUser });
    setSelectedAddress(address);
    setNewAddress({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: ''
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    const order: Order = {
      id: Date.now(),
      userId: state.user!.id,
      items: state.cartItems,
      total,
      status: 'confirmed',
      address: selectedAddress,
      orderDate: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    navigate('/order-success', { state: { orderId: order.id } });
  };

  const steps = [
    { id: 1, name: 'Address', icon: MapPin },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: CheckCircle }
  ];

  if (state.cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span
                className={`ml-2 font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-px mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Address</h2>
              
              {/* Existing Addresses */}
              {state.user?.addresses && state.user.addresses.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Select Address</h3>
                  <div className="space-y-3">
                    {state.user.addresses.map((address) => (
                      <label key={address.id} className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddress?.id === address.id}
                          onChange={() => setSelectedAddress(address)}
                          className="mt-1"
                        />
                        <div className="flex-1 p-4 border border-gray-200 rounded-lg">
                          <div className="font-medium text-gray-900">{address.name}</div>
                          <div className="text-gray-600">{address.phone}</div>
                          <div className="text-gray-600">
                            {address.street}, {address.city}, {address.state} {address.zipCode}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleAddAddress}
                  className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Add Address
                </button>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedAddress}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Credit/Debit Card</div>
                    <div className="text-gray-600 text-sm">Pay securely with your card</div>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-3">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">UPI</div>
                    <div className="text-gray-600 text-sm">Pay using UPI apps</div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Cash on Delivery</div>
                    <div className="text-gray-600 text-sm">Pay when you receive your order</div>
                  </div>
                </label>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
              
              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Delivery Address</h3>
                {selectedAddress && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">{selectedAddress.name}</div>
                    <div className="text-gray-600">{selectedAddress.phone}</div>
                    <div className="text-gray-600">
                      {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium">
                    {paymentMethod === 'card' && 'Credit/Debit Card'}
                    {paymentMethod === 'upi' && 'UPI'}
                    {paymentMethod === 'cod' && 'Cash on Delivery'}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                <div className="space-y-3">
                  {state.cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({state.cartItems.length} items)</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹{tax.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-2 text-green-600">
              <Truck className="w-5 h-5" />
              <span className="text-sm">Expected delivery in 5-7 business days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;