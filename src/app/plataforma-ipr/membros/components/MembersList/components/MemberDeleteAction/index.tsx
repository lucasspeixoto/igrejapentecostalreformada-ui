import deleteData from '@fire/firestore/deleteData';
import deletePhoto from '@fire/firestore/deletePhoto';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';

import ConfirmModal from '@/components/ConfirmModal';
import { useAuthContext } from '@/providers/AuthContextProvider';

const DELETE_MODAL_TITLE = 'Deletar membro';

const DELETE_MODAL_SUBTITLE =
  'Deseja realmente deletar este usuário ? A exclusão remove todos os dados ja cadastrados.';
const DELETE_MODAL_CANCEL_TITLE = 'Cancelar';
const DELETE_MODAL_CONFIRM_TITLE = 'Confirmar';

type MemberDeleteActionProps = {
  userId: string;
};

const MemberDeleteAction: React.FC<MemberDeleteActionProps> = ({ userId }) => {
  const [showDeleteUserModal, setShowDeleteUserModal] = React.useState(false);

  const userContext = useAuthContext();

  const deleteUserHandler = () => {
    setShowDeleteUserModal(true);
  };

  const onCancelDeleteUser = () => {
    setShowDeleteUserModal(false);
  };

  const onConfirmDeleteUser = async () => {
    userContext.updateIsLoadingData(true);

    setShowDeleteUserModal(false);

    const { error: deleteUserDataError } = await deleteData('users', userId!);

    const { error: deletePhotoError } = await deletePhoto('photos', userId!);

    if (deleteUserDataError || deletePhotoError) {
      toast.error('Error ao excluir dados de membro. Tente novamente mais tarde ou contate admim.');
    } else {
      toast.success('Dados de membros excluídos com sucesso!');
    }

    userContext.updateIsLoadingData(false);
  };

  return (
    <>
      <>
        <>
          {showDeleteUserModal ? (
            <ConfirmModal
              title={DELETE_MODAL_TITLE}
              subtitle={DELETE_MODAL_SUBTITLE}
              cancelTitle={DELETE_MODAL_CANCEL_TITLE}
              confirmTitle={DELETE_MODAL_CONFIRM_TITLE}
              onCancel={onCancelDeleteUser}
              onConfirm={onConfirmDeleteUser}
            />
          ) : null}
        </>
      </>
      <button className="hover:text-meta-7" onClick={() => deleteUserHandler()}>
        <BiTrash size={20} />
      </button>
    </>
  );
};

export default MemberDeleteAction;
