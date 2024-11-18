// Load achievements from localStorage or initialize an empty array
let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

// Get reference to the achievements list element
const achievementsList = document.getElementById('achievements-list');

// Render achievements on the page
function renderAchievements() {
  achievementsList.innerHTML = ''; // Clear the list before re-rendering

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
  // Check if the achievement already exists to avoid duplicates
  if (!achievements.includes(achievement)) {
    achievements.push(achievement);

    // Save to localStorage
    localStorage.setItem('achievements', JSON.stringify(achievements));

    // Re-render achievements
    renderAchievements();
  }
}

// Example of unlocking achievements

// Unlock 'Complete 1st Goal!' when the first goal is marked complete
function checkFirstGoal() {
    const firstGoal = localStorage.getItem('firstGoalComplete');
    
    // Check if first goal is completed and the achievement isn't already in the list
    if (firstGoal && !achievements.includes('Complete 1st Goal!')) {
      addAchievement('Complete 1st Goal!');
    }
}

// Unlock 'Goal Setter' when 5 goals are created
function checkGoalSetter() {
  const createdGoals = JSON.parse(localStorage.getItem('goals')) || [];
  if (createdGoals.length >= 5 && !achievements.includes('Goal Setter 🎯')) {
    addAchievement('Goal Setter 🎯');
  }
}

// Unlock 'Milestone Master' when 5 goals are completed
function checkMilestoneMaster() {
  const completedGoals = JSON.parse(localStorage.getItem('goals'))?.filter(goal => goal.completed) || [];
  if (completedGoals.length >= 5 && !achievements.includes('Milestone Master 🏅')) {
    addAchievement('Milestone Master 🏅');
  }
}

// Unlock 'Pro Goal Getter' when 10 goals are completed
function checkProGoalGetter() {
  const completedGoals = JSON.parse(localStorage.getItem('goals'))?.filter(goal => goal.completed) || [];
  if (completedGoals.length >= 10 && !achievements.includes('Pro Goal Getter 🌟')) {
    addAchievement('Pro Goal Getter 🌟');
  }
}

// Call checkFirstGoal on page load
checkFirstGoal();

// Check other goal achievements
checkGoalSetter();
checkMilestoneMaster();
checkProGoalGetter();

// Call renderAchievements when the page is ready
renderAchievements();

// Check if there are goals with deadlines (example check)
function checkGoalsWithDeadlines() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const goalsWithDeadlines = goals.filter(goal => goal.deadline !== 'No deadline');
  
    if (goalsWithDeadlines.length >= 1 && !achievements.includes('Deadline Master 🕓')) {
      addAchievement('Deadline Master 🕓');
    }
  }
  
  // Call check on page load
  checkGoalsWithDeadlines();
