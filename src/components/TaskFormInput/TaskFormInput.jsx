/* eslint-disable react/prop-types */

import { useState } from "react";
import Button from "../Button/Button";

import styles from "./TaskFormInput.module.css";

/* Componente responsável por renderizar o campo de input para criar tarefa */
const TaskFormInput = ({ onAdd }) => {
  // Armazena a tarefa criada e envia para o componente pai ("TaskList") por meio da função "onAdd"
  const [newTask, setNewTask] = useState("");

  // Função que CRIA a "task" com as propriedades "title" igual a "newTask" (valor do input que o usário digitar) e "completed" com o valor "false" (vem por padrão, não é necessário informar ao usário)
  const handleSubmit = e => {
    e.preventDefault();

    // Se o campo de input estiver vazio, não adiciona a tarefa
    if (!newTask) return;

    // "onAdd" é a função que é enviada para o componente pai ("TaskList")
    onAdd({ title: newTask, completed: false });

    // Limpa o campo de input
    setNewTask("");
  };

  // Formulário para criar tarefa
  return (
    <form onSubmit={handleSubmit} className={styles["task-input"]}>
      <input
        type="text"
        className={styles["new-task"]}
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Digite sua tarefa"
      />
      <Button className={styles["add-task"]} type="submit">
        Adicionar
      </Button>
    </form>
  );
};

export default TaskFormInput;
