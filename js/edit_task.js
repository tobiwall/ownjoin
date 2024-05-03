function renderPrioButton(task, i) {
  buttonContainer = document.getElementById('edit-prio-buttons-container');
  taskPrio = task.prio;

  if (taskPrio === 'urgent') {
    buttonContainer.innerHTML = prioEditUrgent(i);
  } else if (taskPrio === "medium") {
    buttonContainer.innerHTML = prioEditMedium(i);
  } else if (taskPrio === "low") {
    buttonContainer.innerHTML = prioEditLow(i);
  }
}

function prioEditUrgent(i) {
  return `
    <button type="button" class="prio-button urgent-active" id="urgentEdit" onclick="togglePrioButton('urgent', ${i})">Urgent<img id="urgentImgEdit" src="./assets/icons/prio_buttons/prio_urgent.png" alt=""></button>
    <button type="button" class="prio-button" id="mediumEdit" onclick="togglePrioButton('medium', ${i})">Medium<img id="mediumImgEdit" src="./assets/icons/prio_buttons/prio_medium_yellow.png" alt=""></button>
    <button type="button" class="prio-button" id="lowEdit" onclick="togglePrioButton('low', ${i})">Low<img id="lowImgEdit" src="./assets/icons/prio_buttons/prio_low_green.png" alt=""></button>
  `;
}

function prioEditMedium(i) {
  return `
    <button type="button" class="prio-button" id="urgentEdit" onclick="togglePrioButton('urgent', ${i})">Urgent<img id="urgentImgEdit" src="./assets/icons/prio_buttons/prio_urgent_red.png" alt=""></button>
    <button type="button" class="prio-button medium-active" id="mediumEdit" onclick="togglePrioButton('medium', ${i})">Medium<img id="mediumImgEdit" src="./assets/icons/prio_buttons/prio_medium.png" alt=""></button>
    <button type="button" class="prio-button" id="lowEdit" onclick="togglePrioButton('low', ${i})">Low<img id="lowImgEdit" src="./assets/icons/prio_buttons/prio_low_green.png" alt=""></button>
  `;
}

function prioEditLow(i) {
  return `
    <button type="button" class="prio-button" id="urgentEdit" onclick="togglePrioButton('urgent', ${i})">Urgent<img id="urgentImgEdit" src="./assets/icons/prio_buttons/prio_urgent_red.png" alt=""></button>
    <button type="button" class="prio-button" id="mediumEdit" onclick="togglePrioButton('medium', ${i})">Medium<img id="mediumImgEdit" src="./assets/icons/prio_buttons/prio_medium_yellow.png" alt=""></button>
    <button type="button" class="prio-button low-active" id="lowEdit" onclick="togglePrioButton('low', ${i})">Low<img id="lowImgEdit" src="./assets/icons/prio_buttons/prio_low.png" alt=""></button>
  `;
}

function togglePrioButton(priority, i) {
  const task = allTasks[i];

  if (priority === "urgent") {
    prioUrgent(priority);
    task.prio = priority;
  } else if (priority === "medium") {
    prioMedium(priority);
    task.prio = priority;
  } else if (priority === "low") {
    prioLow(priority);
    task.prio = priority;
  }
}

function prioUrgent(priority) {
  document.getElementById(priority + "Edit").classList.add("urgent-active");
  document.getElementById(priority + "ImgEdit").src =
    "./assets/icons/prio_buttons/prio_urgent.png";
  document.getElementById("mediumEdit").classList.remove("medium-active");
  document.getElementById("mediumImgEdit").src =
    "./assets/icons/prio_buttons/prio_medium_yellow.png";
  document.getElementById("lowEdit").classList.remove("low-active");
  document.getElementById("lowImgEdit").src =
    "./assets/icons/prio_buttons/prio_low_green.png";
}

function prioMedium(priority) {
  document.getElementById(priority + "Edit").classList.add("medium-active");
  document.getElementById(priority + "ImgEdit").src =
    "./assets/icons/prio_buttons/prio_medium.png";
  document.getElementById("urgentEdit").classList.remove("urgent-active");
  document.getElementById("urgentImgEdit").src =
    "./assets/icons/prio_buttons/prio_urgent_red.png";
  document.getElementById("lowEdit").classList.remove("low-active");
  document.getElementById("lowImgEdit").src =
    "./assets/icons/prio_buttons/prio_low_green.png";
}

