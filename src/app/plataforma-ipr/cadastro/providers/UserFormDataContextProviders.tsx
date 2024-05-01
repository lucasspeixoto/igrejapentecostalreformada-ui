import { SupplementaryContextProvider } from '../complementar/providers/SupplementaryContextProvider';
import { EcclesiasticalContextProvider } from '../eclesiastico/providers/EcclesiasticalContextProvider';
import { PersonalContextProvider } from '../pessoal/providers/PersonalContextProvider';

const UserFormDataContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersonalContextProvider>
      <SupplementaryContextProvider>
        <EcclesiasticalContextProvider>{children}</EcclesiasticalContextProvider>
      </SupplementaryContextProvider>
    </PersonalContextProvider>
  );
};

export default UserFormDataContextProviders;
