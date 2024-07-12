export type TypeDBErros = {
    ErrorsEmail: {
        update: {
            database: string
        },
        create: { 
            database: string
        },
        delete: {
            database: string
        },
        find: {
            all: {
                database: string
            },
            byEmail: {
                database: string
            },
            byId: {
                database: string
            },
            byIdEmpresa: {
                database: string
            }
        }
    },
    ErrorsCategoria: {
        update: {
            database: string
        },
        create: { 
            database: string
        },
        delete: {
            database: string
        },
        find: {
            all: {
                database: string
            },
            byName: {
                database: string
            },
            byId: {
                database: string
            },
            byIdEmpresa: {
                database: string
            }
        }
    },
    ErrorsEmpresa: {
        update: {
            database: string
        },
        create: { 
            database: string
        },
        delete: {
            database: string
        },
        find: {
            all: {
                database: string
            },
            byNomeCompleto: {
                database: string
            },
            byCpf:{
                database: string
            },
            byNomeFantasia: {
                database: string
            },
            byRazaoSocial: {
                database: string
            },
            byCnpj: {
                database: string
            },
            byId: {
                database: string
            },
            byIdEmpresa: {
                database: string
            }
        }
    },
    ErrorsEndereco: {
        update: {
            database: string
        },
        create: { 
            database: string
        },
        delete: {
            database: string
        },
        find: {
            all: {
                database: string
            },
            byId: {
                database: string
            },
            byCep: {
                database: string
            },
            bylogradouro: {
                database: string
            },
            byBairro: {
                database: string
            },
            byCidade: {
                database: string
            },
            byEstado: {
                database: string
            }
        }
    },
    ErrorsMarca: {
        update: {
            database: string
        },
        create: { 
            database: string
        },
        delete: {
            database: string
        },
        find: {
            byId: {
                database: string
            },
            byNome: {
                database: string
            }
        }
    },
    ErrorsProduto: {
        update: {
            database: string
        },
        create: { 
            database: string
        },
        delete: {
            database: string
        },
        find: {
            byId: {
                database: string
            },
            byNome: {
                database: string
            },
            byIdMarca: {
                database: string
            },
            byIdCategoria: {
                database: string
            },
            byCodigoDeBarras: {
                database: string
            }
        }
    },
    ErrorsTelefone: {
        update: {
            database: string
        },
        create: { 
            database: string
        },
        delete: {
            database: string
        },
        find: {
            byId: {
                database: string
            },
            byTelefone: {
                database: string
            }
        }
    },
    ErrosTipoUA: {
        update: {
            database: string
        },
        create: { 
            database: string
        },
        delete: {
            database: string
        },
        find: {
            byId: {
                database: string
            },
            byNome: {
                database: string
            }
        }
    },
    ErrorsUA: {
        update: {
            database: string
        },
        create: { 
            database: string
        },
        delete: {
            database: string
        },
        find: {
            byId:{
                database: string
            },
            byNome: {
                database: string
            },
            byIdTipoUa: {
                database: string
            }
        }
    }
}