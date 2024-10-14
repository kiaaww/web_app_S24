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
        const bonusSection = document.getElementById('bonus-section');
        const openBonusBtn = document.getElementById('open-bonus-btn');
        const closeBonusBtn = document.getElementById('close-bonus-btn');

        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('nav-hidden');
    });
    
    openBonusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        bonusSection.style.display = 'flex';
        window.scrollTo(0,bonusSection.offsetTop);
    });

    closeBonusBtn.addEventListener('click', () => {
        bonusSection.style.display = 'none';
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
        this.showMessage(responseMessage, "Please fill in all the fields.", "error");
        return;
    }

    try {
        console.log(`name=${encodeURIComponent(name)}email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`);
        this.showMessage(responseMessage, "Message sent successfully!", "success");
        document.getElementById("contactForm").reset();

    } catch (error) {
        this.showMessage(responseMessage, "there was an error submitting the form: " + error.message, "error");
    }
}.bind(App.prototype));

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