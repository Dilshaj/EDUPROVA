import React from "react";
import { Tag, ArrowRight } from "lucide-react";

interface OrderSummaryProps {
    itemCount: number;
    originalPrice: number;
    discount: number;
    totalPrice: number;
}

export function OrderSummary({
    itemCount,
    originalPrice,
    discount,
    totalPrice,
}: OrderSummaryProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="mb-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Tag size={16} />
                    Apply Coupon
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter Code"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button className="bg-gray-200 text-gray-600 text-xs font-bold px-4 rounded hover:bg-gray-300 transition-colors">
                        APPLY
                    </button>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price ({itemCount} items)</span>
                    <span className="font-medium text-gray-900">₹{originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-medium">Discount</span>
                    <span className="text-green-600 font-medium">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-gray-900">Total</span>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</div>
                        <div className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded inline-block mt-1">
                            You save {Math.round((discount / originalPrice) * 100)}%
                        </div>
                    </div>
                </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors mb-3">
                Proceed to Checkout
                <ArrowRight size={18} />
            </button>

            <p className="text-xs text-center text-gray-400">
                30-Day Money-Back Guarantee
            </p>
        </div>
    );
}
