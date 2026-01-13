import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDepartamentosVM } from '../src/UI/DepartamentosVM';
import { Departamento } from '../src/Domain/entities/Departamento';

export default function EditarCrearDepartamentoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const departamentoId = params.departamentoId ? Number(params.departamentoId) : undefined;
  const isEditing = departamentoId !== undefined;

  const {
    departamentoSeleccionado,
    isLoading,
    error,
    guardarDepartamento,
    limpiarError,
  } = useDepartamentosVM();

  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (isEditing && departamentoSeleccionado) {
      setNombre(departamentoSeleccionado.nombre);
    }
  }, [isEditing, departamentoSeleccionado]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: limpiarError }]);
    }
  }, [error]);

  const validateForm = (): boolean => {
    if (!nombre.trim()) {
      Alert.alert('Validación', 'El nombre es requerido');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const departamento = new Departamento(
      isEditing ? departamentoId! : 0,
      nombre
    );

    const success = await guardarDepartamento(departamento);
    if (success) {
      Alert.alert(
        'Éxito',
        isEditing
          ? 'Departamento actualizado correctamente'
          : 'Departamento creado correctamente',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {isEditing ? 'Editar Departamento' : 'Nuevo Departamento'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.iconSection}>
            <View style={styles.bigIconContainer}>
              <Text style={styles.bigIcon}>🏢</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre del Departamento *</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ingrese el nombre del departamento"
              placeholderTextColor="#999"
              autoFocus
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.saveButtonText}>Guardar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flex: {
    flex: 1,
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
  form: {
    padding: 20,
    flex: 1,
  },
  iconSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  bigIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigIcon: {
    fontSize: 50,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 'auto',
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#5cb85c',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});