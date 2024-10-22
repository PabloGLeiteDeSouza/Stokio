-- Tabela unidade_de_medida
CREATE TABLE unidade_de_medida (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    valor TEXT NOT NULL
);

-- Tabela unidade_de_armazenamento
CREATE TABLE unidade_de_armazenamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    id_tipo_de_unidade_de_armazenamento INTEGER,
    FOREIGN KEY (id_tipo_de_unidade_de_armazenamento) REFERENCES tipo_de_unidade_de_armazenamento(id)
);

-- Índice na chave estrangeira da tabela unidade_de_armazenamento
CREATE INDEX idx_unidade_de_armazenamento_id_tipo ON unidade_de_armazenamento(id_tipo_de_unidade_de_armazenamento);

-- Tabela tipo_de_unidade_de_armazenamento
CREATE TABLE tipo_de_unidade_de_armazenamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT
);

-- Tabela ramo (auxiliar)
CREATE TABLE ramo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);

-- Tabela marca (auxiliar)
CREATE TABLE marca (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);

-- Tabela tipo_produto (auxiliar)
CREATE TABLE tipo_produto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);

-- Tabela pessoa
CREATE TABLE pessoa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf TEXT UNIQUE NOT NULL -- CPF com restrição de unicidade
);

-- Tabela cliente
CREATE TABLE cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cep TEXT NOT NULL,
    logradouro TEXT NOT NULL,
    numero INTEGER NOT NULL,
    complemento TEXT,
    bairro TEXT NOT NULL,
    cidade TEXT NOT NULL,
    uf TEXT(2) NOT NULL,
    saldo REAL,
    id_endereco INTEGER NOT NULL,
    id_pessoa INTEGER NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id)
);

-- indices chave estrangeiras tabela cliente
CREATE INDEX idx_cliente_id_pessoa ON cliente(id_pessoa);

-- Tabela empresa
CREATE TABLE empresa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    nome_fantasia TEXT NOT NULL,
    razao_social TEXT NOT NULL,
    cnpj TEXT UNIQUE, -- CNPJ com restrição de unicidade
    cep TEXT NOT NULL,
    logradouro TEXT NOT NULL,
    numero INTEGER NOT NULL,
    complemento TEXT,
    bairro TEXT NOT NULL,
    cidade TEXT NOT NULL,
    uf TEXT(2) NOT NULL,
	 id_pessoa INTEGER NOT NULL,
    id_ramo INTEGER NOT NULL,
    id_endereco INTEGER NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id),
    FOREIGN KEY (id_ramo) REFERENCES ramo(id)
);

-- Índices nas chaves estrangeiras da tabela empresa
CREATE INDEX idx_empresa_id_pessoa ON empresa(id_pessoa);
CREATE INDEX idx_empresa_id_ramo ON empresa(id_ramo);

-- Tabela telefone
CREATE TABLE telefone (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT NOT NULL UNIQUE, -- Telefone com restrição de unicidade
    id_cliente INTEGER CHECK((id_cliente IS NOT NULL AND id_empresa IS NULL) OR (id_cliente IS NULL AND id_empresa IS NOT NULL)),
    id_empresa INTEGER CHECK((id_empresa IS NOT NULL AND id_cliente IS NULL) OR (id_empresa IS NULL AND id_cliente IS NOT NULL)),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id)
);
-- Índices nas chaves estrangeiras da tabela telefone
CREATE INDEX idx_telefone_id_cliente ON telefone(id_cliente);
CREATE INDEX idx_telefone_id_empresa ON telefone(id_empresa);

-- Tabela email
CREATE TABLE email (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    endereco TEXT NOT NULL UNIQUE, -- Email com restrição de unicidade
    id_cliente INTEGER CHECK((id_cliente IS NOT NULL AND id_empresa IS NULL) OR (id_cliente IS NULL AND id_empresa IS NOT NULL)),
    id_empresa INTEGER CHECK((id_empresa IS NOT NULL AND id_cliente IS NULL) OR (id_empresa IS NULL AND id_cliente IS NOT NULL)),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id)
);

-- Índices nas chaves estrangeiras da tabela cliente_email
CREATE INDEX idx_email_id_cliente ON email(id_cliente);
CREATE INDEX idx_email_id_empresa ON email(id_empresa);

-- Tabela produto
CREATE TABLE produto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_de_barras TEXT UNIQUE, -- Código de barras com restrição de unicidade
    data_de_validade DATE,
    nome TEXT NOT NULL,
    descricao TEXT,
    valor REAL,
    quantidade INTEGER NOT NULL,
    tamanho INTEGER,
    id_marca INTEGER,
    id_tipo_produto INTEGER,
    id_unidade_de_medida INTEGER,
    id_unidade_de_armazenamento INTEGER,
    FOREIGN KEY (id_marca) REFERENCES marca(id),
    FOREIGN KEY (id_tipo_produto) REFERENCES tipo_produto(id),
    FOREIGN KEY (id_unidade_de_medida) REFERENCES unidade_de_medida(id),
    FOREIGN KEY (id_unidade_de_armazenamento) REFERENCES unidade_de_armazenamento(id)
);

-- Índices nas chaves estrangeiras da tabela produto
CREATE INDEX idx_produto_id_marca ON produto(id_marca);
CREATE INDEX idx_produto_id_tipo_produto ON produto(id_tipo_produto);
CREATE INDEX idx_produto_id_unidade_de_medida ON produto(id_unidade_de_medida);
CREATE INDEX idx_produto_id_unidade_de_armazenamento ON produto(id_unidade_de_armazenamento);

-- Tabela venda
CREATE TABLE venda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT,
    valor REAL,
    createdAt DATE,
    updatedAt DATE,
    status TEXT,
    id_cliente INTEGER NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

-- Índice na chave estrangeira da tabela venda
CREATE INDEX idx_venda_id_cliente ON venda(id_cliente);

-- Tabela item_de_venda
CREATE TABLE item_venda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venda INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    valor REAL,
    createdAt DATE,
    updatedAt DATE,
    FOREIGN KEY (id_venda) REFERENCES venda(id),
    FOREIGN KEY (id_produto) REFERENCES produto(id)
);

-- Índices nas chaves estrangeiras da tabela item_de_venda
CREATE INDEX idx_item_venda_id_venda ON item_venda(id_venda);
CREATE INDEX idx_item_venda_id_produto ON item_venda(id_produto);

-- Tabela venda
CREATE TABLE compra (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT,
    valor REAL,
    createdAt DATE,
    updatedAt DATE,
    status TEXT,
    data_pagamento DATE,
    valor_pago	REAL,
    id_empresa INTEGER NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id)
);

-- Índice na chave estrangeira da tabela venda
CREATE INDEX idx_compra_id_cliente ON compra(id_empresa);

-- Tabela item_de_venda
CREATE TABLE item_compra (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_compra INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    subtotal REAL,
    createdAt DATE,
    updatedAt DATE,
    FOREIGN KEY (id_compra) REFERENCES compra(id),
    FOREIGN KEY (id_produto) REFERENCES produto(id)
);

-- Índices nas chaves estrangeiras da tabela item_de_venda
CREATE INDEX idx_item_compra_id_compra ON item_compra(id_compra);
CREATE INDEX idx_item_compra_id_produto ON item_compra(id_produto);
