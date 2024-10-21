// Global arrays to store users and chores
let users = JSON.parse(localStorage.getItem('users')) || [];
let chores = JSON.parse(localStorage.getItem('chores')) || [];

// Add User Function
document.getElementById('add-user-btn').addEventListener('click', function () {
    const userName = document.getElementById('user-name').value;
    if (userName.trim() !== '') {
        users.push(userName);
        localStorage.setItem('users', JSON.stringify(users)); // Save to local storage
        updateUserList();
        updateUserSelect();
        document.getElementById('user-name').value = ''; // Clear input field
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a valid user name!',
        });
    }
});

// Update the user list display
function updateUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
}

// Update user dropdown (for assigning chores)
function updateUserSelect() {
    const userSelect = document.getElementById('user-select');
    userSelect.innerHTML = '';
    users.forEach(user => {
        const option = document.createElement('option');
        option.textContent = user;
        userSelect.appendChild(option);
    });
}

// Assign Chore Function
document.getElementById('assign-chore-btn').addEventListener('click', function () {
    const choreName = document.getElementById('chore-name').value;
    const selectedUser = document.getElementById('user-select').value;
    const selectedPriority = document.getElementById('priority-select').value; // Capture the selected priority
    const dueDate = document.getElementById('due-date').value;

    if (choreName.trim() !== '') {
        const chore = {
            name: choreName,
            user: selectedUser,
            priority: selectedPriority, // Add priority property
            dueDate: dueDate,
            completed: false
        };
        chores.push(chore);
        chores.sort((a, b) => { // Sort chores by priority (High, Medium, Low)
            const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        localStorage.setItem('chores', JSON.stringify(chores)); // Save to local storage
        updateChoreList();
        document.getElementById('chore-name').value = ''; // Clear input field
        document.getElementById('chore-due-date').value = '';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a valid chore name!',
        });
    }
});

// Update the chore list display
function updateChoreList() {
    const choreList = document.getElementById('chore-list');
    choreList.innerHTML = '';
    chores.forEach((chore, index) => {
        const li = document.createElement('li');
        const daysLeft = getDaysLeft(chore.dueDate);
        li.textContent = `${chore.name} - Assigned to: ${chore.user} (Priority: ${chore.priority}) - Due: ${chore.dueDate} (${daysLeft} days left)`; // Added dueDate and daysLeft

        // Apply color based on priority
        if (chore.priority === 'high') {
            li.classList.add('priority-high');
        } else if (chore.priority === 'medium') {
            li.classList.add('priority-medium');
        } else {
            li.classList.add('priority-low');
        }

        if (chore.completed) {
            li.classList.add('completed');
        }

        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = chore.completed ? 'Completed' : 'Mark as Completed';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', function () {
            markChoreAsCompleted(index);
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            deleteChore(index);
        });

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        choreList.appendChild(li);
    });
}

// Mark chore as completed
function markChoreAsCompleted(index) {
    chores[index].completed = true;
    localStorage.setItem('chores', JSON.stringify(chores)); // Save to local storage
    updateChoreList();
}

// Delete chore
function deleteChore(index) {
    chores.splice(index, 1);
    localStorage.setItem('chores', JSON.stringify(chores)); // Save to local storage
    updateChoreList();
}

// Initialize SortableJS for drag-and-drop chore reordering
new Sortable(document.getElementById('chore-list'), {
    animation: 150,
    onEnd: function (event) {
        // Rearrange the chores array based on new order
        const itemEl = event.item;
        const oldIndex = event.oldIndex;
        const newIndex = event.newIndex;
        
        const movedChore = chores.splice(oldIndex, 1)[0]; // Remove chore from old position
        chores.splice(newIndex, 0, movedChore); // Insert chore into new position
        
        localStorage.setItem('chores', JSON.stringify(chores)); // Update local storage
    }
});

function getDaysLeft(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return daysLeft >= 0 ? daysLeft : 'Past due';
}

// Initialize app
updateUserList();
updateUserSelect();
updateChoreList();
