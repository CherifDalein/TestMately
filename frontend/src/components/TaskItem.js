import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskItem = memo(({task}) => {
    const getStatusStyle = (status) => {
        switch (status){
            case 'done': return { color: '#4caf50', label: 'Terminé' };
            case 'in_progress': return {color:'#2196f3' , label: 'En cours'};
            default: return { color: '#9e9e9e', label: 'À faire' };
        }
    };

    const statusInfo = getStatusStyle(task.status);

    return (
        <View style={styles.card}>
            <View style={[styles.badge, { backgroundColor: statusInfo.color }]} />
            <View style={styles.content}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.statusText}>{statusInfo.label}</Text>
            </View>
            <Text style={styles.time}>{new Date(task.createdAt).toLocaleTimeString()}</Text>
        </View>
    );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  badge: { width: 10, height: 10, borderRadius: 5, marginRight: 15 },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  statusText: { fontSize: 12, color: '#666', marginTop: 2 },
  time: { fontSize: 11, color: '#999' }
});

export default TaskItem;