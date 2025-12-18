import { container } from "@/app/Core/container";
import { useState } from "react";
import { IndexVM } from "../ViewModels/IndexVM";
import { TYPES } from "@/app/Core/types";
import { Pokemon } from "@/app/Domain/Entities/Pokemon";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, StatusBar } from "react-native";

const IndexView = () => {
  const [viewModel] = useState(() => {
    return container.get<IndexVM>(TYPES.IndexVM);
  });

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadPokemon = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newPokemon = await viewModel.obtenerPokemon();
      setPokemonList(newPokemon);
    } catch (err) {
      setError('Error al cargar los Pokémon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getBackgroundColor = (index: number) => {
    const colors = ['#FFE5E5', '#E5F3FF', '#FFF9E5', '#E5FFE5', '#F3E5FF', '#FFE5F3'];
    return colors[index % colors.length];
  };

  const renderPokemonItem = ({ item, index }: { item: Pokemon; index: number }) => (
    <View style={[styles.card, { backgroundColor: getBackgroundColor(index) }]}>
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <Text style={styles.pokemonNumber}>#{item.getId()}</Text>
          <Text style={styles.pokemonName}>{capitalizeFirstLetter(item.name)}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.pokemonIcon}>⚡</Text>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>🎮 PokéDex</Text>
      <Text style={styles.subtitle}>Carga 20 Pokémon con el botón</Text>
    </View>
  );

  const renderEmpty = () => (
    !loading && (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyText}>No hay Pokémon cargados</Text>
        <Text style={styles.emptySubtext}>Pulsa el botón para comenzar</Text>
      </View>
    )
  );

  const renderFooter = () => (
    loading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Cargando Pokémon...</Text>
      </View>
    )
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
        </View>
      )}

      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.fab, loading && styles.fabDisabled]}
        onPress={handleLoadPokemon}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>{loading ? '⏳' : '🔄'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  pokemonNumber: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '500',
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonIcon: {
    fontSize: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  errorText: {
    color: '#991b1b',
    fontSize: 14,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabDisabled: {
    backgroundColor: '#cbd5e1',
  },
  fabIcon: {
    fontSize: 28,
  },
});

export default IndexView;