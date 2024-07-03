import { StyleSheet, Button, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import { db } from '../../FirebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function TabTwoScreen() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<any>([]);
  const todosCollection = collection(db, 'todos');

  const fetchTodos = async () => {
    const data = await getDocs(todosCollection);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    await addDoc(todosCollection, { task, completed: false });
    setTask('');
    fetchTodos();
  };

  const updateTodo = async (id: string, completed: any) => {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
    fetchTodos();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        placeholder="New Task"
        value={task}
        onChangeText={(text) => setTask(text)}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.task}</Text>
            <Button title={item.completed ? "Undo" : "Complete"} onPress={() => updateTodo(item.id, item.completed)} />
            <Button title="Delete" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
});