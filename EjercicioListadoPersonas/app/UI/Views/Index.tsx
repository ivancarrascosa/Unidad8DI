import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Animated } from "react-native";
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

  const AnimatedPressable = ({ item }: { item: Persona }) => {
    const scale = useRef(new Animated.Value(1)).current;
    
    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.97,
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
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={isSelected ? ['#667eea', '#764ba2'] : ['#f093fb', '#f5576c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>
                  {item.nombre.charAt(0)}{item.apellido.charAt(0)}
                </Text>
              </LinearGradient>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.nombreText}>{item.nombre} {item.apellido}</Text>
              <Text style={styles.subtitleText}>ID: {item.id}</Text>
            </View>
            {isSelected && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>✨ Personas</Text>
          {viewModel.personaSeleccionada && (
            <View style={styles.selectedBanner}>
              <Text style={styles.selectedLabel}>Seleccionado:</Text>
              <Text style={styles.selectedName}>
                {viewModel.personaSeleccionada.nombre} {viewModel.personaSeleccionada.apellido}
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
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  selectedBanner: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 16,
    padding: 16,
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  selectedLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  selectedName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
    padding: 12,
    backdropFilter: "blur(20px)",
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: {
    backgroundColor: "#FFF",
    borderColor: "#667eea",
    shadowColor: "#667eea",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  textContainer: {
    flex: 1,
  },
  nombreText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#667eea",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
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
});

export default PeopleList;