function prioLow(priority) {
  document.getElementById(priority + "Edit").classList.add("low-active");
  document.getElementById(priority + "ImgEdit").src =
    "./assets/icons/prio_buttons/prio_low.png";
  document.getElementById("urgentEdit").classList.remove("urgent-active");
  document.getElementById("urgentImgEdit").src =
    "./assets/icons/prio_buttons/prio_urgent_red.png";
  document.getElementById("mediumEdit").classList.remove("medium-active");
  document.getElementById("mediumImgEdit").src =
    "./assets/icons/prio_buttons/prio_medium_yellow.png";
}

function showUsers() {
  let userList = document.getElementById("editDropdownUsers");
  userList.innerHTML = "";
  loadContacts();
  if (!assignedContainerClicked) {
    displayUserList(userList);
  } else {
    hideUsers();
  }
}

function displayUserList(userList) {
  assignedContainerClicked = true;
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    userList.innerHTML += userTemplate(contact);
  }
}

function hideUsers() {
  assignedContainerClicked = false;
  let userList = document.getElementById("editDropdownUsers");
  userList.innerHTML = "";
}

function handleCheckboxChange(event) {
  const checkbox = event.target;
  const contactData = JSON.parse(checkbox.getAttribute("data-contact"));

  if (checkbox.checked) {
    users.push(contactData);
    renderAssignedUser();
  } else {
    const index = users.findIndex((user) => user.name === contactData.name);
    if (index !== -1) {
      users.splice(index, 1);
      renderAssignedUser();
    }
  }
}

function userTemplate(contact) {
  return `
  <div class="user-container">
    <div class="user">
      <div class="user-initials" style="background-color: ${contact.color};">
        ${contact.initials}
      </div>
      <div>
        ${contact.name}
      </div>
    </div>
    <div>
      <input type="checkbox" name="assignedUser" value="${
        contact.name
      }" data-contact='${JSON.stringify(
    contact
  )}' onchange="handleCheckboxChange(event)">
    </div>
  </div>
`;
}

function searchUser() {
  let searchValue = document
    .getElementById("userInput")
    .value.trim()
    .toLowerCase();
  let userList = document.getElementById("dropdown-users");
  userList.innerHTML = "";
  loadContacts();

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (contact.name.trim().toLowerCase().includes(searchValue)) {
      userList.innerHTML += userTemplate(contact);
    }
  }
}

function editTask(i, taskId) {
  let taskContainer = document.getElementById("taskPopup");
  taskContainer.style.display = "none";
  let editTaskContainer = document.getElementById('editTaskPopup');
  editTaskContainer.innerHTML = '';
  editTaskContainer.style.display = "flex";

  const task = allTasks[i];
  editTaskContainer.innerHTML = editTaskPopup(task, i, taskId);
  renderEditPopupSubtasks(task, i, taskId);
  renderPrioButton(task, i);
}

function editTaskPopup(task, i, taskId) {
  return /*html*/`
  
  <form action="">
    <div class="edit-task-popup-top"><img src="./assets/icons/subtask_icons/close.png" alt="X" onclick="closeEditTaskPopup()"></div>
    <div>
      <label for="">Title<span style="color: #FF8190">*</span></label>
      <input type="text" value="${task.title}">
    </div>
    <div>
      <label for="">Description</label>
      <textarea name="" id="" cols="30" rows="10">${task.description}</textarea>
    </div>
    <div>
      <label for="">Due Date<span style="color: #FF8190">*</span></label>
      <input required id="" type="date" value="${task.dueDate}">
    </div>
    <div class="prio-container">
      <label>Prio</label>
      <div id="edit-prio-buttons-container" class="buttons-container">
      </div>
    </div>
    <div class="assignedto-container">
      <label>Assigned to</label>
      <div class="assigned-container" id="popupAssignedContainer">
        <input id="popupUserInput" type="text" onkeyup="searchUser()" onclick="showUsers()" placeholder="Select contacts to assign">
        <img class="assigned-icon" src="./assets/icons/arrow_drop_down.png" alt="OPEN" onclick="showUsers()">
      </div>
      <div id="editDropdownUsers" class="dropdown-users">
      </div>  
    </div>
    <div>
        <label>Subtasks</label>
        <div class="subtask-container">
          <input id="editSubtasksInput" type="text" class="subtask-input" placeholder="Add new subtask" onclick="enableSubtaskIcons()">
          <div class="edit-subtask-icon-container">
            <img src="./assets/icons/subtask_icons/add.png" onclick="enableSubtaskIcons()"></img>
          </div>
        </div>
        <ul id="edit-popup-contentSubtasks">${task.subtasks}</ul>
    </div>
    <button onclick="submitChanges(${i})">OK<img src="./assets/icons/check_white1.png" alt=""></button>
  </form>
  `;
}

