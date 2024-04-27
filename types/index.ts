export type RootStackParamList = {
    "cadastrar-produtos"?: { code?: string, result?: boolean};
    "code-scanner"?: { screen: string, type: string };
    "listar-produtos"?: { code?: string; result?: boolean };
    "listar-empresas"?: {  };
    "listar-clientes"?: {  };
    "cadastrar-clientes"?: {};
    "cadastrar-empresas"?: {};
    "tab-bottom"?: {};
    "auth-screen"?: {};
};

export type ScreensScanCode = "cadastrar-produtos" | "listar-produtos";