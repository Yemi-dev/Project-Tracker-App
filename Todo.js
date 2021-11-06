const form = document.querySelector('.project-form');
const projectInput = document.querySelector('#project-input');
const searchFilter = document.querySelector('#filter');
const projects = document.querySelector('.project-collection');
const resetBtn = document.querySelector('.reset');
const nullProject = document.querySelector('.null-task');
const resetSection = document.querySelector('.reset-section');


// Load all Eventlisteners
loadEvents();
function loadEvents() {
    // Get Projects from LS
    document.addEventListener('DOMContentLoaded', getProjects)
    // Add Project Event
    form.addEventListener('submit', addProjects);
    // Remove Project Event
    projects.addEventListener('click', deleteProject);
    // Filter Project Event
    searchFilter.addEventListener('keyup', filterProjects);
    // Reset all Projects Event
    resetBtn.addEventListener('click', clearProjects);

}

// set Projects to Localstorage 
function setProjectsToLocalStorage(project) {
    let projectss;
    if (localStorage.getItem('projectss') === null){
        projectss = [];
    } else {
        projectss = JSON.parse(localStorage.getItem('projectss'));
    }

    projectss.push(project);

    localStorage.setItem('projectss', JSON.stringify(projectss));
}

// get Projects from Local Storage
function getProjects (){
    let projectss;
    if (localStorage.getItem('projectss') === null){
        projectss = [];
    } else {
        projectss = JSON.parse(localStorage.getItem('projectss'));
    }

    projectss.forEach(function(project){
        const li = document.createElement('li');
        li.classList.add('project-list');
        li.appendChild(document.createTextNode(project));
        const link = document.createElement('a');
        link.classList.add('delete-list');
        link.innerHTML = '<span class="iconify" data-icon="heroicons-solid:trash" style="color: #7b3f00;"></span>';
        li.appendChild(link);
        projects.appendChild(li);
    });

    if (projectss.length) {
        nullProject.classList.add('d-none');
        resetSection.classList.remove('d-none');
    } 
}


// To add new Projects 
function addProjects(e) {
    if(projectInput.value === '') {
      projectInput.style = 'border: 1px solid red';
    }
    else {
        projectInput.style = 'border: none';
        nullProject.classList.add('d-none');
        resetSection.classList.remove('d-none')

    // create new project list and delete link.
    const li = document.createElement('li');
    li.classList.add('project-list');
    li.appendChild(document.createTextNode(projectInput.value));
    const link = document.createElement('a');
    link.classList.add('delete-list');
    link.innerHTML = '<span class="iconify" data-icon="heroicons-solid:trash" style="color: #7b3f00;"></span>';
    li.appendChild(link);

    // Add new list to UI
    projects.appendChild(li);

    // store Project in Local storage
    setProjectsToLocalStorage(projectInput.value);

    // Clear input value
    projectInput.value = '';

    }
    // Prevent default
    e.preventDefault();
}

// Delete a Project List
function deleteProject(e) {
    if(e.target.parentElement.classList.contains('delete-list')){
   e.target.parentElement.parentElement.remove();
   console.log('deleted');
   setNull();
    }

    deleteProjectfromLocalStorage(e.target.parentElement.parentElement);
}

//Delete Project list from LS
 function deleteProjectfromLocalStorage(projectList) {
    let projectss;
    if (localStorage.getItem('projectss') === null){
        projectss = [];
    } else {
        projectss = JSON.parse(localStorage.getItem('projectss'));
    }

    projectss.forEach(function(project, index) {
        if (projectList.textContent === project){
            projectss.splice(index, 1);
        }
    });

    localStorage.setItem('projectss', JSON.stringify(projectss));
}

// set page for null projects
function setNull() {
    if (!projects.children.length) {
        nullProject.classList.remove('d-none');
        resetSection.classList.add('d-none');
    } 
}

// filter/search through projects
function filterProjects(e) {
    const search = e.target.value.toLowerCase();

    document.querySelectorAll('.project-list').forEach(function(project) {
      const list = project.firstChild.textContent;
      if (list.toLowerCase().indexOf(search) != -1) {
          project.classList.remove('d-none');
      }else {
          project.classList.add('d-none');
      }
    })
   }

//    clear all projects
function clearProjects() {
    projects.innerHTML = '';
    setNull();
    resetSection.classList.add('d-none');
    localStorage.clear();
}




