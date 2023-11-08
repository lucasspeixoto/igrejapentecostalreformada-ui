'use client';

/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react';
import { FiCamera } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Image from '@/components/Image';
import { storage } from '@/lib/firebase/config';
import addData from '@/lib/firebase/firestore/addData';
import firebaseMessages from '@/lib/firebase/messages';
import { useAuthContext } from '@/providers/AuthContextProvider';
import { useAuthUserDataContext } from '@/providers/AuthUserDataContextProvider';
import type { UserAuth } from '@/types/user-auth';

const UserDetail: React.FC = () => {
  const userProfileContext = useAuthUserDataContext()!;

  const authContext = useAuthContext()!;

  const [loadPhotoProgress, setLoadPhotoProgress] = React.useState(0);

  const [isLoadingUploadPhoto, setIsLoadingUploadPhoto] = React.useState(false);

  React.useEffect(() => {
    toast.warn('Graça e paz 🙏 Mantenha o seu cadastro atualizado.');
  }, []);

  const hasPhotoUploaded = !!userProfileContext.authData?.photoUrl;

  const setPhotoUrlInAuthUserData = async (downloadURL: string) => {
    const { authData } = userProfileContext;

    const userAuthCollection = {
      ...authData,
      photoUrl: downloadURL,
    } as UserAuth;

    const { error } = await addData('users', authContext.user?.uid!, {
      auth: userAuthCollection,
    });

    if (error) {
      toast.error(
        'Error ao salvar foto. Tente novamente mais tarde ou contate admim.'
      );
    } else {
      setIsLoadingUploadPhoto(false);
      toast.success('Foto atualizada com sucesso!');
    }

    userProfileContext.setUpdatedAuthData(userAuthCollection);
  };

  const uploadPhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files) {
      return;
    }

    setIsLoadingUploadPhoto(true);

    const file = event.target.files[0];

    const storageRef = ref(
      storage,
      `photos/${userProfileContext.authData?.userId}.jpg`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoadPhotoProgress(progress);
      },
      error => {
        toast.error(firebaseMessages[error.code]);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setPhotoUrlInAuthUserData(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <div className=" px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        {isLoadingUploadPhoto ? (
          <div className="relative z-30 mx-auto -mt-22 flex h-30 w-full max-w-30 items-center justify-center rounded-full border-2 border-primary bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative flex flex-col items-center justify-center gap-2 drop-shadow-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
              <span className="font-bold">
                {loadPhotoProgress.toFixed(2)} %
              </span>
            </div>
          </div>
        ) : (
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 backdrop-blur sm:h-44 sm:max-w-44">
            <div className="flex items-center justify-center ">
              <>
                {hasPhotoUploaded ? (
                  <Image
                    width={160}
                    height={160}
                    className="h-30 w-full max-w-30 rounded-full sm:h-44 sm:max-w-44 sm:p-3"
                    src={userProfileContext.authData?.photoUrl!}
                    alt="User"
                  />
                ) : (
                  <Image
                    width={160}
                    height={160}
                    className="h-30 w-full max-w-30 rounded-full sm:h-44 sm:max-w-44 sm:p-3"
                    src={'/images/user/dummy-user.png'}
                    alt="User"
                  />
                )}

                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
                  <FiCamera size={16} />
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                    onChange={uploadPhotoHandler}
                  />
                </label>
              </>
            </div>
          </div>
        )}
        <div className="mt-4">
          <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
            {userProfileContext.authData?.name}
          </h3>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
