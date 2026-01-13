import 'reflect-metadata';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="lista-personas" />
      <Stack.Screen name="editar-crear-persona" />
      <Stack.Screen name="lista-departamentos" />
      <Stack.Screen name="editar-crear-departamento" />
    </Stack>
  );
}