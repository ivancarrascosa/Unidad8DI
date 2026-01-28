import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { usePersonasVM } from '../src/UI/PersonasVM';
import { Persona } from '../src/Domain/entities/Persona';
import { Picker } from '@react-native-picker/picker';

// Componente de fecha que funciona en web y móvil
const DateInput = ({ value, onChange }: { value: Date | null; onChange: (date: Date | null) => void }) => {
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (text: string) => {
    if (text) {
      const date = new Date(text + 'T00:00:00');
      if (!isNaN(date.getTime())) {
        onChange(date);
      }
    } else {
      onChange(null);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <input
        type="date"
        value={formatDateForInput(value)}
        onChange={(e) => handleDateChange(e.target.value)}
        max={formatDateForInput(new Date())}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 10,
          padding: 15,
          fontSize: 16,
          borderWidth: 1,
          borderColor: '#ddd',
          color: '#333',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    );
  }

  // Para móvil, usamos TextInput con formato de fecha
  return (
    <TextInput
      style={styles.input}
      value={formatDateForInput(value)}
      onChangeText={handleDateChange}
      placeholder="AAAA-MM-DD"
      placeholderTextColor="#999"
    />
  );
};

export default function EditarCrearPersonaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const personaId = params.personaId ? Number(params.personaId) : undefined;
  const isEditing = personaId !== undefined;

  const {
    personaSeleccionada,
    listaDepartamentos,
    isLoading,
    error,
    guardarPersona,
    cargarDepartamentos,
    limpiarError,
  } = usePersonasVM();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNac: null as Date | null,
    direccion: '',
    telefono: '',
    imagen: '',
    idDepartamento: 0,
  });

  useEffect(() => {
    cargarDepartamentos();
  }, []);

  useEffect(() => {
    if (isEditing && personaSeleccionada) {
      setFormData({
        nombre: personaSeleccionada.nombre || '',
        apellido: personaSeleccionada.apellido || '',
        fechaNac: personaSeleccionada.fechaNac,
        direccion: personaSeleccionada.direccion || '',
        telefono: personaSeleccionada.telefono || '',
        imagen: personaSeleccionada.imagen || '',
        idDepartamento: personaSeleccionada.idDepartamento || 0,
      });
    }
  }, [isEditing, personaSeleccionada]);

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'web') {
        window.alert(error);
        limpiarError();
      } else {
        Alert.alert('Error', error, [{ text: 'OK', onPress: limpiarError }]);
      }
    }
  }, [error]);

  const handleChange = (field: string, value: string | number | Date | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const showAlert = (mensaje: string) => {
    if (Platform.OS === 'web') {
      window.alert(mensaje);
    } else {
      Alert.alert('Validación', mensaje);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      showAlert('El nombre es requerido');
      return false;
    }
    if (!formData.apellido.trim()) {
      showAlert('El apellido es requerido');
      return false;
    }
    if (!formData.telefono.trim()) {
      showAlert('El teléfono es requerido');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const persona = new Persona(
      isEditing ? personaId! : 0,
      formData.nombre,
      formData.apellido,
      formData.fechaNac,
      formData.direccion,
      formData.telefono,
      formData.imagen,
      formData.idDepartamento
    );

    const success = await guardarPersona(persona);
    if (success) {
      router.push('/lista-personas' as any);
    }
  };

  const handleBack = () => {
    router.push('/lista-personas' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>
              {isEditing ? 'Editar Persona' : 'Nueva Persona'}
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre *</Text>
              <TextInput
                style={styles.input}
                value={formData.nombre}
                onChangeText={(value) => handleChange('nombre', value)}
                placeholder="Ingrese el nombre"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Apellido *</Text>
              <TextInput
                style={styles.input}
                value={formData.apellido}
                onChangeText={(value) => handleChange('apellido', value)}
                placeholder="Ingrese el apellido"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fecha de Nacimiento</Text>
              <DateInput
                value={formData.fechaNac}
                onChange={(date) => handleChange('fechaNac', date)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dirección</Text>
              <TextInput
                style={styles.input}
                value={formData.direccion}
                onChangeText={(value) => handleChange('direccion', value)}
                placeholder="Ingrese la dirección"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Teléfono *</Text>
              <TextInput
                style={styles.input}
                value={formData.telefono}
                onChangeText={(value) => handleChange('telefono', value)}
                placeholder="Ingrese el teléfono"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>URL de Imagen</Text>
              <TextInput
                style={styles.input}
                value={formData.imagen}
                onChangeText={(value) => handleChange('imagen', value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Departamento</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.idDepartamento}
                  onValueChange={(value) => handleChange('idDepartamento', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Seleccione un departamento" value={0} />
                  {listaDepartamentos.map((dept) => (
                    <Picker.Item
                      key={dept.id}
                      label={dept.nombre}
                      value={dept.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleBack}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#4a90d9',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  form: {
    padding: 20,
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
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
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
    backgroundColor: '#4a90d9',
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
