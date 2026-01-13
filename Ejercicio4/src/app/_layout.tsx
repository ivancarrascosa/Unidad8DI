import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IndexScreen } from './index';
import { ListaPersonasScreen } from './listaPersonasScreen';
import { EditarCrearPersonaScreen } from './EditarCrearPersonaScreen';
import { ListaDepartamentosScreen } from './ListaDepartamentosScreen';
import { EditarCrearDepartamentoScreen } from './EditarCrearDepartamentoScreen';

export type RootStackParamList = {
  Index: undefined;
  ListaPersonas: undefined;
  EditarCrearPersona: { personaId?: number };
  ListaDepartamentos: undefined;
  EditarCrearDepartamento: { departamentoId?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="ListaPersonas" component={ListaPersonasScreen} />
        <Stack.Screen
          name="EditarCrearPersona"
          component={EditarCrearPersonaScreen}
        />
        <Stack.Screen
          name="ListaDepartamentos"
          component={ListaDepartamentosScreen}
        />
        <Stack.Screen
          name="EditarCrearDepartamento"
          component={EditarCrearDepartamentoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};