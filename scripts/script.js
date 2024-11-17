// Initialize empty goals array and achievement flags
let goals = [];
let goalsCreated = 0;
let goalsCompleted = 0;
let firstGoalCompleted = false;

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

// Function to render goals on the page
function renderGoals() {
  const goalsContainer = document.getElementById('goals-container');
  goalsContainer.innerHTML = '';

  goals.forEach((goal, index) => {
    const goalItem = document.createElement('li');
    goalItem.classList.add('goal');
    goalItem.innerHTML = `
      <span class="${goal.completed ? 'completed' : ''}">${goal.title}</span>
      <button onclick="toggleGoalCompletion(${index})">${goal.completed ? 'Undo' : 'Complete'}</button>
      <button onclick="deleteGoal(${index})">Delete</button>
    `;
    goalsContainer.appendChild(goalItem);
  });
}

// Function to toggle the completion status of a goal
function toggleGoalCompletion(index) {
  goals[index].completed = !goals[index].completed;
  saveGoals();
  renderGoals();
  checkAchievements();
}

// Function to delete a goal
function deleteGoal(index) {
  goals.splice(index, 1);
  goalsCreated--;
  saveGoals();
  renderGoals();
  checkAchievements();
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

// Function to unlock and store an achievement
function unlockAchievement(achievementText) {
  let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

  if (!achievements.includes(achievementText)) {
    achievements.push(achievementText);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    renderAchievements();
  }
}

// Function to render achievements on the page
function renderAchievements() {
  const achievementsContainer = document.getElementById('achievements-list');
  const achievements = JSON.parse(localStorage.getItem('achievements')) || [];

  achievementsContainer.innerHTML = '';

  achievements.forEach(achievement => {
    const achievementItem = document.createElement('li');
    achievementItem.classList.add('earned');
    achievementItem.innerHTML = `<span>🏆 ${achievement}</span>`;
    achievementsContainer.appendChild(achievementItem);
  });
}

// Function to create a new goal
function createGoal(title, type, deadline) {
  const goal = {
    title,
    type,
    deadline: deadline || 'No deadline',
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

// Initial load of goals and achievements
loadGoals();