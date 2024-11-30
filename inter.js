function updateField(element, fieldName) {
    const content = element.textContent;
    localStorage.setItem(fieldName, content);
}

window.onload = function() {
    document.querySelectorAll('[contenteditable]').forEach(element => {
        const fieldName = element.getAttribute('oninput').split(',')[1].trim();
        const savedContent = localStorage.getItem(fieldName);
        if (savedContent) {
            element.textContent = savedContent;
        }
    });
}

function addContact() {
    const contactItems = document.getElementById('contact-container');
    const item = document.createElement('div');
    item.classList.add(['editable-item']);
    item.innerHTML = `
        <div class="contact-item" contenteditable="true" oninput="updateField(this, 'contact')">
            <div class="contact-name">New Contact Item</div>
            <div class="contact-value">Description</div>
            <button class="remove-btn" onclick="removeEntireElement(this)">Remove</button>
        </div>
    `;
    contactItems.appendChild(item);
}

function addExperience() {
    const newExperience = document.createElement('div');
    newExperience.className = 'editable-item';
    newExperience.innerHTML = `
        <div class="experience-item" contenteditable="true" oninput="updateField(this, 'experience')">
            <div class="job-title">New Job Title</div>
            <div class="company">New Company Name</div>
            <div class="location-date">
                <span>New Location</span>
                <span>New Dates</span>
            </div>
            <div class="description">
                Brief description of new responsibilities and achievements.
            </div>
            <button class="remove-btn" onclick="removeEntireElement(this)">Remove</button>
        </div>
    `;
    document.getElementById('experience-container').appendChild(newExperience);
}

function addEducation() {
    const newEducation = document.createElement('div');
    newEducation.className = 'editable-item';
    newEducation.innerHTML = `
        <div class="education-item" contenteditable="true" oninput="updateField(this, 'education')">
            <div class="institution">New Institution</div>
            <div class="degree">New Degree</div>
            <div class="location-date">
                <span>New Location</span>
                <span>New Dates</span>
            </div>
            <div class="description">
                Brief description of new education.
            </div>
            <button class="remove-btn" onclick="removeEntireElement(this)">Remove</button>
        </div>
    `;
    document.getElementById('education-container').appendChild(newEducation);
}

function addSkill() {
    const newSkill = document.createElement('li');
    newSkill.className = 'skill-item editable-item';
    newSkill.innerHTML = `
        <p contenteditable="true" oninput="updateField(this, 'skill')">Skill Name</p>
        <button class="remove-btn-skill" onclick="removeItem(this)">X</button>
    `;
    document.querySelector('.skills-list').appendChild(newSkill);
}

function addLanguageItem() {
const languageItems = document.getElementById('language-items');
const item = document.createElement('div');
item.classList.add(['editable-item', 'language-item']);

item.innerHTML = `
    <div class="contact-name" contenteditable="true" oninput="updateField(this, 'language')">Language</div>
    <span class="contact-value" contenteditable="true" oninput="updateField(this, 'fluency')">Fluency</div>
    <button onclick="removeEntireElement(this)">Remove</button>
`;

languageItems.appendChild(item);
}

function removeItem(button) {
    const editableItem = button.parentElement; // Get the parent editable item
    editableItem.remove(); // Remove it from the DOM
}

function removeEntireElement(button) {
    const editableItem = button.parentElement.parentElement; // Get the parent editable item and its encapsulating parent
    editableItem.remove(); // Remove it from the DOM
}

// Enable dragging of sections
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id); // Set the dragged section's id
        e.target.classList.add('dragging'); // Optional: Add a visual effect
    });

    section.addEventListener('dragover', (e) => {
        e.preventDefault(); // Required to allow dropping
    });

    section.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedSectionId = e.dataTransfer.getData('text/plain');
        const draggedSection = document.getElementById(draggedSectionId);
        
        if (e.target.classList.contains('section') && e.target !== draggedSection) {
            // Insert dragged section before the section being hovered over
            e.target.parentNode.insertBefore(draggedSection, e.target.nextSibling);
        }
    });

    section.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging'); // Remove the visual effect
    });
});