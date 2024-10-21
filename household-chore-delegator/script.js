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
    const selectedPriority = document.getElementById('priority-select').value;
    const dueDate = document.getElementById('due-date').value;

    if (choreName.trim() !== '') {
        const chore = {
            name: choreName,
            user: selectedUser,
            priority: selectedPriority,
            dueDate: dueDate,
            completed: false
        };
        chores.push(chore);
        chores.sort((a, b) => {
            const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        localStorage.setItem('chores', JSON.stringify(chores)); // Save to local storage
        document.getElementById('chore-name').value = ''; // Clear input field
        document.getElementById('due-date').value = '';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a valid chore name!',
        });
    }
});

// Initialize app on page load
updateUserList();
updateUserSelect();
