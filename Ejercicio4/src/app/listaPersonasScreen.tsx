import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePersonasVM } from '../UI/PersonasVM';
import { Persona } from '../Domain/entities/Persona';
import { RootStackParamList } from './_layout';

type ListaPersonasNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ListaPersonas'>;

interface Props {
  navigation: ListaPersonasNavigationProp;
}

export const ListaPersonasScreen: React.FC<Props> = ({ navigation }) => {
  const {
    listaPersonas,
    isLoading,
    error,
    cargarPersonas,
    seleccionarPersona,
    eliminarPersona,
    limpiarError,
  } = usePersonasVM();

  useEffect(() => {
    cargarPersonas();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: limpiarError }]);
    }
  }, [error]);

  const handleEdit = (persona: Persona) => {
    seleccionarPersona(persona);
    navigation.navigate('EditarCrearPersona', { personaId: persona.id });
  };

  const handleCreate = () => {
    seleccionarPersona(null);
    navigation.navigate('EditarCrearPersona', {});
  };

  const handleDelete = (persona: Persona) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Está seguro de eliminar a ${persona.nombre} ${persona.apellido}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarPersona(persona.id),
        },
      ]
    );
  };

  const renderPersona = ({ item }: { item: Persona }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {item.imagen ? (
          <Image source={{ uri: item.imagen }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>
              {item.nombre.charAt(0)}{item.apellido.charAt(0)}
            </Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{item.nombre} {item.apellido}</Text>
          <Text style={styles.detail}>📞 {item.telefono}</Text>
          <Text style={styles.detail}>📍 {item.direccion}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.actionButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.actionButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading && listaPersonas.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90d9" />
        <Text style={styles.loadingText}>Cargando personas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Personas</Text>
        <Text style={styles.count}>{listaPersonas.length} registros</Text>
      </View>

      <FlatList
        data={listaPersonas}
        renderItem={renderPersona}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshing={isLoading}
        onRefresh={cargarPersonas}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay personas registradas</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleCreate}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4a90d9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  count: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  list: {
    padding: 15,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  avatarPlaceholder: {
    backgroundColor: '#4a90d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#f0ad4e',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
  },
  actionButtonText: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4a90d9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});