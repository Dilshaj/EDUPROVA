"use client"

import React from "react"
import { Plus, Clock } from "lucide-react"
import { toast } from "sonner"

export function BillingSection() {
    const [paymentMethods, setPaymentMethods] = React.useState([
        { id: 1, type: "VISA", last4: "4242", expiry: "12/28", isDefault: true }
    ])
    const [showForm, setShowForm] = React.useState(false)
    const [newCard, setNewCard] = React.useState({
        number: "",
        expiry: "",
        cvv: "",
        holder: ""
    })

    const handleAddNew = () => {
        if (!newCard.number || !newCard.expiry || !newCard.holder) {
            toast.error("Please fill in all card details")
            return
        }

        const cardType = newCard.number.startsWith("4") ? "VISA" : "Mastercard"
        const last4 = newCard.number.slice(-4)

        const method = {
            id: Date.now(),
            type: cardType,
            last4: last4,
            expiry: newCard.expiry,
            isDefault: false
        }

        setPaymentMethods([...paymentMethods, method])
        setShowForm(false)
        setNewCard({ number: "", expiry: "", cvv: "", holder: "" })

        toast.success("Payment method added", {
            description: `${cardType} ending in ${last4} has been successfully added.`
        })
    }

    return (
        <div id="billing" className="w-full animate-in fade-in duration-500 text-left scroll-mt-32">
            <div className="mb-10 pb-8 border-b border-slate-100">
                <h2 className="text-3xl font-semibold text-slate-900 mb-1">Billing & Payments</h2>
                <p className="text-slate-500 text-base">Manage your payment methods and view course transaction history.</p>
            </div>

            <div className="space-y-10">
                {/* Payment Methods */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-xl text-slate-900">Payment Methods</h3>
                        {!showForm && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Add New
                            </button>
                        )}
                    </div>

                    {showForm ? (
                        <div className="bg-slate-50 border border-blue-100 rounded-3xl p-8 mb-6 animate-in zoom-in-95 duration-200 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Number</label>
                                    <input
                                        name="f_cn"
                                        autoComplete="disabled"
                                        placeholder="0000 0000 0000 0000"
                                        value={newCard.number}
                                        onChange={(e) => setNewCard({ ...newCard, number: e.target.value.replace(/\D/g, '').slice(0, 16) })}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Valid Thru</label>
                                    <input
                                        name="f_ce"
                                        autoComplete="disabled"
                                        placeholder="00 / 00"
                                        value={newCard.expiry}
                                        onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value.slice(0, 5) })}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Security Code</label>
                                    <input
                                        name="f_cv"
                                        autoComplete="new-password"
                                        placeholder="123"
                                        type="password"
                                        value={newCard.cvv}
                                        onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cardholder Name</label>
                                    <input
                                        name="f_ch"
                                        autoComplete="disabled"
                                        placeholder="Enter name"
                                        value={newCard.holder}
                                        onChange={(e) => setNewCard({ ...newCard, holder: e.target.value.toUpperCase() })}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={handleAddNew}
                                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all"
                                >
                                    Save Card
                                </button>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-6 h-12 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <div key={method.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between hover:border-blue-100 transition-colors shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center shadow-xs">
                                            <span className={`font-bold italic text-[10px] ${method.type === 'VISA' ? 'text-blue-800' : 'text-orange-600'}`}>
                                                {method.type}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{method.type} ending in {method.last4}</div>
                                            <div className="text-xs text-slate-500 font-medium">Expires {method.expiry}</div>
                                        </div>
                                    </div>
                                    {method.isDefault && (
                                        <div className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                            Default
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Transaction History */}
                <div>
                    <h3 className="font-semibold text-xl text-slate-900 mb-6 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500" />
                        Course Transaction History
                    </h3>

                    <div className="rounded-2xl border border-border overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { course: "Advanced React Patterns", date: "Oct 24, 2024", status: "Paid" },
                                    { course: "System Design Mastery", date: "Sep 12, 2024", status: "Paid" }
                                ].map((item, i) => (
                                    <tr key={i} className="bg-white hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-700">{item.course}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-500">{item.date}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-500">-</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 round-md bg-green-50 text-green-700 text-xs font-bold rounded">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Download</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
