import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const STATS = [
  { label: 'Pontos Totais', value: '1880' },
  { label: 'Streak Atual', value: '7' },
  { label: 'Posição', value: '#3' },
  { label: 'Insígnias', value: '7' },
];

const RECENT_BADGES = [
  { label: 'Primeiro Passo', icon: '🚀' },
  { label: 'Streak de 7', icon: '🔥' },
  { label: 'Top 10', icon: '🏆' },
  { label: 'Maratonista', icon: '⚡' },
  { label: 'Hackathon', icon: '🖥️' },
];

export default function Profile() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBlock}>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
        <Text style={styles.name}>Aluno</Text>
        <Text style={styles.subtitle}>Curso</Text>
        <Text style={styles.caption}>Semestre</Text>
      </View>

      <View style={styles.statsGrid}>
        {STATS.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Conquistas Recentes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.achievementsRow}
      >
        {RECENT_BADGES.map((badge) => (
          <View key={badge.label} style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementEmoji}>{badge.icon}</Text>
            </View>
            <Text style={styles.achievementLabel} numberOfLines={1}>
              {badge.label}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 140,
    backgroundColor: '#0d1424',
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#0f62ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarIcon: {
    fontSize: 40,
    color: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#8e9cca',
    fontSize: 14,
    marginTop: 4,
  },
  caption: {
    color: '#7a89b8',
    fontSize: 12,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#101a35',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#293259',
    padding: 16,
    marginBottom: 12,
  },
  statValue: {
    color: '#0f62ff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  statLabel: {
    color: '#8e9cca',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  achievementsRow: {
    paddingBottom: 18,
  },
  achievementCard: {
    width: 100,
    height: 120,
    backgroundColor: '#101a35',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#293259',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#15204a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementEmoji: {
    fontSize: 22,
  },
  achievementLabel: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#1f1b34',
    borderColor: '#7b1b3a',
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff4d6d',
    fontSize: 14,
    fontWeight: '700',
  },
});