function enableSubtaskIcons() {
  let iconContainer = document.querySelector('.edit-subtask-icon-container');
  iconContainer.querySelector('img').removeAttribute('onclick');

  iconContainer.innerHTML = `
    <div onclick="clearEditSubtaskInput()"><img src="./assets/icons/subtask_icons/close.png" alt="X"></div>
    <div><img src="./assets/icons/mini_seperator.png" alt="/"></div>
    <div onclick="addSubtask()"><img src="./assets/icons/subtask_icons/check.png" alt="ADD" ></div>
  `;
}

function clearEditSubtaskInput() {
  input = document.getElementById('editSubtasksInput');
  input.value = '';
}

function renderEditPopupSubtasks(task, i, taskId) {
  let subtaskContainer = document.getElementById(
    `edit-popup-contentSubtasks`
  );
  subtaskContainer.innerHTML = "";

  for (let j = 0; j < task.subtasks.length; j++) {
    const subtask = task.subtasks[j];

    subtaskContainer.innerHTML += `
    <div id="subtask${j}_${taskId}" class="subtask">
    <li>
      <div>${subtask}</div>
      <div class="subtask-edit-icons">
        <div onclick="editPopupSubtask('${subtask}', ${i}, ${j}, ${taskId})"><img src="./assets/icons/subtask_icons/edit.png" alt="EDIT"></div>
        <div><img src="./assets/icons/mini_seperator.png" alt="/"></div>
        <div onclick="deletePopupSubtask(${j}, ${j})"><img src="./assets/icons/subtask_icons/delete.png" alt="X"></div>
    </div>
  </li>
  </div>
    `;
  }
}

function editPopupSubtask(subtask, i, j, taskId) {
  let subtaskbox = document.getElementById(`subtask${j}_${taskId}`);

  subtaskbox.innerHTML = `
    <div class="edit-input">
      <input id="changedSubtask${j}_${taskId}" value="${subtask}">
        <div class="edit-icons">
          <img src="./assets/icons/subtask_icons/delete.png" alt="X" onclick="deletePopupSubtask(${i}, ${j}, ${taskId})">
          <img src="./assets/icons/subtask_icons/check.png" alt="OK" onclick="addChangedPopupSubtask(${i}, ${j}, ${taskId})">
      </div>
    </div>
  `;
}

function deletePopupSubtask(i, j, taskId) {
  allTasks[i].subtasks.splice(j, 1);
  editTask(i, taskId);
}

function addChangedPopupSubtask(i, j, taskId) {
  let input = document.getElementById(`changedSubtask${j}_${taskId}`);
  let subtaskText = input.value.trim();
  allTasks[i].subtasks.splice(j, 1, subtaskText);
  input.value = "";
  editTask(i, taskId);
}

function closeEditTaskPopup() {
  let taskContainer = document.getElementById("editTaskPopup");
  taskContainer.style.display = "none";
}

function deleteTask(i) {
  allTasks.splice(i, 1);
  closeTaskPopup();
  renderCards();
  save();
}

function submitChanges(i) {
  const task = allTasks[i];

  const form = document.querySelector('form');
  const formData = new FormData(form);

  // Die Werte aus dem Formular extrahieren
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');
  const subtasks = getSubtasks();

  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  task.subtasks = subtasks;

  save();
  renderCards();
  closeEditTaskPopup();
}

function getSubtasks() {
  const subtaskElements = document.querySelectorAll('.subtask');
  const subtasks = [];
  subtaskElements.forEach(element => {
    const subtaskText = element.querySelector('input').value;
    subtasks.push(subtaskText);
  });
  return subtasks;
}