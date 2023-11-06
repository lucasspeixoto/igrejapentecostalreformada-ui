import type { Metadata } from 'next';

import { useAuthContext } from '@/providers/AuthContextProvider';

import UserDetail from './profile/UserDetail';

export const metadata: Metadata = {
  title: 'Igreja Pentecostal reformada',
  description: 'Cadastro',
};

export default function Membros() {
  const useAuth = useAuthContext()!;

  return <>{useAuth.isAuthenticated ? <UserDetail /> : null}</>;
}
