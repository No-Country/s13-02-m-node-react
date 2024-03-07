export const errorsAuth = [
  {
    code: 200,
    message: 'Proceso exitoso!'
  },
  {
    code: 400,
    message: 'A ocurrido un error! Comprueba que los datos sean correctos',
    messageUsername: 'Este Nombre de usuario ya esta en uso, elige otro!',
    messageEmail:
      'Ya existe una cuenta con este email inicia sesión o elige otro!',
    messagePassword: 'Tu contraseña no es segura, debes respetar el formato!',
    serverEmailMessage: 'BAD_REQUEST :: Email already in use',
    serverUsernameMessage: 'BAD_REQUEST :: Username already in use',
    serverPasswordMessage: 'password is not strong enough'
  },
  {
    code: 401,
    message: 'El usuario o contraseña no coinciden, verifica tus datos!'
  },
  {
    code: 403,
    message: 'No es posible acceder!'
  },
  {
    code: 404,
    message: 'Not found'
  },
  {
    code: 404,
    message: 'Not found'
  },
  {
    code: 408,
    message: 'El proceso a tardado demasiado, intente mas tarde!'
  },
  {
    code: 500,
    message:
      'lo siento, hubo un problema con el servidor, intente en otro momento!'
  },
  {
    code: 511,
    message: 'Se requiere identificación'
  }
]
