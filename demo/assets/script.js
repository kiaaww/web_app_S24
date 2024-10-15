class DogAPI {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api/breeds/image/random';
    }

    async fetchDogImage() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Error fetching dog image: ', error);
            return null;
        }
    }
}

async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error('Error fetching project data');
        }
        const projects = await response.json();

        projects.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

        const projectGrid = document.getElementById('project-grid');
        projectGrid.innerHTML = '';

        projects.forEach(project => {
            const article = document.createElement('article');

            const title = document.createElement('h3');
            title.textContent = project.title;
            article.appendChild(title);

            const figure = document.createElement('figure');

            if (project.media.type === 'video') {
                const video = document.createElement('video');
                video.width = project.media.width;
                video.height = project.media.height;
                video.controls = true;
                const source = document.createElement('source');
                source.src = project.media.src;
                source.type = 'video/mp4';
                video.appendChild(source);
                figure.appendChild(video);
            } else if (project.media.type === 'image') {
                const img = document.createElement('img');
                img.src = project.media.src;
                img.alt = project.media.alt;
                figure.appendChild(img);
            }

            const figcaption = document.createElement('figcaption');
            figcaption.textContent = project.description;
            figure.appendChild(figcaption);

            article.appendChild(figure);

            const details = document.createElement('p');
            details.textContent = project.details;
            article.appendChild(details);

            projectGrid.appendChild(article);
        });

        populateProjectTable(projects);

    } catch (error) {
        console.error('Error loading projects: ', error);
    }
}

function populateProjectTable(projects) {
    const tableBody = document.querySelector('#about table tbody');
    tableBody.innerHTML = '';

    projects.forEach(project => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = project.title;
        row.appendChild(nameCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = project.date;
        row.appendChild(dateCell);

        const descCell = document.createElement('td');
        descCell.textContent = project.description;
        row.appendChild(descCell);

        tableBody.appendChild(row);
    });
}

    document.addEventListener('DOMContentLoaded', loadProjects);

class App {
    constructor() {
        this.dogAPI = new DogAPI();
        this.dogContainer = document.getElementById('dog-image-container');
        this.loadImage = document.getElementById('load-image');
        this.initEventListeners();
        this.skills = ["HTML", "CSS", "JavaScript"];
        this.displaySkills(this.skills);
    }

    initEventListeners() {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mainNav = document.getElementById('main-nav');
        const sections = document.querySelectorAll("main section");

        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('nav-hidden');
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute("href").substring(1);

            sections.forEach(section => {
                section.classList.add("hidden");
                section.classList.remove("visible");
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove("hidden");
                targetSection.classList.add("visible");
            }

            if (!mainNav.classList.contains('nav-hidden')) {
                mainNav.classList.add('nav-hidden');
            }
        });
    });

    this.loadImage.addEventListener('click', () => this.displayDogImage());

    }

    async displayDogImage() {
        this.loadImage.disabled = true;
        const imageUrl = await this.dogAPI.fetchDogImage();

        this.dogContainer.innerHTML = '';

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Random Dog';
            this.dogContainer.appendChild(img);
        } else {
            this.dogContainer.innerHTML = '<p>Failed to load image, Please try again.</p>';
        }

        setTimeout(() => {
            this.loadImage.disabled = false;
        }, 2000);
    }
    displaySkills(skillsArray) {
        const skillsList = document.getElementById("skillsList");
        skillsList.innerHTML = "";
    
        skillsArray.forEach(skill => {
            const listItem = document.createElement("li");
            listItem.textContent = skill;
            skillsList.appendChild(listItem);
        });
    }
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const responseMessage = document.getElementById("formResponse");

    responseMessage.textContent = "";
    responseMessage.className = "";
    responseMessage.style.display = 'block';

    if (name === "" || email === "" || message === "") {
        App.prototype.showMessage(responseMessage, "Please fill in all the fields.", "error");
        return;
    }

    try {
        console.log(`name=${encodeURIComponent(name)}email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`);
        App.prototype.showMessage(responseMessage, "Message sent successfully!", "success");
        document.getElementById("contactForm").reset();

    } catch (error) {
        App.prototype.showMessage(responseMessage, "there was an error submitting the form: " + error.message, "error");
    }
});

App.prototype.showMessage = function (responseMessage, message, type) {
    responseMessage.textContent = message;
    responseMessage.className = type;

    setTimeout(() => {
        responseMessage.style.display = 'none';
    }, 5000);
};

document.addEventListener('DOMContentLoaded', () => {
    new App();
});

function handleLinkedInClick(event) {
    event.preventDefault();
    alert("Sorry, I do not have a LinkedIn profile :(");
}