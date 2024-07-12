import * as SQLite from 'expo-sqlite';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

export class Endereco {

  private db: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase){
    this.db = db;
  }

    async create(endereco: CreateEnderecoDto){
        const { rua, numero, cep, complemento, bairro, cidade, UF } = endereco;
        const data = { 
          $rua: rua, 
          $numero: numero, 
          $cep: cep, 
          $complemento: complemento, 
          $bairro: bairro, 
          $cidade: cidade, 
          $UF: UF 
        }
        try {
          const db = await this.db;
          console.log("chegou", await db.execAsync('SELECT * from empresas'))
            const result = await db.runAsync('INSERT INTO endereco (rua, numero, cep, complemento, bairro, cidade, UF) VALUES ($rua, $numero, $cep, $complemento, $bairro, $cidade, $UF)', data);
            if (!result) {
                throw new Error('Erro não foi possível executar a query')
            }
            await db.closeAsync();
            return { ...endereco, id: result.lastInsertRowId, };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(endereco: UpdateEnderecoDto){
        const { rua, numero, cep, complemento, bairro, cidade, UF } = endereco;
        const data = { 
            $rua: rua, 
            $numero: numero, 
            $cep: cep, 
            $complemento: complemento, 
            $bairro: bairro, 
            $cidade: cidade, 
            $UF: UF 
        }
        try {
            const db = await this.db;
            const result = await db.runAsync('UPDATE SET rua = $rua, numero = $numero, cep = $cep, complemento = $complemento, bairro = $bairro, cidade = $cidade, UF = $UF', data);
            if (!result) {
                return { error: true }
            }
            await db.closeAsync();
            return { ...endereco, id: result.lastInsertRowId, };
        } catch (error) {
            console.error(error);
            await (await this.db).closeAsync();
            return { error: true }
        }
    }

    async findAll() {
        try {
          const db = await this.db;
          const result = await db.getAllAsync(
            'SELECT * FROM endereco',
          );
          if (!result) {
            return { error: true };
          }
          await db.closeAsync();
          return result;
        } catch (error) {
          console.error(error);
          await (await this.db).closeAsync();
          return { error: true };
        }
    }

    async findAllByCep(cep: string){
        try {
            const db = await this.db;
            const result = await db.getAllAsync(
              'SELECT * FROM endereco WHERE cep = $cep',
              { $cep: cep },
            );
            if (!result) {
              return { error: true };
            }
            await db.closeAsync();
            return result;
          } catch (error) {
            console.error(error);
            await (await this.db).closeAsync();
            return { error: true };
          }
    }

    async findAllByRua(rua: string){
        try {
            const db = await this.db;
            const result = await db.getAllAsync(
              'SELECT * FROM endereco WHERE rua = $rua',
              { $rua: rua },
            );
            if (!result) {
              return { error: true };
            }
            return result;
          } catch (error) {
            console.error(error);
            await (await this.db).closeAsync();
            return { error: true };
          }
    }

    async findAllByBairro(bairro: string){
        try {
            const db = await this.db;
            const result = await db.getAllAsync(
              'SELECT * FROM endereco WHERE bairro = $bairro',
              { $bairro: bairro },
            );
            if (!result) {
              return { error: true };
            }
            return result;
          } catch (error) {
            console.error(error);
            await (await this.db).closeAsync();
            return { error: true };
          }
    }

    async findAllByCidade(cidade: string){
        try {
            const db = await this.db;
            const result = await db.getAllAsync(
              'SELECT * FROM endereco WHERE cidade = $cidade',
              { $cidade: cidade },
            );
            if (!result) {
              return { error: true };
            }
            return result;
          } catch (error) {
            console.error(error);
            await (await this.db).closeAsync();
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
            await (await this.db).closeAsync();
            return { error: true };
        }
    }

}