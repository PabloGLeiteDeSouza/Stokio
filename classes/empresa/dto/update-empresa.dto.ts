import { CreateEmpresaDto } from "./create-empresa.dto";

export class UpdateEmpresaDto extends CreateEmpresaDto {

    // Sobrecarga para atualização de Pessoa Física (PF)
    constructor(
        id: number,
        tipo: 'PF',
        id_endereco: number,
        nome_completo: string,
        data_de_nascimento: Date,
        cpf: string
    );
    // Sobrecarga para atualização de Pessoa Jurídica (PJ)
    constructor(
        id: number,
        tipo: 'PJ',
        id_endereco: number,
        razao_social: string,
        nome_fantasia: string,
        cnpj: string
    );
    // Implementação do construtor
    constructor(
        id: number,
        tipo: 'PF' | 'PJ',
        id_endereco: number,
        ...args: any[]
    ) {
        if (tipo === 'PF') {
            // Assegura que os atributos necessários para PF estão presentes
            if (args.length < 3) {
                throw new Error("Faltam atributos obrigatórios para atualização de Pessoa Física");
            }
            // Chama o construtor da superclasse para PF
            super(tipo, id_endereco, args[0], args[1], args[2], id);
        } else if (tipo === 'PJ') {
            // Assegura que os atributos necessários para PJ estão presentes
            if (args.length < 3) {
                throw new Error("Faltam atributos obrigatórios para atualização de Pessoa Jurídica");
            }
            // Chama o construtor da superclasse para PJ
            super(tipo, id_endereco, args[0], args[1], args[2], id);
        } else {
            throw new Error("Tipo de empresa inválido para atualização");
        }
    }
}
