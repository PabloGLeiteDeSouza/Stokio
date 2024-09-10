CREATE TABLE empresa (
    id INTEGER PRIMARY KEY,
    nome_fantasia TEXT,
    razao_social TEXT,
    cnpj TEXT UNIQUE,
    id_ramo INTEGER,
    id_pessoa INTEGER,
    FOREIGN KEY (id_ramo) REFERENCES ramo (id),
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa (id)
);

CREATE TABLE endereco (
    id INTEGER PRIMARY KEY,
    cep TEXT,
    logradouro TEXT,
    numero INTEGER,
    complemento TEXT,
    bairro TEXT,
    cidade TEXT,
    uf TEXT,
    id_pessoa INTEGER,
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa (id)
);

CREATE TABLE telefone (
    id INTEGER PRIMARY KEY,
    telefone TEXT,
    id_pessoa INTEGER,
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa (id)
);

CREATE TABLE email (
    id INTEGER PRIMARY KEY,
    email TEXT,
    id_pessoa INTEGER,
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa (id)
);

CREATE TABLE tipo_de_produto (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    descricao TEXT
);

CREATE TABLE produto (
    id INTEGER PRIMARY KEY,
    codigo_de_barras TEXT UNIQUE,
    nome TEXT,
    data_de_validade DATE,
    valor REAL,
    quantidade INTEGER,
    tamanho INTEGER,
    id_tipo_de_produto INTEGER,
    id_marca INTEGER,
    id_unidade_de_medida INTEGER,
    id_unidade_de_armazenamento INTEGER,
    id_empresa INTEGER,
    FOREIGN KEY (id_tipo_de_produto) REFERENCES tipo_de_produto (id),
    FOREIGN KEY (id_marca) REFERENCES Marca (id),
    FOREIGN KEY (id_unidade_de_medida) REFERENCES unidade_de_medida (id),
    FOREIGN KEY (id_unidade_de_armazenamento) REFERENCES unidade_de_armazenamento (id),
    FOREIGN KEY (id_empresa) REFERENCES Empresa (id)
);

CREATE TABLE unidade_de_armazenamento (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    descricao TEXT,
    id_tipo_de_unidade_de_armazenamento INTEGER,
    FOREIGN KEY (id_tipo_de_unidade_de_armazenamento) REFERENCES tipo_de_unidade_de_armazenamento (id)
);

CREATE TABLE marca (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    descricao TEXT
);

CREATE TABLE tipo_de_unidade_de_armazenamento (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    descricao TEXT
);

CREATE TABLE unidade_de_medida (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    valor TEXT,
    descricao TEXT
);

CREATE TABLE venda (
    id INTEGER PRIMARY KEY,
    valor REAL,
    data_da_venda DATE,
    id_cliente INTEGER,
    FOREIGN KEY (id_cliente) REFERENCES Cliente (id)
);

CREATE TABLE item_de_venda (
    id INTEGER PRIMARY KEY,
    quantidade INTEGER,
    id_produto INTEGER,
    id_venda INTEGER,
    FOREIGN KEY (id_produto) REFERENCES Produto (id),
    FOREIGN KEY (id_venda) REFERENCES Venda (id)
);

CREATE TABLE cliente (
    id INTEGER PRIMARY KEY,
    limite INTEGER,
    status BOOLEAN,
    id_pessoa INTEGER,
    FOREIGN KEY (id_pessoa) REFERENCES Pessoa (id)
);

CREATE TABLE pessoa (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    sobrenome TEXT,
    data_de_nascimento DATE,
    cpf TEXT UNIQUE
);

CREATE TABLE ramo (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    descricao TEXT
);
