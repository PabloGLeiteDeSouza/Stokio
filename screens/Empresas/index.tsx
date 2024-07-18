import {
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Textarea,
  TextareaInput,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  InputSlot,
} from '@gluestack-ui/themed';
import {
  Input,
  InputField,
  InputIcon,
  Center,
  VStack,
  Heading,
  Icon,
  SearchIcon,
  FormControl,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CadastrarEmpresasScreen from './Cadastrar';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenComponentType } from '../../types';
import { useThemeApp } from '$providers/theme';
import { Empresa } from '../../classes/empresa';
import * as SplashScreen from 'expo-splash-screen';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import { formatStringDate } from 'utils';
import { AddIcon } from '@gluestack-ui/themed';
import LoadingScreen from '$components/LoadingScreen';
import View from './view';
import Create from './create';
import Update from './update';

const Stack = createNativeStackNavigator();

const EmpresasScreens: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="listar-empresas">
      <Stack.Screen
        name="listar-empresas"
        component={View}
        options={{
          title: 'Listar Empresas',
        }}
      />
      <Stack.Screen
        name="cadastrar-empresas"
        component={Create}
        options={{
          title: 'Cadastrar Empresas',
        }}
      />
      <Stack.Screen
        name="editar-empresas"
        component={Update}
        options={{
          title: 'Atualizar Empresas',
        }}
      />
    </Stack.Navigator>
  );
};

export default EmpresasScreens;
