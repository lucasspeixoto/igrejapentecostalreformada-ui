'use client';

/* eslint-disable no-console */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* import signIn from '@fire/auth/signin'; */

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '@/providers/AuthContextProvider';
import type { LoginUserFormData } from '@/schemas/signin-schema';
import { loginUserFormSchema } from '@/schemas/signin-schema';

const ContactForm = () => {
  const router = useRouter();

  const authContext = useAuthContext()!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  /*  const singInWithGoogleHandler = async (): Promise<void> => {
    const { result, error } = await signInWithGoogle();

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      const userAuthCollection: UserAuth = {
        admin: false,
        name: result?.user.displayName!,
        photoUrl: result?.user.photoURL!,
        email: result?.user.email!,
        userId: result?.user.uid!,
      };

      await addDocumentData('users', result?.user.uid!, {
        auth: userAuthCollection,
      });

      authContext.updateLoadingAuthProcess(false);

      router.push('/membros/cadastro/pessoal');
    }
  }; */

  /* const loginUserHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    const { error } = await signInUserHandler(email, password);

    if (error) {
      toast.error(firebaseMessages[error.code]);

      authContext.updateLoadingAuthProcess(false);
    } else {
      authContext.updateLoadingAuthProcess(false);

      router.push('/membros/cadastro/pessoal');
    }
  }; */

  const getLoginUserFormDataHandler = async (data: LoginUserFormData) => {
    authContext.updateLoadingAuthProcess(true);

    const { email, password } = data;

    // loginUserHandler(email, password);
  };

  return (
    <React.Fragment>
      {/* Formulário */}
      <form action="#">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Nome <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Sobrenome <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Digite seu sobrenome"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Email <span className="text-meta-1">*</span>
          </label>
          <input
            disabled
            type="email"
            placeholder="Confirme seu e-mail"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Sexo <span className="text-meta-1">*</span>
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
              <option value="">Selecione seu sexo</option>
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
            </select>
            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill=""></path>
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Celular <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Digite seu celular"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Telefone <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Digite seu telefone"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-3 block text-black dark:text-white">
            Data de nascimento
          </label>
          <div className="relative">
            <input
              type="date"
              className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        {/* <div className="mb-6">
          <label className="mb-2.5 block text-black dark:text-white">
            Message
          </label>
          <textarea
            rows={6}
            placeholder="Type your message"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
        </div> */}

        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
          Salvar
        </button>
      </form>
    </React.Fragment>
  );
};

export default ContactForm;
