import * as SQLite from 'expo-sqlite';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

export class Endereco {

    db = SQLite.openDatabaseAsync('stock.db');

    async create(empresa: CreateEmpresaDto){
      try {
        const db = await this.db;
          const { tipo, nome_completo, data_de_nascimento, cpf, cnpj, id_endereco, nome_fantasia, razao_social } = empresa;
          if (tipo === 'PJ') {
            const data = {
              $nome_fantasia: String(nome_fantasia),
              $razao_social: String(razao_social),
              $cnpj: String(cnpj),
              $id_endereco: Number(id_endereco),
            }
            const result = await db.runAsync('INSERT INTO empresa (nome_fantasia, razao_social, cnpj, id_endereco) VALUES ($nome_fantasia, $razao_social, $cnpj, $id_endereco)', data);
            return { ...empresa, id:  result.lastInsertRowId, }
          } else {
            const data = { 
                $nome_completo: String(nome_completo), 
                $data_de_nascimento: String(data_de_nascimento?.toLocaleDateString()), 
                $cpf: String(cpf), 
                $id_endereco: Number(id_endereco),
            }
            const result = await db.runAsync('INSERT INTO empresa (nome_completo, data_de_nascimento, cpf, id_endereco) VALUES ($nome_completo, $data_de_nascimento, $cpf, $id_endereco)', data);
            return { ...empresa, id:  result.lastInsertRowId, }
          }
      } catch (error) {
        console.error(error);
        return { erro: true }
      }
    }

    async update(id: number, empresa: UpdateEmpresaDto){
      try {
        const db = await this.db;
        const { tipo, id_endereco, cnpj, cpf, data_de_nascimento, nome_completo, nome_fantasia, razao_social } = empresa;
        if (tipo === "PF") {
          const data = {
            $nome_completo: String(nome_completo),
            $data_de_nascimento: String(data_de_nascimento?.toLocaleDateString()),
            $cpf: String(cpf),
            $id_endereco: id_endereco,
          }

          await db.runAsync('UPDATE empresa SET nome_completo = $nome_completo, data_de_nascimento = $data_de_nascimento, cpf = $cpf, id_endereco = $id_endereco', data);
          
          return { ...empresa, id }
        
        } else {
          const data = {
            $nome_fantasia: String(nome_fantasia),
            $razao_social: String(razao_social),
            $cnpj: String(cnpj),
            $id_endereco: id_endereco,
          }
          await db.runAsync('UPDATE empresa SET nome_fantasia = $nome_fantasia, razao_social = $razao_social, cnpj = $cnpj, id_endereco = $id_endereco', data);
        
          return { ...empresa, id }
        }
      } catch (error) {
        console.error(error);
        return { error: true }
      }
    }

    async findAll() {
        try {
          const db = await this.db;
          const result = await db.getAllAsync(
            'SELECT * FROM empresa',
          );
          if (!result) {
            return { error: true };
          }
          return result;
        } catch (error) {
          console.error(error);
          return { error: true };
        }
    }

    async findUniqueByCpf(cpf: string){
        try {
            const db = await this.db;
            const result = await db.getFirstAsync(
              'SELECT * FROM empresa WHERE cpf = $cpf',
              { $cpf: cpf },
            );
            if (!result) {
              return { error: true };
            }
            return result;
          } catch (error) {
            console.error(error);
            return { error: true };
          }
    }

    async findAllByNomeCompleto(nome_completo: string){
        try {
            const db = await this.db;
            const result = await db.getAllAsync(
              'SELECT * FROM empresa WHERE nome_completo = $nome_completo',
              { $nome_completo: nome_completo },
            );
            if (!result) {
              return { error: true };
            }
            return result;
          } catch (error) {
            console.error(error);
            return { error: true };
          }
    }

    async findAllByNomeFantasia(nome_fantasia: string){
      try {
          const db = await this.db;
          const result = await db.getAllAsync(
            'SELECT * FROM empresa WHERE nome_fantasia = $nome_fantasia',
            { $nome_fantasia: nome_fantasia },
          );
          if (!result) {
            return { error: true };
          }
          return result;
        } catch (error) {
          console.error(error);
          return { error: true };
        }
    }

    async findAllByRazaoSocial(razao_social: string){
      try {
          const db = await this.db;
          const result = await db.getAllAsync(
            'SELECT * FROM empresa WHERE razao_social = $razao_social',
            { $razao_social: razao_social },
          );
          if (!result) {
            return { error: true };
          }
          return result;
        } catch (error) {
          console.error(error);
          return { error: true };
        }
    }

    async findUniqueByCnpj(cnpj: string){
      try {
        const db = await this.db;
        const result = await db.getFirstAsync(
          'SELECT * FROM empresa WHERE cnpj = $cnpj',
          { $cnpj: cnpj },
        );
        if (!result) {
          return { error: true };
        }
        return result;
      } catch (error) {
        console.error(error);
        return { error: true };
      }
    }

    async delete(id: number){
        try {
            const db = await this.db;
            const result = await db.runAsync(
            'DELETE * FROM endereco WHERE id = $id',
            { $id: id },
            );
            if (!result) {
            return { error: true };
            }
            return { sucess: true };
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    }

}