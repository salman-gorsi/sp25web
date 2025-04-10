/**
 * Task Loader Script
 * This script handles loading different tasks into the iframe
 * when the corresponding "View" button is clicked.
 */

// Function to load a task into the iframe
function loadTask(taskId) {
    const iframe = document.getElementById('taskFrame');
    
    // Set the appropriate src based on the task ID
    switch(taskId) {
        case 'assignment1':
            iframe.src = '/assignments/assignment_1/cv.html';
            break;
        case 'assignment2':
            iframe.src = '/assignments/assignment_2/index.html';
            break;
        case 'labtask1':
            iframe.src = '/lab_tasks/lab_task1/index.html';
            break;
        case 'labtask2':
            iframe.src = '/lab_tasks/lab_task2/index.html';
            break;
        default:
            iframe.src = 'about:blank';
    }
    
    // Scroll to the iframe to make it visible
    iframe.scrollIntoView({ behavior: 'smooth' });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Task Loader initialized');
    
    // Get all view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Add click event listener to each button
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the task path from the data attribute
            const taskPath = this.getAttribute('data-task-path');
            
            // Get the iframe element
            const iframe = document.getElementById('taskFrame');
            
            // Update the iframe src with the task path
            if (taskPath) {
                iframe.src = taskPath;
                
                // Scroll to the iframe to make it visible
                iframe.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});