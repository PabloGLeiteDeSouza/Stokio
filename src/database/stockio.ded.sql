-- Tabela empresa corrigida
CREATE TABLE empresa (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    nome_fantasia TEXT,
    razao_social TEXT,
    cnpj TEXT UNIQUE,
    id_ramo INTEGER,
    id_pessoa INTEGER,
    id_endereco INTEGER,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id)
);

CREATE INDEX idx_empresa_id_pessoa ON empresa(id_pessoa);
CREATE INDEX idx_empresa_id_endereco ON empresa(id_endereco);

-- Tabela endereco
CREATE TABLE endereco (
    id INTEGER PRIMARY KEY,
    cep TEXT,
    logradouro TEXT,
    numero INTEGER,
    complemento TEXT,
    bairro TEXT,
    cidade TEXT,
    uf TEXT
);

-- Tabela telefone
CREATE TABLE telefone (
    id INTEGER PRIMARY KEY,
    numero TEXT
);

-- Tabela email
CREATE TABLE email (
    id INTEGER PRIMARY KEY,
    endereco TEXT
);

-- Tabela tipo_produto
CREATE TABLE tipo_produto (
    id INTEGER PRIMARY KEY,
    nome TEXT
);

-- Tabela produto corrigida
CREATE TABLE produto (
    id INTEGER PRIMARY KEY,
    codigo_de_barras TEXT UNIQUE,
    nome TEXT,
    data_de_validade DATE,
    valor REAL,
    quantidade INTEGER,
    tamanho INTEGER,
    id_tipo_produto INTEGER,
    id_marca INTEGER,
    id_unidade_de_medida INTEGER,
    id_unidade_de_armazenamento INTEGER,
    id_empresa INTEGER,
    FOREIGN KEY (id_tipo_produto) REFERENCES tipo_produto(id),
    FOREIGN KEY (id_marca) REFERENCES marca(id),
    FOREIGN KEY (id_unidade_de_medida) REFERENCES unidade_de_medida(id),
    FOREIGN KEY (id_unidade_de_armazenamento) REFERENCES unidade_de_armazenamento(id),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id)
);

CREATE INDEX idx_produto_id_marca ON produto(id_marca);
CREATE INDEX idx_produto_id_tipo_produto ON produto(id_tipo_produto);
CREATE INDEX idx_produto_id_unidade_de_medida ON produto(id_unidade_de_medida);
CREATE INDEX idx_produto_id_unidade_de_armazenamento ON produto(id_unidade_de_armazenamento);
CREATE INDEX idx_produto_id_empresa ON produto(id_empresa);

-- Tabela unidade_de_armazenamento corrigida
CREATE TABLE unidade_de_armazenamento (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    descricao TEXT,
    id_tipo_de_unidade_de_armazenamento INTEGER,
    FOREIGN KEY (id_tipo_de_unidade_de_armazenamento) REFERENCES tipo_de_unidade_de_armazenamento(id)
);

CREATE INDEX idx_unidade_de_armazenamento_id_tipo ON unidade_de_armazenamento(id_tipo_de_unidade_de_armazenamento);

-- Tabela marca
CREATE TABLE marca (
    id INTEGER PRIMARY KEY,
    nome TEXT
);

-- Tabela tipo_de_unidade_de_armazenamento
CREATE TABLE tipo_de_unidade_de_armazenamento (
    id INTEGER PRIMARY KEY,
    nome TEXT
);

-- Tabela unidade_de_medida
CREATE TABLE unidade_de_medida (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    valor TEXT
);

-- Tabela venda
CREATE TABLE venda (
    id INTEGER PRIMARY KEY,
    valor REAL,
    data_da_venda DATE,
    id_cliente INTEGER,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE INDEX idx_venda_id_cliente ON venda(id_cliente);

-- Tabela item_venda corrigida
CREATE TABLE item_venda (
    id INTEGER PRIMARY KEY,
    quantidade INTEGER,
    id_produto INTEGER,
    id_venda INTEGER,
    FOREIGN KEY (id_produto) REFERENCES produto(id),
    FOREIGN KEY (id_venda) REFERENCES venda(id)
);

CREATE INDEX idx_item_venda_id_produto ON item_venda(id_produto);
CREATE INDEX idx_item_venda_id_venda ON item_venda(id_venda);

-- Tabela cliente corrigida
CREATE TABLE cliente (
    id INTEGER PRIMARY KEY,
    limite INTEGER,
    status TEXT,
    id_pessoa INTEGER,
    id_endereco INTEGER,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id)
);

CREATE INDEX idx_cliente_id_pessoa ON cliente(id_pessoa);
CREATE INDEX idx_cliente_id_endereco ON cliente(id_endereco);

-- Tabela pessoa
CREATE TABLE pessoa (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    data_nascimento DATE,
    cpf TEXT UNIQUE
);

-- Tabela ramo
CREATE TABLE ramo (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    descricao TEXT
);

-- Tabela empresa_email corrigida
CREATE TABLE empresa_email (
    id INTEGER PRIMARY KEY,
    id_empresa INTEGER,
    id_email INTEGER UNIQUE,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id),
    FOREIGN KEY (id_email) REFERENCES email(id)
);

CREATE INDEX idx_empresa_email_id_empresa ON empresa_email(id_empresa);
CREATE INDEX idx_empresa_email_id_email ON empresa_email(id_email);

-- Tabela empresa_telefone corrigida
CREATE TABLE empresa_telefone (
    id INTEGER PRIMARY KEY,
    id_empresa INTEGER,
    id_telefone INTEGER UNIQUE,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id),
    FOREIGN KEY (id_telefone) REFERENCES telefone(id)
);

-- Tabela cliente_email
CREATE TABLE cliente_email (
    id INTEGER PRIMARY KEY,
    id_cliente INTEGER,
    id_email INTEGER UNIQUE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_email) REFERENCES email(id)
);

CREATE INDEX idx_cliente_email_id_cliente ON cliente_email(id_cliente);
CREATE INDEX idx_cliente_email_id_email ON cliente_email(id_email);

-- Tabela cliente_telefone
CREATE TABLE cliente_telefone (
    id INTEGER PRIMARY KEY,
    id_cliente INTEGER,
    id_telefone INTEGER UNIQUE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_telefone) REFERENCES telefone(id)
);

CREATE INDEX idx_cliente_telefone_id_cliente ON cliente_telefone(id_cliente);
CREATE INDEX idx_cliente_telefone_id_telefone ON cliente_telefone(id_telefone);

-- Tabela compra
CREATE TABLE compra (
    id INTEGER PRIMARY KEY,
    data DATE,
    valor_total REAL,
    status TEXT,
    data_pagamento DATE,
    valor_pago REAL,
    id_empresa INTEGER,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id)
);

CREATE INDEX idx_compra_id_empresa ON compra(id_empresa);

-- Tabela item_compra
CREATE TABLE item_compra (
    id INTEGER PRIMARY KEY,
    quantidade INTEGER,
    preco_unitario REAL,
    subtotal REAL,
    id_produto INTEGER,
    id_compra INTEGER,
    FOREIGN KEY (id_produto) REFERENCES produto(id),
    FOREIGN KEY (id_compra) REFERENCES compra(id)
);

CREATE INDEX idx_item_compra_id_produto ON item_compra(id_produto);
CREATE INDEX idx_item_compra_id_compra ON item_compra(id_compra);
