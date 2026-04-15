'use client';

import { useEffect, useState } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Toast({ message, isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-10 right-10 z-[300] animate-fade-in">
            <div className="bg-white border border-gray-100 px-6 py-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12)] flex items-center gap-5 min-w-[350px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-600" />
                <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                    <CheckCircleIcon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] mb-1">Store Notification</p>
                    <p className="text-sm font-bold text-gray-900 tracking-tight leading-snug">{message}</p>
                </div>
                <button onClick={onClose} className="p-2.5 hover:bg-gray-50 rounded-xl transition-all text-gray-300 hover:text-orange-600 cursor-pointer">
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
