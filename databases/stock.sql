-- Tabela "empresa"
CREATE TABLE IF NOT EXISTS empresa_pj (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    nome_fantasia TEXT,
    cnpj CHAR(14),
    inscricao_estadual VARCHAR(20),
    inscricao_municipal VARCHAR(20),
    data_criacao DATE DEFAULT (strftime('%Y-%m-%d', 'now')),
    CONSTRAINT unique_cnpj_empresa_pj UNIQUE (cnpj),
    CONSTRAINT unique_inscricao_estadual_empresa_pj UNIQUE (inscricao_estadual),
    CONSTRAINT unique_inscricao_municipal_empresa_pj UNIQUE (inscricao_municipal)
);

CREATE TABLE IF NOT EXISTS empresa_pf (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    nome_fantasia TEXT,
    cpf CHAR(11),
    data_criacao DATE DEFAULT (strftime('%Y-%m-%d', 'now')),
    CONSTRAINT unique_cpf_empresa_pf UNIQUE (cpf)
);

CREATE TABLE IF NOT EXISTS "endereco" (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Rua TEXT NOT NULL,
    Numero INTEGER NOT NULL,
    Complemento TEXT,
    Cidade TEXT NOT NULL,
    Estado TEXT NOT NULL,
    Pais TEXT NOT NULL,
    CEP VARCHAR(8) CHECK (cep LIKE '_____-___'),
)

CREATE TABLE IF NOT EXISTS "empresa" (
	"id" INTEGER NOT NULL AUTOINCREMENT,
	"primeiro_nome" TEXT,
    "sobrenome" TEXT,
    "cpf" VARCHAR(11),
    "data_de_nascimento" DATE,
    "nome_fantasia" TEXT,
	"razao_social" TEXT,
	"cnpj" VARCHAR(14),
	"inscricao_estadual" VARCHAR(20),
	"inscricao_municipal" VARCHAR(20),
	"data_criacao" DATE,
    "endereco_id" INTEGER,
	PRIMARY KEY ("id"),
    FOREIGN KEY ("endereco_id") REFERENCES  enderecos("id"),
    UNIQUE INDEX "idx_unique_endereco_id_em_empresa" ("endereco_id"),
	UNIQUE INDEX "idx_unique_cpf_em_empresa" ("cpf"),
	UNIQUE INDEX "idx_unique_inscricao_municipal_em_empresa" ("inscricao_municipal"),
	UNIQUE INDEX "idx_unique_inscricao_estadual_em_empresa" ("inscricao_estadual"),
	UNIQUE INDEX "idx_unique_cnpj_em_empresa" ("cnpj")
);

CREATE TABLE IF NOT EXISTS "contato" (
    ID INT PRIMARY KEY NOT NULL,
    Telefone VARCHAR(15),
    Whatsapp VARCHAR(15),
    Email TEXT,
    "Site" TEXT
);

-- Tabela "telefone"
CREATE TABLE IF NOT EXISTS telefone (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    empresa_id INTEGER NOT NULL,
    numero TEXT,
    tipo TEXT CHECK (tipo IN ('Fixo', 'Celular', 'Comercial')),
    FOREIGN KEY (empresa_id) REFERENCES empresa(id)
);

-- Criação do indice para referenciar o valor da chave estrangeira do id da empresa na tabela telefone
CREATE INDEX IF NOT EXISTS idx_id_empresa_telefone ON telefone(empresa_id);

-- Tabela "email"
CREATE TABLE IF NOT EXISTS email_empresas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    empresa_id INTEGER NOT NULL,
    endereco TEXT,
    FOREIGN KEY (empresa_id) REFERENCES empresa(id)
);

-- Criação do indice para referenciar o valor da chave estrangeira do id da empresa na tabela email
CREATE INDEX IF NOT EXISTS idx_id_empresa_email ON email_empresas(empresa_id);

