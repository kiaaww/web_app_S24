const skills = ["HTML", "CSS", "JavaScript"];

function displaySkills(skillsArray) {
    const skillsList = document.getElementById("skillsList");
    skillsList.innerHTML = "";

    skillsArray.forEach(skill => {
        const listItem = document.createElement("li");
        listItem.textContent = skill;
        skillsList.appendChild(listItem);
    });
}

    displaySkills(skills);

function handleLinkedInClick(event) {
    event.preventDefault();
    alert("Sorry, I do not have a LinkedIn profile :(");
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
        responseMessage.textContent = "please fill in all the fields.";
        responseMessage.className = "error";

        setTimeout(() => {
            responseMessage.style.display = 'none';
        }, 5000);
        return;
    }

    try {
    console.log(`name=${encodeURIComponent(name)}email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`);
    const successMessage = "Message sent successfully!";
    responseMessage.textContent = successMessage;
    responseMessage.className = "success";

    document.getElementById("contactForm").reset();

    setTimeout(() => {
        responseMessage.style.display = 'none';
    }, 5000);

    } catch (error) {
        responseMessage.textContent = "There was an error submitting the form: " + error.message;
        responseMessage.className = "error";

        setTimeout(() => {
            responseMessage.style.display = 'none';
        }, 5000);
    }
});