/* eslint-disable react/prop-types */

/* Componente individual para cada tarefa. */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

import styles from "./TaskItem.module.css";
import Button from "../Button/Button";

/*  Componente responsável por renderizar cada tarefa */
const TaskItem = ({ task, onUpdate, onDelete }) => {
  // Cria um estado para controlar o modo de edição da tarefa
  const [isEditing, setIsEditing] = useState(false);
  // Cria um estado para armazenar o "novo título" da tarefa
  const [editedTitle, setEditedTitle] = useState(task.title);

  // Se "isEditing" for true, a função "onUpdate" será executada para atualizar a tarefa espalhando o objeto "task" existente, alterando apenas a propriedade "title" para o novo título. Caso seja false, a função "onUpdate" não será executada e o estado "isEditing" será alterado para true.
  const handleEdit = () => {
    // "isEditing" será "true" quando o ícone "faCheck" (checkmark) for clicado e "false" quando o ícone "faEdit" (pencil) for clicado
    if (isEditing) {
      // console.log(isEditing);
      onUpdate({ ...task, title: editedTitle });
    }
    // console.log(isEditing);
    setIsEditing(!isEditing);
  };

  return (
    <article className={styles["task-item"]}>
      {/* Checkbox para marcar ou desmarcar a tarefa - POR PADRÃO vem como "false" */}
      <input
        type="checkbox"
        checked={task.completed}
        aria-checked={task.completed}
        onChange={() => onUpdate({ ...task, completed: !task.completed })}
      />

      {/* Input que será aberto para editar o "novo título" da tarefa */}
      {isEditing ? (
        <input
          type="text"
          className={styles["edit-input"]}
          value={editedTitle}
          aria-label="Edit task title"
          onChange={e => setEditedTitle(e.target.value)}
        />
      ) : (
        <label>{task.title}</label>
      )}

      {/* Botão de edição que será alterado quando se clicar no ícone "faEdit" ou "faCheck" */}
      <Button
        className={styles["edit-btn"]}
        onClick={handleEdit}
        // aria-label para melhorar a acessibilidade
        aria-label={isEditing ? "Salvar alterações" : "Editar tarefa"}
      >
        {isEditing ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          <FontAwesomeIcon icon={faEdit} />
        )}
      </Button>

      {/* Botão de exclusão que não depende do estado de edição, não se altera */}
      <Button
        className={styles["delete-btn"]}
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </article>
  );
};

export default TaskItem;

/* 
A sintaxe { ...task, title: editedTitle } é chamada de "spread operator" ou "objeto espalhado" em JavaScript. Ela cria um novo objeto que é uma cópia do objeto original task, mas com a propriedade title substituída pelo valor de editedTitle.

Em resumo, a função onUpdate está recebendo um novo objeto que é uma atualização do objeto task original, com apenas a propriedade title alterada.

EXEMPLO:
const task = { id: 1, title: 'Tarefa original', description: 'Descrição original' };

const editedTitle = 'Novo título';

const updatedTask = { ...task, title: editedTitle };

console.log(updatedTask);
// Saída: { id: 1, title: 'Novo título', description: 'Descrição original' }

*/
