import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDepartamentosVM } from '../src/UI/DepartamentosVM';
import { Departamento } from '../src/Domain/entities/Departamento';

export default function ListaDepartamentosScreen() {
  const router = useRouter();
  const {
    listaDepartamentos,
    isLoading,
    error,
    cargarDepartamentos,
    seleccionarDepartamento,
    eliminarDepartamento,
    limpiarError,
  } = useDepartamentosVM();

  useEffect(() => {
    cargarDepartamentos();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: limpiarError }]);
    }
  }, [error]);

  const handleEdit = (departamento: Departamento) => {
    seleccionarDepartamento(departamento);
    router.push(`editar-crear-departamento?departamentoId=${departamento.id}` as any);
  };

  const handleCreate = () => {
    seleccionarDepartamento(null);
    router.push('editar-crear-departamento' as any);
  };

  const handleDelete = (departamento: Departamento) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Está seguro de eliminar el departamento "${departamento.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarDepartamento(departamento.id),
        },
      ]
    );
  };

  const renderDepartamento = ({ item }: { item: Departamento }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🏢</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.nombre}</Text>
          <Text style={styles.id}>ID: {item.id}</Text>
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

  if (isLoading && listaDepartamentos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5cb85c" />
        <Text style={styles.loadingText}>Cargando departamentos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Departamentos</Text>
        <Text style={styles.count}>{listaDepartamentos.length} registros</Text>
      </View>

      <FlatList
        data={listaDepartamentos}
        renderItem={renderDepartamento}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshing={isLoading}
        onRefresh={cargarDepartamentos}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay departamentos registrados</Text>
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
    backgroundColor: '#5cb85c',
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 24,
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
  id: {
    fontSize: 14,
    color: '#666',
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
    backgroundColor: '#5cb85c',
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