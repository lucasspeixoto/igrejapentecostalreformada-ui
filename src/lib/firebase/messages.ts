/* eslint-disable import/prefer-default-export */

const firebaseMessages: Record<string, string> = {
  'storage/retry-limit-exceeded': 'Número máximo de tentativas excedido. Tente novamente mais tarde.',
  'auth/user-not-found': 'Usuário não cadastrado, crie uma conta para acessar!',
  'auth/wrong-password': 'E-mail ou senha incorreta ou usuário não cadastrado!',
  'auth/invalid-email': 'E-mail incorreto, verificar',
  'auth/too-many-requests': 'Resete a senha ou tente novamente mais tarde',
  'auth/email-already-in-use': 'Este e-mail já está em uso, caso não lembre a senha altere',
  PERMISSION_DENIED: 'Usuário não autenticado ou falha ao carregar tarefas, tente novamente mais tarde',
  'auth/argument-error': 'O e-mail não é válido ou não existe em nossos registros',
  'permission-denied':
    'Ocorreu um erro, usuário sem permissão ou instabilidade na base. Contate o administrador (19982621117)',
};

export default firebaseMessages;
