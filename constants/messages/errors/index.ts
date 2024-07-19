import { db_error_messages, default_db_errors } from './databse';
import { TypeDatabaseErrors } from './types';

export const DBErros = {
  ErrorsEmail: {
    update: {
      database: default_db_errors.update,
    },
    create: {
      database: default_db_errors.create,
    },
    delete: {
      database: default_db_errors.delete,
    },
    find: {
      all: {
        database: default_db_errors.find,
      },
      byEmail: {
        database: default_db_errors.find,
      },
      byId: {
        database: default_db_errors.find,
      },
      byIdEmpresa: {
        database: default_db_errors.find,
      },
    },
  },
  ErrorsCategoria: {
    update: {
      database: default_db_errors.update,
    },
    create: {
      database: default_db_errors.create,
    },
    delete: {
      database: default_db_errors.delete,
    },
    find: {
      all: {
        database: default_db_errors.find,
      },
      byName: {
        database: default_db_errors.find,
      },
      byId: {
        database: default_db_errors.find,
      },
      byIdEmpresa: {
        database: default_db_errors.find,
      },
    },
  },
  ErrorsEmpresa: {
    update: {
      database: default_db_errors.update,
    },
    create: {
      database: default_db_errors.create,
    },
    delete: {
      database: default_db_errors.delete,
    },
    find: {
      all: {
        database: default_db_errors.find,
      },
      byNomeCompleto: {
        database: default_db_errors.find,
      },
      byCpf: {
        database: default_db_errors.find,
      },
      byNomeFantasia: {
        database: default_db_errors.find,
      },
      byRazaoSocial: {
        database: default_db_errors.find,
      },
      byCnpj: {
        database: default_db_errors.find,
      },
      byId: {
        database: default_db_errors.find,
      },
      byIdEmpresa: {
        database: default_db_errors.find,
      },
    },
  },
  ErrorsEndereco: {
    update: {
      database: default_db_errors.update,
    },
    create: {
      database: default_db_errors.create,
    },
    delete: {
      database: default_db_errors.delete,
    },
    find: {
      all: {
        database: default_db_errors.find,
      },
      byId: {
        database: default_db_errors.find,
      },
      byCep: {
        database: default_db_errors.find,
      },
      bylogradouro: {
        database: default_db_errors.find,
      },
      byBairro: {
        database: default_db_errors.find,
      },
      byCidade: {
        database: default_db_errors.find,
      },
      byEstado: {
        database: default_db_errors.find,
      },
    },
  },
  ErrorsMarca: {
    update: {
      database: default_db_errors.update,
    },
    create: {
      database: default_db_errors.create,
    },
    delete: {
      database: default_db_errors.delete,
    },
    find: {
      byId: {
        database: default_db_errors.find,
      },
      byNome: {
        database: default_db_errors.find,
      },
    },
  },
  ErrorsProduto: {
    update: {
      database: default_db_errors.update,
    },
    create: {
      database: default_db_errors.create,
    },
    delete: {
      database: default_db_errors.delete,
    },
    find: {
      byId: {
        database: default_db_errors.find,
      },
      byNome: {
        database: default_db_errors.find,
      },
      byIdMarca: {
        database: default_db_errors.find,
      },
      byIdCategoria: {
        database: default_db_errors.find,
      },
      byCodigoDeBarras: {
        database: default_db_errors.find,
      },
    },
  },
  ErrorsTelefone: {
    update: {
      database: default_db_errors.update,
    },
    create: {
      database: default_db_errors.create,
    },
    delete: {
      database: default_db_errors.delete,
    },
    find: {
      byId: {
        database: default_db_errors.find,
      },
      byTelefone: {
        database: default_db_errors.find,
      },
    },
  },
  ErrosTipoUA: {
    update: {
      database: default_db_errors.update,
    },
    create: {
      database: default_db_errors.create,
    },
    delete: {
      database: default_db_errors.delete,
    },
    find: {
      byId: {
        database: default_db_errors.find,
      },
      byNome: {
        database: default_db_errors.find,
      },
    },
  },
  ErrorsUA: {
    update: {
      database: default_db_errors.update,
    },
    create: {
      database: default_db_errors.create,
    },
    delete: {
      database: default_db_errors.delete,
    },
    find: {
      byId: {
        database: default_db_errors.find,
      },
      byNome: {
        database: default_db_errors.find,
      },
      byIdTipoUa: {
        database: default_db_errors.find,
      },
    },
  },
};

export const database_errors = {
  ...db_error_messages,
} as TypeDatabaseErrors;

export default {
  DBErros,
  database_errors,
};
