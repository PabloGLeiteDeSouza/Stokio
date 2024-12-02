import React from 'react';
import {
  Heading,
} from '@gluestack-ui/themed';
import { Box, ScrollView } from '@gluestack-ui/themed';
import { CadastrarProdutoScreen } from '@/interfaces/produto';
import LoadingScreen from '@/components/LoadingScreen';
import UmService from '@/classes/um/um.service';
import { useSQLiteContext } from 'expo-sqlite';
import MarcaService from '@/classes/marca/marca.service';
import TipoProdutoService from '@/classes/tipo_produto/tipo_produto.service';
import UaService from '@/classes/ua/ua.service';
import { EmpresaService } from '@/classes/empresa/empresa.service';
import { Alert } from 'react-native';
import FormCreateProduto from '@/components/Forms/produto';

const Create: React.FC<CadastrarProdutoScreen> = ({ navigation, route }) => {
  const [haveMarca, setHaveMarca] = React.useState(true);
  const [haveTipoProduto, setHaveTipoProduto] = React.useState(false);
  const [haveUnidadeDeMedida, setHaveUnidadeDeMedida] = React.useState(false);
  const [haveUnidadeDeArmazenamento, setHaveUnidadeDeArmazenamento] =
    React.useState(false);
  const [HaveEmpresa, setHaveEmpresa] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = useSQLiteContext();
  React.useEffect(() => {
    async function start() {
      try {
        setHaveMarca((await new MarcaService(db).haveMarca()));
        setHaveTipoProduto((await new TipoProdutoService(db).haveTipoProduto()));
        setHaveUnidadeDeMedida((await new UmService(db).getAll()).length > 0);
        if ((await new UaService(db).findAll()).length <= 0) {
          throw new Error('Não há unidades de armazenamento cadastrados', { cause: 'ERR_EXISTS_UA' });
        }
        setHaveUnidadeDeArmazenamento(true);
        if ((await new EmpresaService(db).findAll()).length <= 0) {
          throw new Error('Não há empresas cadastradas', { cause: 'ERR_EXISTS_EMPRESAS' });
        }
        setHaveEmpresa(true);
        setIsLoading(false);
      } catch (error) {
        const err = error as Error;
        Alert.alert('Error', err.message);
        const cause = err.cause as 'ERR_EXISTS_EMPRESAS' | 'ERR_EXISTS_UA';
        if(cause === 'ERR_EXISTS_EMPRESAS'){
          navigation?.goBack();
          navigation?.navigate('screens-empresas');
        }
        if (cause === 'ERR_EXISTS_UA') {
          navigation?.goBack();
          navigation?.navigate('screens-uas');
        }
        setIsLoading(false);
        throw error;
      }
    }
    start();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Box mx="$2">
      <ScrollView>
        <Box mt="$5" mx="$8">
          <Box mb="$8">
            <Heading textAlign="center" size="xl">
              Cadastre o Produto abaixo
            </Heading>
          </Box>
          <Box gap="$8" mb="$10">
            <FormCreateProduto
              onCreatedProduto={() => {
                navigation?.goBack();
              }}
              db={db}
              onRedirectProductExists={() => {
                navigation?.goBack();
              }}
              haveEmpresas={HaveEmpresa}
              haveMarcas={haveMarca}
              haveTiposProdutos={haveTipoProduto}
              haveUas={haveUnidadeDeArmazenamento}
              haveUms={haveUnidadeDeMedida}
              onCodeScanner={() => {
                navigation?.navigate('code-scanner', { screen: 'cadastrar-produto' })
              }}
              onCreateEmpresa={() => {
                navigation?.navigate('screens-empresas');
              }}
              onCreateUa={() => {
                navigation?.navigate('screens-uas');
              }}
              onSelectEmpresa={(empresaSelecionada) => {
                navigation?.navigate('selecionar-empresa', { screen: 'cadastrar-produto', empresaSelecionada });
              }}
              onSelectMarca={(marcaSelecionada) => {
                navigation?.navigate('selecionar-marca', { screen: 'cadastrar-produto', marcaSelecionada });
              }}
              onSelectTipoProduto={(tipoProdutoSelecionado) => {
                navigation?.navigate('selecionar-tipo-produto', { screen: 'cadastrar-produto', tipoProdutoSelecionado });
              }}
              onSelectUa={(uaSelecionada) => {
                navigation?.navigate('selecionar-ua', { screen: 'cadastrar-produto', uaSelecionada });
              }}
              onSelectUm={(umSelecionado) => {
                navigation?.navigate('selecionar-um', { screen: 'cadastrar-produto', umSelecionado });
              }}
              code={route?.params?.code}
              empresa={route?.params?.empresa}
              marca={route?.params?.marca}
              tipo_produto={route?.params?.tipo_produto}
              um={route?.params?.um}
              ua={route?.params?.ua}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Create;
