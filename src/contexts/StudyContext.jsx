import { createContext, useState, useEffect, useCallback } from 'react';
import { toZonedTime } from 'date-fns-tz';

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  // Carregar estado inicial do localStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('study-tasks');
      return saved ? JSON.parse(saved).map(task => ({
        ...task,
        deadline: task.deadline ? new Date(task.deadline) : null,
        createdAt: new Date(task.createdAt),
        updatedAt: task.updatedAt ? new Date(task.updatedAt) : null
      })) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  });

  const [topics, setTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('study-topics');
      return saved ? JSON.parse(saved).map(topic => ({
        ...topic,
        createdAt: new Date(topic.createdAt),
        tasks: topic.tasks || [],
        description: topic.description || '' // Adicionado campo description
      })) : [];
    } catch (error) {
      console.error('Error loading topics:', error);
      return [];
    }
  });

  // Persistir dados no localStorage
  useEffect(() => {
    const tasksToSave = tasks.map(task => ({
      ...task,
      deadline: task.deadline ? task.deadline.toISOString() : null,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt ? task.updatedAt.toISOString() : null
    }));
    localStorage.setItem('study-tasks', JSON.stringify(tasksToSave));
  }, [tasks]);

  // Operações para Tarefas (mantidas as originais)
  const addTask = useCallback((newTask) => {
    setTasks(prev => [
      ...prev,
      {
        ...newTask,
        id: Date.now(),
        createdAt: new Date(),
        completed: false,
        links: newTask.links || []
      }
    ]);
  }, []);

  const updateTask = useCallback((updatedTask) => {
    setTasks(prev =>
      prev.map(task => 
        task.id === updatedTask.id ? { 
          ...updatedTask,
          updatedAt: new Date()
        } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Operações para Tópicos (atualizadas)
  const createTopic = useCallback((topicData) => {
    setTopics(prev => [
      ...prev,
      {
        id: Date.now(),
        name: topicData.name,
        description: topicData.description || '',
        createdAt: new Date(),
        tasks: [],
      }
    ]);
  }, []);

  const addTaskToTopic = useCallback((taskId, topicId) => {
    setTopics(prev =>
      prev.map(topic =>
        topic.id === topicId 
          ? { ...topic, tasks: [...new Set([...topic.tasks, taskId])] }
          : topic
      )
    );
  }, []);

  // Métodos auxiliares (mantidos originais)
  const getTasksByDate = useCallback((date) => {
    const targetDate = toZonedTime(date, 'America/Sao_Paulo');
    return tasks.filter(task => {
      const taskDate = toZonedTime(task.deadline, 'America/Sao_Paulo');
      return (
        taskDate.getDate() === targetDate.getDate() &&
        taskDate.getMonth() === targetDate.getMonth() &&
        taskDate.getFullYear() === targetDate.getFullYear()
      );
    });
  }, [tasks]);

  const getTopicProgress = useCallback((topicId) => {
    const topicTasks = tasks.filter(task => 
      topics.find(t => t.id === topicId)?.tasks.includes(task.id)
    );
    const completed = topicTasks.filter(task => task.completed).length;
    return topicTasks.length > 0 ? (completed / topicTasks.length) * 100 : 0;
  }, [tasks, topics]);

  return (
    <StudyContext.Provider value={{
      // Estado
      tasks,
      topics,
      
      // Operações com tarefas
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      getTasksByDate,

      // Operações com tópicos
      createTopic,
      addTaskToTopic,
      getTopicProgress
    }}>
      {children}
    </StudyContext.Provider>
  );
};

export { StudyContext };