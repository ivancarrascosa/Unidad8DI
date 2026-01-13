import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './_layout';


type IndexScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Index'>;

interface Props {
  navigation: IndexScreenNavigationProp;
}

export const IndexScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Personal</Text>
        <Text style={styles.subtitle}>Sistema de administración</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Bienvenido al sistema de gestión de personal y departamentos.
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.personasButton]}
            onPress={() => navigation.navigate('ListaPersonas')}
          >
            <Text style={styles.buttonIcon}>👥</Text>
            <Text style={styles.buttonText}>Personas</Text>
            <Text style={styles.buttonDescription}>Gestionar empleados</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.departamentosButton]}
            onPress={() => navigation.navigate('ListaDepartamentos')}
          >
            <Text style={styles.buttonIcon}>🏢</Text>
            <Text style={styles.buttonText}>Departamentos</Text>
            <Text style={styles.buttonDescription}>Gestionar áreas</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 - Sistema de Gestión</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#4a90d9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  personasButton: {
    backgroundColor: '#4a90d9',
  },
  departamentosButton: {
    backgroundColor: '#5cb85c',
  },
  buttonIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonDescription: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
});