CREATE TABLE IF NOT EXISTS produto_pf (
	id INTEGER NOT NULL,
	codigo_de_barras INTEGER NOT NULL,
	nome TEXT NOT NULL,
	quantidade INTEGER NOT NULL,
	valor REAL NOT NULL,
    id_unidade_de_medida INTEGER NOT NULL,
    tamanho REAL NOT NULL,
	id_empresa INTEGER NOT NULL,
    id_marca INTEGER NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT "fk_id_marca_em_produto" FOREIGN KEY (id_marca) REFERENCES marca (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "fk_id_empresa_pf_em_produto" FOREIGN KEY (id_empresa) REFERENCES empresa_pf (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "fk_id_unidades_de_medida" FOREIGN KEY (id_unidade_de_medida) REFERENCES unidades_de_medida (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_codigo_de_barras_em_produto_pf ON produto_pf (codigo_de_barras);
CREATE INDEX IF NOT EXISTS idx_id_marca_produto_pf ON produto_pf (id_marca);
CREATE INDEX IF NOT EXISTS idx_id_empresa_pf_em_produto_pf ON produto_pf (id_empresa);
CREATE INDEX IF NOT EXISTS idx_id_unidade_de_medida_em_produto_pf ON produto_pf (id_unidade_de_medida);

CREATE TABLE IF NOT EXISTS produto_pj (
	id INTEGER NOT NULL,
	codigo_de_barras INTEGER NOT NULL,
	nome TEXT NOT NULL,
	quantidade INTEGER NOT NULL,
	valor REAL NOT NULL,
    id_unidade_de_medida INTEGER NOT NULL,
    tamanho REAL NOT NULL,
	id_empresa INTEGER NOT NULL,
    id_marca INTEGER NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT "fk_id_marca_em_produto" FOREIGN KEY (id_marca) REFERENCES marca (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "fk_id_empresa_pf_em_produto" FOREIGN KEY (id_empresa) REFERENCES empresa_pj (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "fk_id_unidades_de_medida_em_produto" FOREIGN KEY (id_unidade_de_medida) REFERENCES unidades_de_medida (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_codigo_de_barras_em_produto_pj ON produto_pj (codigo_de_barras);
CREATE INDEX IF NOT EXISTS idx_id_marca_produto_em_produto_pj ON produto_pj (id_marca);
CREATE INDEX IF NOT EXISTS idx_id_empresa_pj_em_produto_pj ON produto_pj (id_empresa);
CREATE INDEX IF NOT EXISTS idx_id_unidade_de_medida_em_produto_pj ON produto_pj (id_unidade_de_medida);

CREATE TABLE IF NOT EXISTS "contato_empresas_pf" (
	"id" INTEGER NOT NULL,
	"empresa_id" INTEGER NOT NULL,
	"email" TEXT,
	"telefone" VARCHAR(14),
	"whatsapp" VARCHAR(14),
	PRIMARY KEY ("id"),
	FOREIGN KEY ("empresa_id") REFERENCES "empresa_pf" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE INDEX IF NOT EXISTS "idx_id_empresa_contato_empresas_pf" ON "contato_empresas_pf" ("empresa_id");

CREATE TABLE IF NOT EXISTS "contato_empresas_pj" (
	"id" INTEGER NOT NULL,
	"empresa_id" INTEGER NOT NULL,
	"email" TEXT,
	"telefone" TEXT,
	"whatsapp" TEXT,
	PRIMARY KEY ("id"),
	FOREIGN KEY ("empresa_id") REFERENCES "empresa_pj" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE INDEX IF NOT EXISTS "idx_id_empresa_contato_empresas_pj" ON "contato_empresas_pj" ("empresa_id");

CREATE TABLE IF NOT EXISTS "unidades_de_medida" (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	nome TEXT NOT NULL
);


CREATE TABLE "produto" (
"id" INTEGER NOT NULL,
"nome" TEXT NOT NULL,
"descricao" TEXT,
"valor" INTEGER NOT NULL,
"tamanho" INTEGER NOT NULL,
"quantidade" INTEGER NOT NULL,
"id_unidade_de_armazenamento" INTEGER NOT NULL,
"id_unidades_de_medida" INTEGER NOT NULL,
"id_categoria" INTEGER NOT NULL,
"id_marca" INTEGER NOT NULL,
"id_tipo_de_produto" INTEGER NOT NULL,
PRIMARY KEY ("id"),
FOREIGN KEY ("id_marca") REFERENCES "marca" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
FOREIGN KEY ("id_categoria") REFERENCES "categoria" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
FOREIGN KEY ("id_unidades_de_medida") REFERENCES "unidades_de_medida" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
FOREIGN KEY ("id_unidade_de_armazenamento") REFERENCES "unidade_de_armazenamento" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
		FOREIGN KEY ("id_tipo_de_produto") REFERENCES "tipo_de_produto" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
	
);

CREATE INDEX IF NOT EXISTS "idx_id_marca" ON "produto" ("id_marca");
CREATE INDEX IF NOT EXISTS "idx_id_categoria_in_produto" ON "produto" ("id_categoria");
CREATE INDEX IF NOT EXISTS "idx_id_unidade_de_armazenamento_in_produto" ON "produto" ("id_unidade_de_armazenamento");
CREATE INDEX IF NOT EXISTS "idx_id_unidades_de_medida_in_produto" ON "produto" ("id_unidades_de_medida");
CREATE INDEX IF NOT EXISTS "idx_id_tipo_de_produto" ON "produto" ("id_tipo_de_produto");
