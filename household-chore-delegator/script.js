// Global arrays to store users and chores
let users = []; // This array will hold the names of the users
let chores = []; // This array will hold the chore objects

// Add User Function
// This event listener is triggered when the "Add User" button is clicked
document.getElementById('add-user-btn').addEventListener('click', function() {
    // Get the value from the input field for user names
    const userName = document.getElementById('user-name').value;

    // Check if the input is not empty or just whitespace
    if (userName.trim() !== '') {
        // Add the new user to the users array
        users.push(userName);
        
        // Update the user list display and the user selection dropdown
        updateUserList();
        updateUserSelect();
        
        // Clear the input field after adding the user
        document.getElementById('user-name').value = '';
    } else {
        // Alert the user if the input is invalid
        alert('Please enter a valid user name');
    }
});

// Update the user list display
function updateUserList() {
    // Get the user list element to display the users
    const userList = document.getElementById('user-list');
    
    // Clear any existing content in the user list
    userList.innerHTML = '';
    
    // Loop through each user in the users array
    users.forEach(user => {
        // Create a new list item for each user
        const li = document.createElement('li');
        li.textContent = user; // Set the text of the list item to the user's name
        
        // Append the list item to the user list
        userList.appendChild(li);
    });
}

// Update user dropdown (for assigning chores)
function updateUserSelect() {
    // Get the dropdown element for user selection
    const userSelect = document.getElementById('user-select');
    
    // Clear any existing options in the dropdown
    userSelect.innerHTML = '';
    
    // Loop through each user in the users array
    users.forEach(user => {
        // Create a new option element for the dropdown
        const option = document.createElement('option');
        option.textContent = user; // Set the option text to the user's name
        
        // Append the option to the dropdown
        userSelect.appendChild(option);
    });
}

// Assign Chore Function
// This event listener is triggered when the "Assign Chore" button is clicked
document.getElementById('assign-chore-btn').addEventListener('click', function() {
    // Get the value from the input field for chore names
    const choreName = document.getElementById('chore-name').value;
    
    // Get the selected user from the dropdown
    const selectedUser = document.getElementById('user-select').value;
    
    // Check if the chore name input is not empty or just whitespace
    if (choreName.trim() !== '') {
        // Create a new chore object
        const chore = {
            name: choreName,     // Set the chore name
            user: selectedUser,  // Associate the chore with the selected user
            completed: false     // Set the completion status to false
        };
        
        // Add the new chore to the chores array
        chores.push(chore);
        
        // Update the chore list display
        updateChoreList();
        
        // Clear the input field after assigning the chore
        document.getElementById('chore-name').value = '';
    } else {
        // Alert the user if the input is invalid
        alert('Please enter a valid chore name');
    }
});

// Update the chore list display
function updateChoreList() {
    // Get the chore list element to display the chores
    const choreList = document.getElementById('chore-list');
    
    // Clear any existing content in the chore list
    choreList.innerHTML = '';
    
    // Loop through each chore in the chores array
    chores.forEach((chore, index) => {
        // Create a new list item for each chore
        const li = document.createElement('li');
        li.textContent = `${chore.name} - Assigned to: ${chore.user}`; // Set the text of the list item
        
        // Create a button to mark the chore as completed
        const checkButton = document.createElement('button');
        checkButton.textContent = 'Mark as Completed'; // Set the button text
        
        // Add an event listener to the button
        checkButton.addEventListener('click', function() {
            // Call the function to mark the chore as completed, passing the current index
            markChoreAsCompleted(index);
        });
        
        // Append the button to the list item
        li.appendChild(checkButton);
        
        // Append the list item to the chore list
        choreList.appendChild(li);
    });
}

// Mark chore as completed
function markChoreAsCompleted(index) {
    // Set the completion status of the specified chore to true
    chores[index].completed = true;
    
    // Update the chore list display to reflect the change
    updateChoreList();
}
