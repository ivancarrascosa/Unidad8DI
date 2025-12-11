import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { 
  FlatList, 
  Pressable, 
  StyleSheet, 
  Text, 
  View, 
  Animated, 
  ActivityIndicator,
  RefreshControl,
  Image 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PersonasListaVM } from "../ViewModels/PersonasListaVM";
import { container } from "@/app/Core/container";
import { TYPES } from "@/app/Core/types";
import { Persona } from "@/app/Domain/Entities/Persona";
import { LinearGradient } from 'expo-linear-gradient';

const PeopleList = observer(() => {
  const vmRef = useRef<PersonasListaVM | null>(null);
  
  if (vmRef.current === null) {
    vmRef.current = container.get<PersonasListaVM>(TYPES.PersonasListaVM);
  }
  
  const viewModel = vmRef.current;

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const AnimatedPressable = ({ item }: { item: Persona }) => {
    const scale = useRef(new Animated.Value(1)).current;
    
    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    };
    
    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };
    
    const isSelected = viewModel.personaSeleccionada.id === item.id;
    
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPress={() => { viewModel.personaSeleccionada = item; }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={[styles.card, isSelected && styles.cardSelected]}>
            {/* Imagen de perfil */}
            <View style={styles.imageContainer}>
              {item.imagen ? (
                <Image 
                  source={{ uri: item.imagen }} 
                  style={styles.profileImage}
                  defaultSource={require('@/assets/images/icon.png')}
                />
              ) : (
                <LinearGradient
                  colors={isSelected ? ['#667eea', '#764ba2'] : ['#f093fb', '#f5576c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.profileImagePlaceholder}
                >
                  <Text style={styles.placeholderText}>
                    {item.nombre.charAt(0)}{item.apellido.charAt(0)}
                  </Text>
                </LinearGradient>
              )}
              {isSelected && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>

            {/* Información de la persona */}
            <View style={styles.infoContainer}>
              <Text style={styles.nombreText}>
                {item.nombre} {item.apellido}
              </Text>
              
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <Text style={styles.detailText}>{formatDate(item.fechaNac)}</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>📞</Text>
                  <Text style={styles.detailText}>{item.telefono}</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>📍</Text>
                  <Text style={styles.detailText} numberOfLines={1}>
                    {item.direccion}
                  </Text>
                </View>
              </View>

              <View style={styles.footerRow}>
                <View style={styles.idBadge}>
                  <Text style={styles.idBadgeText}>ID: {item.id}</Text>
                </View>
                <View style={styles.deptBadge}>
                  <Text style={styles.deptBadgeText}>Dept. {item.idDepartamento}</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  // Componente de Loading
  if (viewModel.isLoading && viewModel.personasList.length === 0) {
    return (
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Cargando personas...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Componente de Error
  if (viewModel.error) {
    return (
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Error al cargar</Text>
            <Text style={styles.errorText}>{viewModel.error}</Text>
            <Pressable 
              style={styles.retryButton}
              onPress={() => viewModel.recargarPersonas()}
            >
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>✨ Directorio de Personas</Text>
          <Text style={styles.subtitulo}>
            {viewModel.personasList.length} {viewModel.personasList.length === 1 ? 'persona' : 'personas'}
          </Text>
          
          {viewModel.personaSeleccionada && viewModel.personaSeleccionada.id !== 0 && (
            <View style={styles.selectedBanner}>
              <Text style={styles.selectedLabel}>✓ Seleccionado:</Text>
              <Text style={styles.selectedName}>
                {viewModel.personaSeleccionada.nombre} {viewModel.personaSeleccionada.apellido}
              </Text>
              <Text style={styles.selectedPhone}>
                {viewModel.personaSeleccionada.telefono}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={viewModel.personasList}
            renderItem={({ item }) => <AnimatedPressable item={item} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>👥</Text>
                <Text style={styles.emptyText}>No hay personas registradas</Text>
                <Text style={styles.emptySubtext}>Agrega tu primera persona para comenzar</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={viewModel.isLoading}
                onRefresh={() => viewModel.recargarPersonas()}
                tintColor="#FFFFFF"
                colors={["#667eea"]}
              />
            }
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 16,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 12,
  },
  selectedBanner: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginTop: 8,
  },
  selectedLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  selectedName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  selectedPhone: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  listContent: {
    paddingVertical: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: "#667eea",
    shadowColor: "#667eea",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: "#F8F9FF",
  },
  imageContainer: {
    marginRight: 16,
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  selectedBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#667eea",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  nombreText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  detailText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
    flex: 1,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  idBadge: {
    backgroundColor: "#E8EAFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  idBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#667eea",
  },
  deptBadge: {
    backgroundColor: "#FFE8F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deptBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#f5576c",
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#667eea",
  },
});

export default PeopleList