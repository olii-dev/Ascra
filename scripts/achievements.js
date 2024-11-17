// achievements.js

// Load achievements from localStorage or initialize an empty array
let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

// Get reference to the achievements list element
const achievementsList = document.getElementById('achievements-list');

// Render achievements on the page
function renderAchievements() {
  if (achievements.length > 0) {
    achievements.forEach(achievement => {
      const achievementItem = document.createElement('li');
      
      // Optionally add an icon or badge (e.g., a trophy icon)
      const icon = document.createElement('div');
      icon.classList.add('icon');
      icon.innerHTML = '🏆'; // Trophy icon as an example

      // Create the achievement text
      const achievementText = document.createElement('p');
      achievementText.textContent = achievement;

      // Optional: Add a class to show the completion status
      const status = document.createElement('span');
      status.classList.add('completed');
      status.textContent = 'Completed';  // You can change this conditionally

      // Append the elements to the achievement item
      achievementItem.appendChild(icon);
      achievementItem.appendChild(achievementText);
      achievementItem.appendChild(status);

      // Add the item to the list
      achievementsList.appendChild(achievementItem);
    });
  } else {
    achievementsList.innerHTML = '<li>No achievements yet!</li>';
  }
}

// Add a new achievement
function addAchievement(achievement) {
  // Add to the achievements array
  achievements.push(achievement);

  // Save to localStorage
  localStorage.setItem('achievements', JSON.stringify(achievements));

  // Re-render achievements
  renderAchievements();
}

// Example of unlocking the 'Complete 1st Goal!' achievement when the first goal is marked complete
function checkFirstGoal() {
    const firstGoal = localStorage.getItem('firstGoalComplete');
    
    // Check if first goal is completed and the achievement isn't already in the list
    if (firstGoal && !achievements.includes('Complete 1st Goal!')) {
      addAchievement('Complete 1st Goal!');
    }
  }

// Call checkFirstGoal on page load
checkFirstGoal();

// Call renderAchievements when the page is ready
renderAchievements();
