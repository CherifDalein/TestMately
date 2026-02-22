import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import { usePollTasks } from '../hooks/usePollTasks';
import { taskService } from '../api/taskService';
import TaskItem from '../components/TaskItem';

const TaskListScreen = () => {
  const { tasks, loading } = usePollTasks();
  const [simulating, setSimulating] = useState(false);

  const handleSimulate = async () => {
    setSimulating(true);
    try {
      await taskService.simulate();
      setTimeout(() => {
        setSimulating(false);
      }, 50000);
    } catch (err) {
      Alert.alert("Erreur", "Simulation échouée");
      setSimulating(false);
    }
  };

  if (loading && tasks.length === 0) {
    return <ActivityIndicator style={styles.loader} size="large" color="#2196f3" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {simulating ? (
          <View style={styles.simulatingBox}>
            <ActivityIndicator size="small" color="#2196f3" />
            <Text style={styles.simulatingText}>Simulation en cours...</Text>
          </View>
        ) : (
          <Button 
            title="Simuler 10 tâches" 
            onPress={handleSimulate}
            color="#2196f3"
          />
        )}
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <TaskItem task={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.empty}>Aucune tâche</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    padding: 16, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderColor: '#eee',
    height: 70,
    justifyContent: 'center'
  },
  loader: { flex: 1, justifyContent: 'center' },
  simulatingBox: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  simulatingText: { marginLeft: 10, color: '#2196f3', fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' }
});

export default TaskListScreen;