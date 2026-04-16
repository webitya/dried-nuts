'use client';

import { useState, useEffect } from 'react';
import {
    ShoppingBag,
    Eye,
    CheckCircle2,
    XCircle,
    Trash2,
    Clock,
    User,
    Mail,
    Phone,
    Building2,
    MessageSquare,
    Package,
    Check,
    X
} from 'lucide-react';

export default function AdminBulkOrders() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [actionType, setActionType] = useState(''); // 'Accept' or 'Reject'
    const [adminThought, setAdminThought] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const res = await fetch('/api/admin/bulk-orders');
            const json = await res.json();
            if (json.success) {
                setEnquiries(json.data);
            }
        } catch (error) {
            console.error('Failed to fetch enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewEnquiry = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setShowModal(true);
    };

    const openActionModal = (enquiry, type) => {
        setSelectedEnquiry(enquiry);
        setActionType(type);
        setAdminThought(enquiry.adminThought || '');
        setShowActionModal(true);
    };

    const handleUpdateStatus = async () => {
        if (!selectedEnquiry) return;
        setUpdating(true);
        const newStatus = actionType === 'Accept' ? 'Accepted' : 'Rejected';
        
        try {
            const res = await fetch(`/api/admin/bulk-orders/${selectedEnquiry._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    status: newStatus,
                    adminThought: adminThought
                }),
            });

            const json = await res.json();
            if (json.success) {
                setEnquiries(prev => prev.map(e => e._id === selectedEnquiry._id ? json.data : e));
                setShowActionModal(false);
                if (showModal) setShowModal(false);
            } else {
                alert(`Failed: ${json.message}`);
            }
        } catch (error) {
            console.error('Update failed:', error);
            alert('An error occurred');
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this enquiry?')) return;
        
        try {
            const res = await fetch(`/api/admin/bulk-orders/${id}`, {
                method: 'DELETE',
            });
            const json = await res.json();
            if (json.success) {
                setEnquiries(prev => prev.filter(e => e._id !== id));
            } else {
                alert(`Failed: ${json.message}`);
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-black border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Bulk Order Enquiries</h1>
                    <p className="text-sm text-gray-400 mt-0.5 font-medium">Manage B2B and wholesale requests</p>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Customer</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Interest</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {enquiries.length > 0 ? (
                                enquiries.map((enquiry) => (
                                    <tr key={enquiry._id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-medium">
                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">{enquiry.name}</div>
                                            <div className="text-xs text-gray-500 font-medium">{enquiry.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider">{enquiry.product}</div>
                                            <div className="text-[10px] text-gray-400 font-medium">Qty: {enquiry.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-md border ${
                                                enquiry.status === 'Accepted' ? 'bg-green-100 text-green-700 border-green-200' :
                                                enquiry.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' :
                                                'bg-yellow-100 text-yellow-700 border-yellow-200'
                                            }`}>
                                                {enquiry.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleViewEnquiry(enquiry)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all" title="View Details">
                                                    <Eye size={18} />
                                                </button>
                                                <button onClick={() => openActionModal(enquiry, 'Accept')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Accept">
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button onClick={() => openActionModal(enquiry, 'Reject')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Reject">
                                                    <XCircle size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(enquiry._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500 text-sm font-medium">No enquiries found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {showModal && selectedEnquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Enquiry Details</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full"><X size={20} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <User className="text-gray-400 shrink-0" size={18} />
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Contact Name</p>
                                            <p className="text-sm font-semibold text-gray-900">{selectedEnquiry.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="text-gray-400 shrink-0" size={18} />
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Email</p>
                                            <p className="text-sm font-semibold text-gray-900">{selectedEnquiry.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="text-gray-400 shrink-0" size={18} />
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Phone</p>
                                            <p className="text-sm font-semibold text-gray-900">{selectedEnquiry.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="text-gray-400 shrink-0" size={18} />
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Company</p>
                                            <p className="text-sm font-semibold text-gray-900">{selectedEnquiry.company || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Package className="text-gray-400 shrink-0" size={18} />
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Interest & Qty</p>
                                            <p className="text-sm font-semibold text-gray-900 uppercase">{selectedEnquiry.product}</p>
                                            <p className="text-xs text-gray-500 font-medium">{selectedEnquiry.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-2 mb-3 text-gray-400">
                                    <MessageSquare size={14} />
                                    <h3 className="text-[10px] font-semibold uppercase tracking-widest">Requirement Message</h3>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">{selectedEnquiry.message || 'No message provided.'}</p>
                            </div>

                            {selectedEnquiry.adminThought && (
                                <div className={`p-6 rounded-xl border ${selectedEnquiry.status === 'Accepted' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle2 size={14} className={selectedEnquiry.status === 'Accepted' ? 'text-green-600' : 'text-red-600'} />
                                        <h3 className="text-[10px] font-semibold uppercase tracking-widest">Admin Conclusion</h3>
                                    </div>
                                    <p className="text-sm text-gray-800 italic font-medium">"{selectedEnquiry.adminThought}"</p>
                                </div>
                            )}

                            <div className="pt-4 flex gap-4">
                                <button onClick={() => openActionModal(selectedEnquiry, 'Accept')} className="flex-1 py-4 bg-green-600 text-white rounded-xl text-xs font-semibold hover:bg-green-700 transition-colors uppercase tracking-[0.2em] shadow-lg shadow-green-600/10">Accept Request</button>
                                <button onClick={() => openActionModal(selectedEnquiry, 'Reject')} className="flex-1 py-4 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition-colors uppercase tracking-[0.2em] shadow-lg shadow-red-600/10">Reject Request</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Modal (Accept/Reject with Taught) */}
            {showActionModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={`text-xl font-semibold ${actionType === 'Accept' ? 'text-green-600' : 'text-red-600'}`}>
                                {actionType} Enquiry
                            </h2>
                            <button onClick={() => setShowActionModal(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50"><X size={20} /></button>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Conclusion Message</label>
                                <p className="text-xs text-gray-500 font-medium">Why are you {actionType.toLowerCase()}ing this enquiry?</p>
                            </div>
                            <textarea
                                value={adminThought}
                                onChange={(e) => setAdminThought(e.target.value)}
                                placeholder="Write your professional response here..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm font-medium focus:bg-white focus:border-orange-500 outline-none transition-all min-h-[140px] resize-none leading-relaxed"
                            />
                            
                            <div className="flex gap-4 pt-4">
                                <button 
                                    onClick={() => setShowActionModal(false)}
                                    className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors uppercase tracking-[0.2em]"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleUpdateStatus}
                                    disabled={updating || !adminThought.trim()}
                                    className={`flex-1 py-4 text-white rounded-xl text-xs font-semibold transition-all uppercase tracking-[0.2em] disabled:opacity-50 shadow-xl ${
                                        actionType === 'Accept' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/10' : 'bg-red-600 hover:bg-red-700 shadow-red-600/10'
                                    }`}
                                >
                                    {updating ? 'Saving...' : `Confirm ${actionType}`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
