-- Tabela unidade_de_medida
CREATE TABLE unidade_de_medida (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    valor TEXT,
    descricao TEXT
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

-- Tabela endereco (auxiliar)
CREATE TABLE endereco (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rua TEXT NOT NULL,
    numero INT NOT NULL,
    cidade TEXT NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep TEXT NOT NULL
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

-- Tabela cliente
CREATE TABLE cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    limite DECIMAL(10, 2),
    id_endereco INTEGER NOT NULL,
    FOREIGN KEY (id_endereco) REFERENCES endereco(id)
);

CREATE INDEX idx_cliente_id_endereco ON endereco(id);

-- Tabela pessoa
CREATE TABLE pessoa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data_de_nascimento DATE NOT NULL,
    cpf TEXT UNIQUE NOT NULL -- CPF com restrição de unicidade
);



-- Tabela pessoa_cliente
CREATE TABLE pessoa_cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pessoa INTEGER NOT NULL,
    id_cliente INTEGER NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

-- Índices nas chaves estrangeiras da tabela pessoa_cliente
CREATE INDEX idx_pessoa_cliente_id_pessoa ON pessoa_cliente(id_pessoa);
CREATE INDEX idx_pessoa_cliente_id_cliente ON pessoa_cliente(id_cliente);

-- Tabela telefone
CREATE TABLE telefone (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT NOT NULL UNIQUE -- Telefone com restrição de unicidade
);

-- Tabela pessoa_cliente_telefone
CREATE TABLE cliente_telefone (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER NOT NULL,
    id_telefone INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_telefone) REFERENCES telefone(id)
);

-- Índices nas chaves estrangeiras da tabela pessoa_cliente_telefone
CREATE INDEX idx_cliente_telefone_id_cliente ON cliente_telefone(id_cliente);
CREATE INDEX idx_cliente_telefone_id_telefone ON cliente_telefone(id_telefone);

-- Tabela email
CREATE TABLE email (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    endereco TEXT NOT NULL UNIQUE -- Email com restrição de unicidade
);

-- Tabela cliente_email
CREATE TABLE cliente_email (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER NOT NULL,
    id_email INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_email) REFERENCES email(id)
);

-- Índices nas chaves estrangeiras da tabela pessoa_cliente_email
CREATE INDEX idx_cliente_email_id_cliente ON cliente_email(id_cliente);
CREATE INDEX idx_cliente_email_id_email ON cliente_email(id_email);

-- Tabela empresa
CREATE TABLE empresa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    nome_fantasia TEXT,
    razao_social TEXT,
    cnpj TEXT UNIQUE, -- CNPJ com restrição de unicidade
    id_pessoa INTEGER,
    id_ramo INTEGER,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id),
    FOREIGN KEY (id_ramo) REFERENCES ramo(id)
);

-- Índices nas chaves estrangeiras da tabela empresa
CREATE INDEX idx_empresa_id_pessoa ON empresa(id_pessoa);
CREATE INDEX idx_empresa_id_ramo ON empresa(id_ramo);

-- Tabela empresa_telefone
CREATE TABLE empresa_telefone (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_empresa INTEGER NOT NULL,
    id_telefone INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id),
    FOREIGN KEY (id_telefone) REFERENCES telefone(id)
);

-- Índices nas chaves estrangeiras da tabela empresa_telefone
CREATE INDEX idx_empresa_telefone_id_empresa ON empresa_telefone(id_empresa);
CREATE INDEX idx_empresa_telefone_id_telefone ON empresa_telefone(id_telefone);

-- Tabela empresa_email
CREATE TABLE empresa_email (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_empresa INTEGER NOT NULL,
    id_email INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id),
    FOREIGN KEY (id_email) REFERENCES email(id)
);

-- Índices nas chaves estrangeiras da tabela empresa_email
CREATE INDEX idx_empresa_email_id_empresa ON empresa_email(id_empresa);
CREATE INDEX idx_empresa_email_id_email ON empresa_email(id_email);

-- Tabela empresa_cliente
CREATE TABLE empresa_cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_empresa INTEGER NOT NULL,
    id_cliente INTEGER NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

-- Índices nas chaves estrangeiras da tabela empresa_cliente
CREATE INDEX idx_empresa_cliente_id_empresa ON empresa_cliente(id_empresa);
CREATE INDEX idx_empresa_cliente_id_cliente ON empresa_cliente(id_cliente);

-- Tabela empresa_endereco
CREATE TABLE empresa_endereco (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_empresa INTEGER NOT NULL,
    id_endereco INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id)
);

-- Índices nas chaves estrangeiras da tabela empresa_endereco
CREATE INDEX idx_empresa_endereco_id_empresa ON empresa_endereco(id_empresa);
CREATE INDEX idx_empresa_endereco_id_endereco ON empresa_endereco(id);

-- Tabela produto
CREATE TABLE produto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_de_barras TEXT UNIQUE, -- Código de barras com restrição de unicidade
    data_de_validade DATE,
    nome TEXT NOT NULL,
    descricao TEXT,
    valor DECIMAL(10, 2),
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
    valor DECIMAL(10, 2),
    createdAt DATE,
    updatedAt DATE,
    status TEXT,
    id_cliente INTEGER NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

-- Índice na chave estrangeira da tabela venda
CREATE INDEX idx_venda_id_cliente ON venda(id_cliente);

-- Tabela item_de_venda
CREATE TABLE item_de_venda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venda INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    valor DECIMAL(10, 2),
    createdAt DATE,
    updatedAt DATE,
    FOREIGN KEY (id_venda) REFERENCES venda(id),
    FOREIGN KEY (id_produto) REFERENCES produto(id)
);

-- Índices nas chaves estrangeiras da tabela item_de_venda
CREATE INDEX idx_item_de_venda_id_venda ON item_de_venda(id_venda);
CREATE INDEX idx_item_de_venda_id_produto ON item_de_venda(id_produto);
