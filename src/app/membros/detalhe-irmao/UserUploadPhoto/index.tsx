'use client';

/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react';
import { LuUpload } from 'react-icons/lu';
import { toast } from 'react-toastify';

import Image from '@/components/Image';
import { storage } from '@/lib/firebase/config';
import addData from '@/lib/firebase/firestore/addData';
import firebaseMessages from '@/lib/firebase/messages';
import type { UserAuth } from '@/types/user-auth';

type UserUploadPhotoProps = {
  userId: string;
  name: string;
  photoUrl: string | null;
  onUpdateHasMemberDataUpdated: () => void;
};

const UserUploadPhoto: React.FC<UserUploadPhotoProps> = ({
  userId,
  name,
  photoUrl,
  onUpdateHasMemberDataUpdated,
}) => {
  const [loadPhotoProgress, setLoadPhotoProgress] = React.useState(0);

  const [isLoadingUploadPhoto, setIsLoadingUploadPhoto] = React.useState(false);

  const hasPhotoUploaded = !!photoUrl;

  const setPhotoUrlInAuthUserData = async (downloadURL: string) => {
    const userAuthCollection = {
      photoUrl: downloadURL,
    } as UserAuth;

    const { error } = await addData('users', userId, {
      auth: userAuthCollection,
    });

    if (error) {
      toast.error(
        'Error ao salvar foto de membro. Tente novamente mais tarde ou contate admim.'
      );
    } else {
      setIsLoadingUploadPhoto(false);

      toast.success('Foto de membro atualizada com sucesso!');
    }

    onUpdateHasMemberDataUpdated();
  };

  const uploadPhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files) {
      return;
    }

    setIsLoadingUploadPhoto(true);

    const file = event.target.files[0];

    const storageRef = ref(storage, `photos/${userId}.jpg`);

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
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setPhotoUrlInAuthUserData(downloadURL);
        });
      }
    );
  };

  return (
    <div className="mt-5 rounded-sm border border-stroke bg-white shadow-default md:w-full dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-start border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Alterar Foto de membro
        </h3>
      </div>
      <div
        className={`p-7 ${
          isLoadingUploadPhoto ? 'opacity-40' : 'opacity-100'
        }`}>
        <div className="mb-4 flex items-center justify-start gap-3">
          <div className="relative h-14 w-14 rounded-full">
            {hasPhotoUploaded ? (
              <Image
                width={55}
                height={55}
                className="h-14 w-14 rounded-full"
                src={photoUrl!}
                alt="Foto pessoal"
              />
            ) : (
              <Image
                width={55}
                height={55}
                className="rounded-full"
                src={'/images/user/dummy-user.png'}
                alt="Foto pessoal"
              />
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-md mb-1.5 font-bold text-black dark:text-white">
              Editar foto
            </span>
            {isLoadingUploadPhoto ? (
              <div className="flex flex-row items-center gap-1">
                <span className="text-sm">Carregando... </span>
                <span className="text-sm">
                  ({loadPhotoProgress.toFixed(0)} %)
                </span>
              </div>
            ) : (
              <span className="text-sm text-black dark:text-white">{name}</span>
            )}
          </div>
        </div>

        <label
          htmlFor="profile"
          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray p-4 sm:py-7.5 dark:bg-meta-4">
          <input
            type="file"
            name="profile"
            id="profile"
            onChange={uploadPhotoHandler}
            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
              <LuUpload className="text-primary" />
            </span>
            <p>
              <span className="text-primary">Clique para upload</span> ou
              arraste e solte
            </p>
            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
            <p>(max, 800 X 800px)</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default UserUploadPhoto;
