"use client";

import { Session } from "inspector";
import {SessionProvider, SessionProviderProps} from "next-auth/react";

export const AuthProvider = ({children}: SessionProviderProps) => {
    return (
        <SessionProvider >
            {children}
        </SessionProvider>
    )
}