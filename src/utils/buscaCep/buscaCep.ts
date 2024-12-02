import { BuscaCepObjectResult } from "./types";

export default async function buscaCep(cep:string): Promise<BuscaCepObjectResult> {
    try {
        const data: BuscaCepObjectResult = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(async (vl) => await vl.json());
        return data;
    } catch (error) {
        throw error;
    }
}