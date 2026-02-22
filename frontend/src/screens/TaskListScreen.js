import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet, ActivityIndicator, Text } from 'react-native';
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
    } catch (err) {
      alert("Erreur simulation");
    } finally {
      setSimulating(false);
    }
  };

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button 
          title={simulating ? "Simulation en cours..." : "Simuler 10 tâches"} 
          onPress={handleSimulate}
          disabled={simulating}
        />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <TaskItem task={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  loader: { flex: 1, justifyContent: 'center' }
});

export default TaskListScreen;