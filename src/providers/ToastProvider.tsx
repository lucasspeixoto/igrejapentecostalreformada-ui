'use client';

import 'react-toastify/dist/ReactToastify.css';

import type { ReactNode } from 'react';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
