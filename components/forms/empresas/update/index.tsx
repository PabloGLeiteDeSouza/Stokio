import { Box } from '@gluestack-ui/themed';
import { FormUpdateEmpresasScreenProps } from './types';
import LoadingScreen from '$components/LoadingScreen';
import { ScrollView } from '@gluestack-ui/themed';
import React from 'react';
import { Formik } from 'formik';

const FormUpdateEmpresas: React.FC<FormUpdateEmpresasScreenProps> = ({
  isLoading,
  onLoading,
  data,
  onFail,
  onSucess,
}) => {
  React.useEffect(() => {
    onLoading();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (data.tipo_empresa === 'pf') {
    return (
      <Box>
        <ScrollView>
          <Formik initialValues={data} validate={}></Formik>
        </ScrollView>
      </Box>
    );
  }
  if (data.tipo_empresa === 'pj') {
    return (
      <Box>
        <ScrollView></ScrollView>
      </Box>
    );
  }
};

export default FormUpdateEmpresas;
