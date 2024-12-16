const taskInput= document.querySelector("#new-task");
const addButton= document.querySelector('.task-add__button');
const incompleteTaskHolder= document.querySelector(".task-todo__list");
const completedTasksHolder= document.querySelector(".task-complete__list");

const createNewTaskElement = (taskString) => {
  const listItem = Object.assign(document.createElement("li"), {
        className: 'task task_saved'
      });
  const checkBox = Object.assign(document.createElement("input"), {
        type: 'checkbox',
        className: 'task__check'
      });
  const label = Object.assign(document.createElement("label"), {
    innerHTML: taskString,
    className: 'task__label_saved'
  });
  const editInput = Object.assign(document.createElement("input"), {
    type: 'text',
    className: 'input__text task__input_saved',
  });
  const editButton = Object.assign(document.createElement("button"), {
    innerText: "Edit",
    className: "button task__button_edit"
  });
  const deleteButton = Object.assign(document.createElement("button"), {
    className: "button task__button_delete"
  });
  const deleteButtonImg = Object.assign(document.createElement("img"), {
    src: './remove.svg',
    className: 'task__image'
  });
  deleteButton.appendChild(deleteButtonImg)
  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
}

const addTask = () => {
  if (!taskInput.value) return;
  console.log("Add Task...");
  const listItem= createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

const editTask = (ev) => {
  const listItem = ev.target.parentNode;
  const editInput = listItem.querySelector('.input__text');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".task__button_edit");
  const containsClass = listItem.classList.contains("task_edited");
  listItem.classList.toggle("task_edited");
  listItem.classList.toggle("task_saved");
  editInput.classList.toggle('task__input_saved')
  editInput.classList.toggle('task__input_completed')
  editInput.classList.toggle('task__input_edited')
  label.classList.toggle('task__label_saved')
  label.classList.toggle('task__label_edited')
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
    console.log("Edit Task...");
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
    editInput.focus();
    console.log("Change 'edit' to 'save'");
  }
};

const deleteTask = (ev) => {
  console.log("Delete Task...");
  const listItem = ev.target.parentNode.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

const taskCompleted = (ev) => {
  console.log("Complete Task...");
  const listItem = ev.target.parentNode;
  listItem.classList.toggle("task_completed");
  listItem.classList.toggle("task_saved");
  listItem.querySelector('.task__input_edited')?.classList.toggle('task__input_saved');
  listItem.querySelector('.task__input_edited')?.classList.toggle('task__input_edited');
  listItem.querySelector('.task__label_edited')?.classList.toggle('task__label_completed');
  listItem.querySelector('.task__label_edited')?.classList.toggle('task__label_edited');
  listItem.querySelector('.task__label_saved')?.classList.toggle('task__label_completed');
  listItem.querySelector('.task__label_saved')?.classList.toggle('task__label_saved');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = (ev) => {
  console.log("Incomplete Task...");
  const listItem= ev.target.parentNode;
  listItem.classList.toggle("task_completed");
  listItem.classList.toggle("task_saved");
  listItem.querySelector('.task__label_completed')?.classList.toggle('task__label_saved');
  listItem.querySelector('.task__label_completed')?.classList.toggle('task__label_completed');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = () => {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log("bind list item events")
  const checkBox = taskListItem.querySelector(".task__check");
  taskListItem.querySelector(".task__button_edit").onclick = editTask;
  const deleteButton = taskListItem.querySelector(".task__button_delete");
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i= 0; i < incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (let i= 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
