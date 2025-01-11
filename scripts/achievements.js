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
    achievementsList.innerHTML = '<li>No achievements earned yet! Check out the GitHub to learn about them!</li>';
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

// Unlock 'Goal Marathoner' after completing 50 goals
function checkGoalMarathoner() {
  const completedGoals = JSON.parse(localStorage.getItem('goals'))?.filter(goal => goal.completed) || [];
  if (completedGoals.length >= 50 && !achievements.includes('Goal Marathoner 🏃‍♂️')) {
    addAchievement('Goal Marathoner 🏃‍♂️');
  }
}

// Unlock 'Master Planner' after adding a deadline to 20 goals
function checkMasterPlanner() {
  const goalsWithDeadlines = JSON.parse(localStorage.getItem('goals'))?.filter(goal => goal.deadline !== 'No deadline') || [];
  if (goalsWithDeadlines.length >= 20 && !achievements.includes('Master Planner 🗓️')) {
    addAchievement('Master Planner 🗓️');
  }
}

// Unlock 'Back-to-Back Goals' after completing goals for 7 consecutive days
function checkBackToBackGoals() {
  const today = new Date().toDateString();
  let completionHistory = JSON.parse(localStorage.getItem('completionHistory')) || {};

  if (!completionHistory[today]) {
    const completedGoalsToday = goals.filter(goal => goal.completed && new Date(goal.completedDate).toDateString() === today).length;

    if (completedGoalsToday > 0) {
      completionHistory[today] = true;
      localStorage.setItem('completionHistory', JSON.stringify(completionHistory));
    }
  }

  const dates = Object.keys(completionHistory).sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order
  let streak = 1;

  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const previousDate = new Date(dates[i - 1]);

    if ((currentDate - previousDate) === 86400000) { // Check if consecutive days
      streak++;
    } else {
      streak = 1; // Reset streak if not consecutive
    }

    if (streak >= 7) break;
  }

  if (streak >= 7 && !achievements.includes('Back-to-Back Goals 🔄')) {
    addAchievement('Back-to-Back Goals 🔄');
  }
}

// Unlock 'Goal Pacer' after completing goals for 30 consecutive days
function checkGoalPacer() {
  const today = new Date().toDateString();
  let completionHistory = JSON.parse(localStorage.getItem('completionHistory')) || {};

  if (!completionHistory[today]) {
    const completedGoalsToday = goals.filter(goal => goal.completed && new Date(goal.completedDate).toDateString() === today).length;

    if (completedGoalsToday > 0) {
      completionHistory[today] = true;
      localStorage.setItem('completionHistory', JSON.stringify(completionHistory));
    }
  }

  const dates = Object.keys(completionHistory).sort((a, b) => new Date(a) - new Date(b)); // Sort dates in ascending order
  let streak = 1;

  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const previousDate = new Date(dates[i - 1]);

    if ((currentDate - previousDate) === 86400000) { // Check if consecutive days
      streak++;
    } else {
      streak = 1; // Reset streak if not consecutive
    }

    if (streak >= 30) break;
  }

  if (streak >= 30 && !achievements.includes('Goal Pacer 🏃‍♀️')) {
    addAchievement('Goal Pacer 🏃‍♀️');
  }
}

// Unlock 'Goal Tracker' after tracking goals for 30 days
function checkGoalTracker() {
  const datesTracked = Object.keys(JSON.parse(localStorage.getItem('completionHistory')) || {});
  if (datesTracked.length >= 30 && !achievements.includes('Goal Tracker 📊')) {
    addAchievement('Goal Tracker 📊');
  }
}

// Unlock 'Deadline King/Queen' after 10 goals with deadlines
function checkDeadlineKing() {
  const goalsWithDeadlines = JSON.parse(localStorage.getItem('goals'))?.filter(goal => goal.deadline !== 'No deadline') || [];
  if (goalsWithDeadlines.length >= 10 && !achievements.includes('Deadline King/Queen 👑')) {
    addAchievement('Deadline King/Queen 👑');
  }
}

// Call new check functions
checkFirstGoalCreation();
checkGoalMarathoner();
checkMasterPlanner();
checkBackToBackGoals();
checkGoalPacer();
checkGoalTracker();
checkDeadlineKing();