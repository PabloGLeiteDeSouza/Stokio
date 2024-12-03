import { SQLiteDatabase } from "expo-sqlite";

export default async function start_new_database(db:SQLiteDatabase) {
    await db.runAsync(`CREATE TABLE um ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL, 
        valor TEXT NOT NULL
    )`);
    await db.runAsync(`CREATE TABLE tipo_ua ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT NOT NULL, 
        descricao TEXT 
    )`);
    await db.runAsync(`CREATE TABLE ramo ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT NOT NULL
    )`);
    await db.runAsync(`CREATE TABLE marca ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL 
    )`)
    await db.runAsync(`CREATE TABLE tipo_produto ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT NOT NULL 
    )`)
    await db.runAsync(`CREATE TABLE ua ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL, 
        descricao TEXT, 
        id_tipo_ua INTEGER NOT NULL, 
        FOREIGN KEY (id_tipo_ua) REFERENCES tipo_ua(id)
    )`);
    await db.runAsync(`CREATE INDEX idx_ua_id_tipo ON ua(id_tipo_ua)`);
    await db.runAsync(`CREATE TABLE pessoa ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT NOT NULL, 
        data_nascimento DATE NOT NULL, 
        cpf VARCHAR(11) UNIQUE NOT NULL
    )`);
    await db.runAsync(`CREATE TABLE cliente ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        cep TEXT NOT NULL, 
        logradouro TEXT NOT NULL, 
        numero INTEGER NOT NULL, 
        complemento TEXT, 
        bairro TEXT NOT NULL, 
        cidade TEXT NOT NULL, 
        uf VARCHAR(2) NOT NULL, 
        saldo REAL, 
        id_pessoa INTEGER NOT NULL, 
        FOREIGN KEY (id_pessoa) REFERENCES pessoa(id)
    )`)
    await db.runAsync(`CREATE INDEX idx_cliente_id_pessoa ON cliente(id_pessoa)`)
    await db.runAsync(`CREATE TABLE empresa (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_fantasia TEXT NOT NULL,
        razao_social TEXT NOT NULL,
        cnpj VARCHAR(14) UNIQUE, -- CNPJ com restrição de unicidade
        cep TEXT NOT NULL,
        logradouro TEXT NOT NULL,
        numero INTEGER NOT NULL,
        complemento TEXT,
        bairro TEXT NOT NULL,
        cidade TEXT NOT NULL,
        uf TEXT(2) NOT NULL,
        id_pessoa INTEGER NOT NULL,
        id_ramo INTEGER NOT NULL,
        FOREIGN KEY (id_pessoa) REFERENCES pessoa(id),
        FOREIGN KEY (id_ramo) REFERENCES ramo(id)
    )`)
    await db.runAsync('CREATE INDEX idx_empresa_id_pessoa ON empresa(id_pessoa)');
    await db.runAsync('CREATE INDEX idx_empresa_id_ramo ON empresa(id_ramo)');
    await db.runAsync(`CREATE TABLE telefone (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero TEXT NOT NULL UNIQUE, -- Telefone com restrição de unicidade
        id_cliente INTEGER CHECK((id_cliente IS NOT NULL AND id_empresa IS NULL) OR (id_cliente IS NULL AND id_empresa IS NOT NULL)),
        id_empresa INTEGER CHECK((id_empresa IS NOT NULL AND id_cliente IS NULL) OR (id_empresa IS NULL AND id_cliente IS NOT NULL)),
        FOREIGN KEY (id_cliente) REFERENCES cliente(id),
        FOREIGN KEY (id_empresa) REFERENCES empresa(id)
    )`);
    await db.runAsync('CREATE INDEX idx_telefone_id_cliente ON telefone(id_cliente)');
    await db.runAsync('CREATE INDEX idx_telefone_id_empresa ON telefone(id_empresa)');
    await db.runAsync(`CREATE TABLE email (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        endereco TEXT NOT NULL UNIQUE, -- Email com restrição de unicidade
        id_cliente INTEGER CHECK((id_cliente IS NOT NULL AND id_empresa IS NULL) OR (id_cliente IS NULL AND id_empresa IS NOT NULL)),
        id_empresa INTEGER CHECK((id_empresa IS NOT NULL AND id_cliente IS NULL) OR (id_empresa IS NULL AND id_cliente IS NOT NULL)),
        FOREIGN KEY (id_cliente) REFERENCES cliente(id),
        FOREIGN KEY (id_empresa) REFERENCES empresa(id)
    )`);
    await db.runAsync('CREATE INDEX idx_email_id_cliente ON email(id_cliente)')
    await db.runAsync('CREATE INDEX idx_email_id_empresa ON email(id_empresa)')
    await db.runAsync(`CREATE TABLE produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo_de_barras TEXT UNIQUE, -- Código de barras com restrição de unicidade
        data_de_validade DATE,
        nome TEXT NOT NULL,
        descricao TEXT,
        valor REAL NOT NULL,
        quantidade INTEGER,
        tamanho INTEGER NOT NULL,
        id_empresa INTEGER NOT NULL,
        id_marca INTEGER NOT NULL,
        id_tipo_produto INTEGER NOT NULL,
        id_um INTEGER NOT NULL,
        id_ua INTEGER NOT NULL,
        FOREIGN KEY (id_empresa) REFERENCES empresa(id),
        FOREIGN KEY (id_marca) REFERENCES marca(id),
        FOREIGN KEY (id_tipo_produto) REFERENCES tipo_produto(id),
        FOREIGN KEY (id_um) REFERENCES um(id),
        FOREIGN KEY (id_ua) REFERENCES ua(id)
    )`);
    await db.runAsync('CREATE INDEX idx_produto_id_empresa ON produto(id_empresa)');
    await db.runAsync('CREATE INDEX idx_produto_id_marca ON produto(id_marca)');
    await db.runAsync('CREATE INDEX idx_produto_id_tipo_produto ON produto(id_tipo_produto)');
    await db.runAsync('CREATE INDEX idx_produto_id_um ON produto(id_um)');
    await db.runAsync('CREATE INDEX idx_produto_id_ua ON produto(id_ua)');
    await db.runAsync(`CREATE TABLE venda (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT,
        data DATE,
        status TEXT,
        id_cliente INTEGER NOT NULL,
        FOREIGN KEY (id_cliente) REFERENCES cliente(id)
    )`);
    await db.runAsync('CREATE INDEX idx_venda_id_cliente ON venda(id_cliente)');
    await db.runAsync(`CREATE TABLE item_venda (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quantidade INTEGER NOT NULL,
        valor_unitario REAL,
        id_venda INTEGER NOT NULL,
        id_produto INTEGER NOT NULL,
        FOREIGN KEY (id_venda) REFERENCES venda(id),
        FOREIGN KEY (id_produto) REFERENCES produto(id)
    )`);
    await db.runAsync('CREATE INDEX idx_item_venda_id_venda ON item_venda(id_venda)')
    await db.runAsync('CREATE INDEX idx_item_venda_id_produto ON item_venda(id_produto)')
    await db.runAsync(`CREATE TABLE compra (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT,
        data DATE,
        status TEXT,
        id_empresa INTEGER NOT NULL,
        FOREIGN KEY (id_empresa) REFERENCES empresa(id)
    )`);
    await db.runAsync('CREATE INDEX idx_compra_id_empresa ON compra(id_empresa)')
    await db.runAsync(`CREATE TABLE item_compra (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quantidade INTEGER NOT NULL,
        valor_unitario REAL,
        id_compra INTEGER NOT NULL,
        id_produto INTEGER NOT NULL,
        FOREIGN KEY (id_compra) REFERENCES compra(id),
        FOREIGN KEY (id_produto) REFERENCES produto(id)
    )`);
    await db.runAsync('CREATE INDEX idx_item_compra_id_compra ON item_compra(id_compra)')
    await db.runAsync('CREATE INDEX idx_item_compra_id_produto ON item_compra(id_produto)')
    await db.runAsync(`CREATE TRIGGER "item_venda_before_insert" BEFORE INSERT ON "item_venda" FOR EACH ROW BEGIN
        SELECT CASE
            WHEN (SELECT quantidade FROM produto WHERE id = NEW.id_produto) < NEW.quantidade THEN
                RAISE(ABORT, 'QUANTIDADE INSUFICIENTE!')
            END;

        UPDATE produto
        SET quantidade = quantidade - NEW.quantidade
        WHERE id = NEW.id_produto;
    END`);
    await db.runAsync(`CREATE TRIGGER "item_compra_before_insert" BEFORE INSERT ON "item_compra" FOR EACH ROW BEGIN
        UPDATE produto SET quantidade = produto.quantidade + NEW.quantidade WHERE NEW.id_produto == produto.id;
    END`);
}