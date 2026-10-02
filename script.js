const storageKey = "vibeskills.skills.v1";
const addSkillForm = document.querySelector("#add-skill-form");
const skillNameInput = document.querySelector("#skill-name");
const skillProgressInput = document.querySelector("#skill-progress");
const formMessage = document.querySelector("#form-message");
const storageMessage = document.querySelector("#storage-message");
const emptyMessage = document.querySelector("#empty-message");
const skillList = document.querySelector("#skill-list");

let skills = loadSkills();
renderSkills();

addSkillForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = skillNameInput.value.trim();
  const progress = Number(skillProgressInput.value);

  if (!name) {
    formMessage.textContent = "Enter a skill name.";
    skillNameInput.focus();
    return;
  }

  if (!isValidProgress(skillProgressInput.value, progress)) {
    formMessage.textContent = "Progress must be a whole number from 0 to 100.";
    skillProgressInput.focus();
    return;
  }

  skills.push({ id: createSkillId(), name, progress });
  saveSkills();
  renderSkills();
  addSkillForm.reset();
  formMessage.textContent = "";
  skillNameInput.focus();
});

function isValidProgress(inputValue, progress) {
  return inputValue !== "" && Number.isInteger(progress) && progress >= 0 && progress <= 100;
}

function createSkillId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadSkills() {
  try {
    const savedSkills = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(savedSkills)) return [];

    return savedSkills.filter(function (skill) {
      return skill && typeof skill.id === "string" && typeof skill.name === "string" &&
        skill.name.trim() !== "" && Number.isInteger(skill.progress) &&
        skill.progress >= 0 && skill.progress <= 100;
    });
  } catch (error) {
    storageMessage.textContent = "Saved skills could not be loaded. You can start a new list.";
    return [];
  }
}

function saveSkills() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(skills));
    storageMessage.textContent = "";
  } catch (error) {
    storageMessage.textContent = "Changes could not be saved in this browser.";
  }
}

function renderSkills() {
  skillList.replaceChildren();
  emptyMessage.hidden = skills.length > 0;

  skills.forEach(function (skill) {
    const item = document.createElement("li");
    item.className = "skill-card";

    const heading = document.createElement("div");
    heading.className = "skill-heading";
    const name = document.createElement("h3");
    name.textContent = skill.name;
    const percentage = document.createElement("span");
    percentage.textContent = `${skill.progress}%`;
    heading.append(name, percentage);

    const progressBar = document.createElement("progress");
    progressBar.max = 100;
    progressBar.value = skill.progress;
    progressBar.setAttribute("aria-label", `${skill.name} progress`);

    const actions = document.createElement("form");
    actions.className = "skill-actions";
    actions.noValidate = true;

    const field = document.createElement("div");
    field.className = "field";
    const label = document.createElement("label");
    label.textContent = `Update ${skill.name}`;
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "100";
    input.step = "1";
    input.value = skill.progress;
    input.id = `progress-${skill.id}`;
    label.htmlFor = input.id;
    field.append(label, input);

    const updateButton = document.createElement("button");
    updateButton.className = "button button-secondary";
    updateButton.type = "submit";
    updateButton.textContent = "Update";

    const deleteButton = document.createElement("button");
    deleteButton.className = "button button-secondary button-delete";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    const errorMessage = document.createElement("p");
    errorMessage.className = "message";
    errorMessage.setAttribute("role", "alert");

    actions.append(field, updateButton, deleteButton);
    item.append(heading, progressBar, actions, errorMessage);
    skillList.append(item);

    actions.addEventListener("submit", function (event) {
      event.preventDefault();
      const newProgress = Number(input.value);
      if (!isValidProgress(input.value, newProgress)) {
        errorMessage.textContent = "Enter a whole number from 0 to 100.";
        input.focus();
        return;
      }

      skill.progress = newProgress;
      saveSkills();
      renderSkills();
    });

    deleteButton.addEventListener("click", function () {
      skills = skills.filter(function (currentSkill) {
        return currentSkill.id !== skill.id;
      });
      saveSkills();
      renderSkills();
    });
  });
}
