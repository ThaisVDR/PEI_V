import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
  { key: 'todas', label: 'Todas' },
  { key: 'academico', label: 'Acadêmico' },
  { key: 'eventos', label: 'Eventos' },
  { key: 'projetos', label: 'Projetos' },
];

const BADGES = [
  { id: '1', title: 'Primeiro Passo', icon: '🚀', category: 'academico', unlocked: true },
  { id: '2', title: 'Streak de 7', icon: '🔥', category: 'academico', unlocked: true },
  { id: '3', title: 'Top 10', icon: '🏆', category: 'eventos', unlocked: true },
  { id: '4', title: 'Maratonista', icon: '⚡', category: 'academico', unlocked: false },
  { id: '5', title: 'Nota Máxima', icon: '💯', category: 'academico', unlocked: false },
  { id: '6', title: 'Leitor Voraz', icon: '📚', category: 'academico', unlocked: false },
  { id: '7', title: 'Hackathon', icon: '🖥️', category: 'eventos', unlocked: true },
  { id: '8', title: 'Palestras', icon: '🎤', category: 'eventos', unlocked: true },
  { id: '9', title: 'Voluntário', icon: '🤝', category: 'projetos', unlocked: false },
  { id: '10', title: 'Workshop', icon: '🛠️', category: 'eventos', unlocked: false },
  { id: '11', title: 'Pesquisador', icon: '🧠', category: 'projetos', unlocked: true },
  { id: '12', title: 'GitHub Pro', icon: '👑', category: 'projetos', unlocked: false },
  { id: '13', title: 'Mentor', icon: '🎓', category: 'projetos', unlocked: false },
  { id: '14', title: 'Streak 30', icon: '⏱️', category: 'academico', unlocked: false },
  { id: '15', title: 'Líder', icon: '👑', category: 'eventos', unlocked: false },
];

export default function Badges() {
  const [activeCategory, setActiveCategory] = useState('todas');

  const unlockedCount = BADGES.filter((badge) => badge.unlocked).length;
  const progressPercent = Math.round((unlockedCount / BADGES.length) * 100);

  const filteredBadges = BADGES.filter((badge) =>
    activeCategory === 'todas' ? true : badge.category === activeCategory
  );

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Insígnias</Text>

        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>Progresso de Insígnias</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressText}>{`${unlockedCount}/${BADGES.length} desbloqueadas (${progressPercent}%)`}</Text>
        </View>

        <View style={styles.tabsRow}>
          {CATEGORIES.map((category) => {
            const active = category.key === activeCategory;
            return (
              <TouchableOpacity
                key={category.key}
                style={[styles.tabButton, active && styles.tabButtonActive]}
                onPress={() => setActiveCategory(category.key)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{category.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.badgeGrid}>
          {filteredBadges.map((badge) => (
            <View key={badge.id} style={[styles.badgeCard, !badge.unlocked && styles.badgeCardLocked]}>
              <View style={[styles.badgeIconWrapper, !badge.unlocked && styles.badgeIconWrapperLocked]}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                {!badge.unlocked && <Text style={styles.badgeLock}>🔒</Text>}
              </View>
              <Text style={[styles.badgeTitle, !badge.unlocked && styles.badgeTitleLocked]} numberOfLines={1}>
                {badge.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0d1424',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 140,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 18,
  },
  progressCard: {
    backgroundColor: '#101a35',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#293259',
    padding: 18,
    marginBottom: 18,
  },
  progressLabel: {
    color: '#c3d0f7',
    fontSize: 13,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#17224c',
    borderRadius: 99,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#9f7dff',
  },
  progressText: {
    color: '#7a89b8',
    fontSize: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#101a35',
    borderWidth: 1,
    borderColor: '#293259',
    marginRight: 8,
    marginBottom: 8,
  },
  tabButtonActive: {
    backgroundColor: '#0f62ff',
    borderColor: '#0f62ff',
  },
  tabText: {
    color: '#8e9cca',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    minHeight: 120,
    backgroundColor: '#101a35',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#293259',
    padding: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  badgeCardLocked: {
    opacity: 0.45,
  },
  badgeIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#111a38',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  badgeIconWrapperLocked: {
    backgroundColor: '#1b2548',
  },
  badgeIcon: {
    fontSize: 22,
  },
  badgeLock: {
    position: 'absolute',
    right: -6,
    top: -6,
    fontSize: 14,
  },
  badgeTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  badgeTitleLocked: {
    color: '#8e9cca',
  },
});
