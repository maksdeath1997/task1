var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0];//first-button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");//complete-tasks

//New Task List Item
var createNewTaskElement = function(taskString) {
  //Створюємо List Item
  var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input");
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input");
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    //модифікація кожного єлемента
    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    //додамо кожний єлемент
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}
//Додаемо новий task
var addTask = function() {
  console.log("Add task...");
  //Створимо нового єлемента listitem #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Додамо listItem до incompleteTasksHolder
  if(!taskInput.value.trim() == "") { //Перевіремо чи значення від вхідного(new task) до 
    //неповного(incompleteTasksHolder), якщо він порожній або пробіл
    incompleteTasksHolder.appendChild(listItem);
    taskInput.value = "";
  }
  else {
    taskInput.placeholder = "Type a task...";
  }

  bindTaskEvents(listItem, taskCompleted);
}
//Редакт task
var editTask = function() {
  console.log("Edit task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");
    //якщо клас 
    if(containsClass) {
      //Перейти з .editMode
      //label text стає input's value 
      label.innerText = editInput.value;
    }
    else {
      //Перейде до .editMode
      //input value стає label's text
      editInput.value = label.innerText;
    }
    //Переключимо .editMode на list item
    listItem.classList.toggle("editMode");

}

//Відаляємо task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Видалемо зі list item - <ul>
  ul.removeChild(listItem);
}

//Завершення task
var taskCompleted = function() {
  console.log("Task complete...");
  //Додамо task list item до #completed-tasks
  var listItem = this.parentNode; //'this' выдображати 'input(checkbox)'
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}
 //Неповне завершення task
var taskIncomplete = function() {
  console.log("Task incomplete...");
  //Додамо task list item до #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //Вибираємо taskListItem's children
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

    //editTask редагування кнопка
  editButton.onclick = editTask;
    //deleteTask видалити кнопка
  deleteButton.onclick = deleteTask;
    //checkBoxEventHandler прапорець
  checkbox.onchange = checkBoxEventHandler;
}

//Обробка кліків у функціх AddTask
var ajaxRequest = function() {
  console.log("AJAX request");
}

addButton.addEventListener("click", ajaxRequest);
addButton.addEventListener("click", addTask);

//Цикл над incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  // подія list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
//цикл для completeTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
  // подія list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}