"use client";
import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import { useRouter } from 'next/navigation';

export function Modal() {
    const { modalType, modalMessage, hideModal } = useModal();
    const router = useRouter();
    if (!modalType) return null;

    return (
        <div data-testid="modal" className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={hideModal}></div>
            <div className="bg-white rounded-lg p-6 z-10 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-medium ${modalType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {modalType === 'success' ? 'Success' : 'Error'}
                    </h3>
                    <button
                        onClick={hideModal}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <p className="text-gray-700">{modalMessage}</p>
                <div className="mt-6 flex justify-end">
                    {
                        modalType === 'success' && (
                            <button
                                onClick={() => {
                                    hideModal();
                                    router.push('/');
                                }}
                                className="mr-4 px-4 py-2 rounded bg-primary-orange hover:bg-orange-600 text-white"
                            >
                                HomePage
                            </button>
                        )
                    }
                    <button
                        onClick={hideModal}
                        className={`px-4 py-2 rounded ${modalType === 'success'
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-red-600 hover:bg-red-700'
                            } text-white`}
                    >
                        Close
                    </button>

                </div>
            </div>
        </div>
    );
}