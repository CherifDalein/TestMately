import { SafeAreaView, StatusBar } from 'react-native';
import TaskListScreen from './src/screens/TaskListScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <TaskListScreen />
    </SafeAreaView>
  );
}