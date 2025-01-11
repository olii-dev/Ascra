// Initialize empty goals array and achievement flags
let goals = [];
let goalsCreated = 0;
let goalsCompleted = 0;
let firstGoalCompleted = false;
let achievements = JSON.parse(localStorage.getItem('achievements')) || [];
let achievementDescriptions = {
  '1st Goal Complete! 🎉': 'You completed your first goal! Great start!',
  'Goal Setter 🎯': 'You set your first 5 goals. Keep it up!',
  'Milestone Master 🏅': 'You completed 5 goals. You\'re making progress!',
  'Pro Goal Getter 🌟': 'You completed 10 goals! You\'re a pro!',
  'Consistency Champ 📅': 'You completed goals for 7 consecutive days. Amazing consistency!',
};

// Function to load stored goals from localStorage
function loadGoals() {
  const storedGoals = JSON.parse(localStorage.getItem('goals'));
  if (storedGoals) {
    goals = storedGoals;
    goalsCreated = goals.length;
    renderGoals();
  }
  renderAchievements();
}

// Function to save goals to localStorage
function saveGoals() {
  localStorage.setItem('goals', JSON.stringify(goals));
}

// Function to toggle goal completion
function toggleGoalCompletion(index) {
  const goal = goals[index];
  goal.completed = !goal.completed;

  // Add or remove the completed date
  if (goal.completed) {
    goal.completedDate = new Date().toISOString();
  } else {
    delete goal.completedDate;
  }

  saveGoals();
  renderGoals();
  checkAchievements();
  checkConsistencyChamp();
}

// Function to confirm and delete a goal
function confirmDeleteGoal(index) {
  const confirmDelete = window.confirm('Are you sure you want to delete this goal?');
  if (confirmDelete) {
    deleteGoal(index);
  }
}

// Function to delete a goal
function deleteGoal(index) {
  goals.splice(index, 1);
  goalsCreated--;
  saveGoals();
  renderGoals();
  checkAchievements();
  checkConsistencyChamp();
}

// Function to check achievements based on created and completed goals
function checkAchievements() {
  const completedGoals = goals.filter(goal => goal.completed);

  if (!firstGoalCompleted && completedGoals.length >= 1) {
    firstGoalCompleted = true;
    unlockAchievement('1st Goal Complete! 🎉');
  }

  if (goalsCreated >= 5) {
    unlockAchievement('Goal Setter 🎯');
  }

  if (completedGoals.length >= 5) {
    unlockAchievement('Milestone Master 🏅');
  }

  if (completedGoals.length >= 10) {
    unlockAchievement('Pro Goal Getter 🌟');
  }
}

// Function to track daily completions and check for Consistency Champ achievement
function checkConsistencyChamp() {
  const today = new Date().toDateString();
  let completionHistory = JSON.parse(localStorage.getItem('completionHistory')) || {};

  // Update completion history for today
  if (!completionHistory[today]) {
    const completedGoalsToday = goals.filter(goal => goal.completed && new Date(goal.completedDate).toDateString() === today).length;

    if (completedGoalsToday > 0) {
      completionHistory[today] = true;
      localStorage.setItem('completionHistory', JSON.stringify(completionHistory));
    }
  }

  // Check if there are 7 consecutive days of completions
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

  // Unlock the achievement if conditions are met
  if (streak >= 7 && !achievements.includes('Consistency Champ 📅')) {
    unlockAchievement('Consistency Champ 📅');
  }
}

// Function to unlock and store an achievement
function unlockAchievement(achievementText) {
  if (!achievements.includes(achievementText)) {
    achievements.push(achievementText);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    renderAchievements();
  }
}

// Function to render achievements
function renderAchievements() {
  const achievementsContainer = document.getElementById('achievements-container');
  achievementsContainer.innerHTML = '';

  achievements.forEach(achievement => {
    const achievementItem = document.createElement('li');
    achievementItem.classList.add('achievement');
    
    // Fetch the description for the achievement
    const description = achievementDescriptions[achievement] || 'No description available';
    
    achievementItem.innerHTML = `
      <span class="achievement-name">${achievement}</span>
      <p class="achievement-description">${description}</p>
    `;
    
    achievementsContainer.appendChild(achievementItem);
  });
}

// Function to create a new goal
function createGoal(title, type, deadline) {
  const goal = {
    title,
    type,
    deadline: deadline || 'No deadline',  // Default to 'No deadline' if none is provided
    completed: false,
  };
  goals.push(goal);
  goalsCreated++;
  saveGoals();
  renderGoals();
  checkAchievements();
}

// Form submission handler
const goalForm = document.getElementById('goal-form');
goalForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('goal-title').value.trim();
  const type = document.getElementById('goal-type').value;
  const deadline = document.getElementById('goal-deadline').value;

  if (title && type) {
    createGoal(title, type, deadline);
    goalForm.reset();
  } else {
    alert('Please provide a goal title and type.');
  }
});

// Function to render goals on the page
function renderGoals() {
  const goalsContainer = document.getElementById('goals-container');
  goalsContainer.innerHTML = '';

  goals.forEach((goal, index) => {
    const goalItem = document.createElement('li');
    goalItem.classList.add('goal');
    
    // Check if there is a deadline and format it accordingly
    const deadlineText = goal.deadline !== 'No deadline' ? `${goal.deadline}` : '';
    
    goalItem.innerHTML = `
      <span class="${goal.completed ? 'completed' : ''}">${goal.title}</span>
      <span class="goal-deadline">${deadlineText}</span>
      <button onclick="toggleGoalCompletion(${index})">${goal.completed ? 'Undo' : 'Complete'}</button>
      <button onclick="confirmDeleteGoal(${index})">Delete</button>
    `;
    goalsContainer.appendChild(goalItem);
  });
}

// Initial load of goals and achievements
loadGoals();

// Utility function to format dates
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}
