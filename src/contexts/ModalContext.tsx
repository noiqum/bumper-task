"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

type ModalType = 'success' | 'error' | null;

interface ModalContextType {
    modalType: ModalType;
    modalMessage: string;
    showModal: (type: ModalType, message: string) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modalType, setModalType] = useState<ModalType>(null);
    const [modalMessage, setModalMessage] = useState('');

    const showModal = (type: ModalType, message: string) => {
        setModalType(type);
        setModalMessage(message);
    };

    const hideModal = () => {
        setModalType(null);
        setModalMessage('');
    };

    return (
        <ModalContext.Provider value={{ modalType, modalMessage, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}