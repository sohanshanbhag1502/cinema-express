"use client"

import { SnackbarProvider } from 'notistack';

export default function Body({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{vertical:"top", horizontal:"center"}}>
            {children}
        </SnackbarProvider>
    );
}