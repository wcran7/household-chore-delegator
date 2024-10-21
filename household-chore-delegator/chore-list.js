// Load chores from local storage
let chores = JSON.parse(localStorage.getItem('chores')) || [];

// Update the chore list display
function updateChoreList() {
    const choreList = document.getElementById('chore-list');
    choreList.innerHTML = '';
    chores.forEach((chore, index) => {
        const li = document.createElement('li');
        const daysLeft = getDaysLeft(chore.dueDate);
        li.textContent = `${chore.name} - Assigned to: ${chore.user} (Priority: ${chore.priority}) - Due: ${chore.dueDate} (${daysLeft} days left)`;

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

// Helper function to calculate days left until due date
function getDaysLeft(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return daysLeft >= 0 ? daysLeft : 'Past due';
}

// Event listener for the back button
document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = 'index.html'; // Navigate back to the main page
});

// Initialize app on page load
updateChoreList();
