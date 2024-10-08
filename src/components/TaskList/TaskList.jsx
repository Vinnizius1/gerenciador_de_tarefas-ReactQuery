/* Lista de tarefas, onde serão renderizados todos os componentes de tarefas. */
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTasks, addTask, updateTask, deleteTask } from "../../api/taskApi";
import TaskItem from "../TaskItem/TaskItem";
import TaskFormInput from "../TaskFormInput/TaskFormInput";

import styles from "./TaskList.module.css";

/* Componente responsável por renderizar a lista de tarefas */
const TaskList = () => {
  // Cria uma instância do QueryClient
  const queryClient = useQueryClient();

  // useQuery recebe como parâmetro a chave do cache ("tasks") e a função "getTasks" que retorna os dados
  // O useQuery retorna um objeto com as seguintes propriedades: data (tarefas), isLoading, isError, error
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery("tasks", getTasks); // método GET do Axios

  /* useMutation */
  // O useMutation recebe uma função como parâmetro e retorna um objeto com as seguintes propriedades: mutate, isLoading, isError, error
  // O mutate é a função que será executada para adicionar, editar ou excluir uma tarefa
  const addTaskMutation = useMutation(addTask, {
    // método POST do Axios
    onSuccess: () => queryClient.invalidateQueries("tasks"), // O onSuccess invalida a consulta, garantindo que a lista de tarefas seja atualizada
  });

  const updateTaskMutation = useMutation(updateTask, {
    // método PUT do Axios
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  const deleteTaskMutation = useMutation(deleteTask, {
    // método DELETE do Axios
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  /* Funções que serão enviadas para os componentes TaskInput e TaskItem */
  // Função passada para o componente TaskInput e responsável por adicionar uma nova tarefa ("onAdd" - ao adicionar)
  const handleAddTask = newTask => {
    addTaskMutation.mutate(newTask);
  };

  // Funções passadas para o componente TaskItem e responsíveis por editar ("onUpdate" - ao editar") e excluir ("onDelete" - ao excluir) uma tarefa
  const handleUpdateTask = updatedTask => {
    updateTaskMutation.mutate(updatedTask);
  };

  const handleDeleteTask = id => {
    deleteTaskMutation.mutate(id);
  };

  // Se a requisição estiver carregando, exibe uma mensagem. Se houver erro, exibe uma mensagem de erro. Caso contrário, exibe a lista de tarefas "tasks"
  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // "tasks" é o resultado da requisição "getTasks" na API
  return (
    <main className={styles["task-list"]}>
      <TaskFormInput onAdd={handleAddTask} />
      {tasks &&
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        ))}
    </main>
  );
};

export default TaskList;
