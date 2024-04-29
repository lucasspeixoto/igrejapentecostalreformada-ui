import UserFormDataContextProviders from '../cadastro/providers/UserFormDataContextProviders';

const PerfilLayout = ({ children }: { children: React.ReactNode }) => {
  return <UserFormDataContextProviders>{children}</UserFormDataContextProviders>;
};

export default PerfilLayout;
