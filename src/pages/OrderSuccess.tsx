import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Details</h2>
            <p className="text-gray-600">Order ID: <span className="font-medium">#{orderId}</span></p>
            <p className="text-gray-600">Expected delivery: 5-7 business days</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Order Confirmed</h3>
            <p className="text-sm text-gray-600">Your order has been received and is being prepared</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Truck className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Shipping Soon</h3>
            <p className="text-sm text-gray-600">We'll notify you when your order ships</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Home className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Delivered</h3>
            <p className="text-sm text-gray-600">Enjoy your new purchase!</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/profile"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Package className="w-5 h-5 mr-2" />
            Track Order
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;