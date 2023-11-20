import { EcclesiasticalContextProvider } from './EcclesiasticalContextProvider';
import { PersonalContextProvider } from './PersonalContextProvider';
import { SupplementaryContextProvider } from './SupplementaryContextProvider';

const UserFormDataContextProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PersonalContextProvider>
      <SupplementaryContextProvider>
        <EcclesiasticalContextProvider>
          {children}
        </EcclesiasticalContextProvider>
      </SupplementaryContextProvider>
    </PersonalContextProvider>
  );
};

export default UserFormDataContextProviders;
