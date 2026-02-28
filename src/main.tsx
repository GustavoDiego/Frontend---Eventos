import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { router } from './app/router';
import { AuthProvider } from './app/providers/AuthProvider';
import './styles/globals.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'font-ui text-sm font-bold border-2 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] rounded-none',
            style: {
              background: '#FAF6EF',
              color: '#1A1A1A',
              padding: '16px',
            },
            success: {
              className: 'font-ui text-sm font-bold border-2 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] rounded-none',
              style: {
                background: '#B8F400',
                color: '#1A1A1A',
              },
              iconTheme: {
                primary: '#1A1A1A',
                secondary: '#B8F400',
              },
            },
            error: {
              className: 'font-ui text-sm font-bold border-2 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] rounded-none',
              style: {
                background: '#FF4D3D',
                color: '#FAF6EF',
              },
              iconTheme: {
                primary: '#FAF6EF',
                secondary: '#FF4D3D',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
