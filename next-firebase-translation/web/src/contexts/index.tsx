import { ReactNode } from 'react';
import { AuthContextProvider } from './AuthContext';
export function Providers({
  children
}: {
  children: ReactNode
}) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  )
}