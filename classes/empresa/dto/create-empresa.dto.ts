export class CreateEmpresaDto {
    id?: number;
    nome_completo?: string;
    data_de_nascimento?: Date;
    cpf?: string;
    nome_fantasia?: string;
    razao_social?: string;
    cnpj?: string;
    tipo: 'PF' | 'PJ';
    id_endereco: number;

    // Sobrecarga para Pessoa Jurídica (PJ)
    constructor(
        tipo: 'PJ',
        id_endereco: number,
        razao_social: string,
        nome_fantasia: string,
        cnpj: string,
        id?: number
    );
    // Sobrecarga para Pessoa Física (PF)
    constructor(
        tipo: 'PF',
        id_endereco: number,
        nome_completo: string,
        data_de_nascimento: Date,
        cpf: string,
        id?: number
    );
    // Implementação do construtor
    constructor(
        tipo: 'PF' | 'PJ',
        id_endereco: number,
        ...args: any[]
    ) {
        this.id_endereco = id_endereco;
        this.tipo = tipo;

        if (tipo === 'PF') {
            // Assegura que os atributos necessários para PF estão presentes
            if (args.length < 3) {
                throw new Error("Faltam atributos obrigatórios para Pessoa Física");
            }
            this.nome_completo = args[0];
            this.data_de_nascimento = args[1];
            this.cpf = args[2];
            if (args[3] !== undefined) this.id = args[3];
        } else if (tipo === 'PJ') {
            // Assegura que os atributos necessários para PJ estão presentes
            if (args.length < 3) {
                throw new Error("Faltam atributos obrigatórios para Pessoa Jurídica");
            }
            this.razao_social = args[0];
            this.nome_fantasia = args[1];
            this.cnpj = args[2];
            if (args[3] !== undefined) this.id = args[3];
        } else {
            throw new Error("Tipo de empresa inválido");
        }
    }
}
