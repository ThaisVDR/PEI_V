import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../../../../styles/Insignias";
import { BADGES, CATEGORIES } from "../../../../data/Insignias";

export default function Insignias() {
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
