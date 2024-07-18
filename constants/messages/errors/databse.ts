export const default_db_errors = {
  update: 'Não foi possível atualizar!',
  delete: 'Não foi possível deletar!',
  create: 'Não foi possível criar!',
  find: 'Não foi possível encontrar nenhum registro!',
}


export const db_error_messages = {
  ErrorsEmail: {
    update: {
      database: 'Não foi possível atualizar o e-mail tente novamente!',
    },
    create: {
      database: 'Não foi possível criar o e-mail tente novamente!',
    },
    delete: {
      database: 'Não foi possível deletar o e-mail tente novamente!',
    },
    find: {
      all: {
        database: 'Não foi possível encontrar nenhum e-mail tente novamente!',
      },
      byEmail: {
        database: 'Não foi possível encontrar o e-mail tente novamente!',
      },
      byId: {
        database: 'Não foi possível encontrar o e-mail tente novamente!',
      },
      allbyIdEmpresa: {
        database: 'Não foi possível encontrar nenhum e-mail tente novamente!',
      },
    },
  },
  ErrorsCategoria: {
    update: {
      database: 'Não foi possível atualizar a categoria tente novamente!',
    },
    create: {
      database: 'Não foi possível criar a categoria tente novamente!',
    },
    delete: {
      database: 'Não foi possível deletar a categoria tente novamente!',
    },
    find: {
      all: {
        database: 'Não foi possível encontrar nenhuma categoria tente novamente!',
      },
      byName: {
        database: 'Não foi possível encontrar a categoria tente novamente!',
      },
      byId: {
        database: 'Não foi possível encontrar a categoria tente novamente!',
      },
    },
  },
  ErrorsEmpresa: {
    update: {
      database: 'Não foi possível atualizar a empresa tente novamente!',
    },
    create: {
      database: 'Não foi possível criar a empresa tente novamente!',
    },
    delete: {
      database: 'Não foi possível deletar a empresa tente novamente!',
    },
    find: {
      all: {
        database: 'Não foi possível econtrar nenhuma empresa tente novamente!',
      },
      byNomeCompleto: {
        database: 'Não foi possível encontrar a empresa tente novamente!',
      },
      byCpf: {
        database: 'Não foi possível encontrar a empresa tente novamente!',
      },
      byNomeFantasia: {
        database: 'Não foi possível encontrar a empresa tente novamente!',
      },
      byRazaoSocial: {
        database: 'Não foi possível encontrar a empresa tente novamente!',
      },
      byCnpj: {
        database: 'Não foi possível encontrar a empresa tente novamente!',
      },
      byId: {
        database: 'Não foi possível encontrar a empresa tente novamente!',
      },
      allbyIdCategoria: {
        database: 'Não foi possível encontrar nenhuma empresa tente novamente!',
      },
    },
  },
  ErrorsEndereco: {
    update: {
      database: 'Não foi possível atualizar o endereço tente novamente!',
    },
    create: {
      database: 'Não foi possível criar o endereço tente novamente!',
    },
    delete: {
      database: 'Não foi possível deletar o endereço tente novamente!',
    },
    find: {
      all: {
        database: 'Não foi possível encontrar nenhum endereço tente novamente!',
      },
      byId: {
        database: 'Não foi possível encontrar o endereço tente novamente!',
      },
      allbyCep: {
        database: 'Não foi possível encontrar nenhum endereço tente novamente!',
      },
      allbylogradouro: {
        database: 'Não foi possível encontrar nenhum endereço tente novamente!',
      },
      allbyBairro: {
        database: 'Não foi possível encontrar nenhum endereço tente novamente!',
      },
      allbyCidade: {
        database: 'Não foi possível encontrar nenhum endereço tente novamente!',
      },
      allbyEstado: {
        database: 'Não foi possível encontrar nenhum endereço tente novamente!',
      },
    },
  },
  ErrorsMarca: {
    update: {
      database: 'Não foi possível atualizar a marca tente novamente!',
    },
    create: {
      database: 'Não foi possível criar a marca tente novamente!',
    },
    delete: {
      database: 'Não foi possível deletar a marca tente novamente!',
    },
    find: {
      byId: {
        database: 'Não foi possível encontrar a marca tente novamente!',
      },
      byNome: {
        database: 'Não foi possível encontrar a marca tente novamente!',
      },
    },
  },
  ErrorsProduto: {
    update: {
      database: 'Não foi possível atualizar o produto tente novamente!',
    },
    create: {
      database: 'Não foi possível criar o produto tente novamente!',
    },
    delete: {
      database: 'Não foi possível deletar o produto tente novamente!',
    },
    find: {
      byId: {
        database: 'Não foi possível encontrar o produto tente novamente!',
      },
      byNome: {
        database: 'Não foi possível econtrar o produto tente novamente!',
      },
      allbyIdMarca: {
        database: 'Não foi possível encontrar nenhum produto tente novamente!',
      },
      allbyIdCategoria: {
        database: 'Não foi possível encontrar nenhum produto tente novamente!',
      },
      byCodigoDeBarras: {
        database: 'Não foi possível encontrar o produto tente novamente!',
      },
    },
  },
  ErrorsTelefone: {
    update: {
      database: 'Não foi possível atualizar o telefone tente novamente!',
    },
    create: {
      database: 'Não foi possível criar o telefone tente novamente!',
    },
    delete: {
      database: 'Não foi possível deletar o telefone tente novamente!',
    },
    find: {
      all: {
        database: 'Não foi possível encontrar nenhum telefone tente novamente!',
      },
      byId: {
        database: 'Não foi possível encontrar o telefone tente novamente!',
      },
      byTelefone: {
        database: 'Não foi possível encontrar o telefone tente novamente!',
      },
      allbyIdEmpresa: {
        database: 'Não foi possível encontrar nenhum telefone tente novamente!',
      },
    },
  },
  ErrosTipoUA: {
    update: {
      database: 'Não foi possível atualizar o tipo de unidade de armazenamento tente novamente!',
    },
    create: {
      database: 'Não foi possível criar o tipo de unidade de armazenamento tente novamente!',
    },
    delete: {
      database: 'Não foi possível deletar o tipo de unidade de armazenamento tente novamente!',
    },
    find: {
      byId: {
        database: 'Não foi possível encontrar o tipo de unidade de armazenamento tente novamente!',
      },
      byNome: {
        database: 'Não foi possível econtrar o tipo de unidade de armazenamento tente novamente!',
      },
    },
  },
  ErrorsUA: {
    update: {
      database: 'Não foi possível atualizar a unidade de armazenamento tente novamente!',
    },
    create: {
      database: 'Não foi possível criar a unidade de armazenamento tente novamente!',
    },
    delete: {
      database: 'Não foi possível deletar a unidade de armazenamento tente novamente!',
    },
    find: {
      byId: {
        database: 'Não foi possível encontrar a unidade de armazenamento tente novamente!',
      },
      byNome: {
        database: 'Não foi possível encontrar a unidade de armazenamento tente novamente!',
      },
      allbyIdTipoUa: {
        database: 'Não foi possível encontrar nenhuma unidade de armazenamento tente novamente!',
      },
    },
  },
}