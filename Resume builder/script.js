// Global variables
let educationCount = 1;
let experienceCount = 1;
let projectCount = 1;

// Template HTML structures
const templates = {
    modern: `
        <div class="resume modern">
            <h1>{{name}}</h1>
            <p>{{email}} | {{phone}} | {{address}}</p>
            <h2>Professional Summary</h2>
            <p>{{summary}}</p>
            {{#education}}
            <h2>Education</h2>
            <ul>
                {{#educationList}}
                <li>{{degree}} - {{institution}} ({{year}})</li>
                {{/educationList}}
            </ul>
            {{/education}}
            {{#experience}}
            <h2>Work Experience</h2>
            <ul>
                {{#experienceList}}
                <li><strong>{{title}}</strong> at {{company}} ({{duration}})<br>{{description}}</li>
                {{/experienceList}}
            </ul>
            {{/experience}}
            {{#skills}}
            <h2>Skills</h2>
            <p>{{skills}}</p>
            {{/skills}}
            {{#projects}}
            <h2>Projects</h2>
            <ul>
                {{#projectList}}
                <li><strong>{{name}}</strong><br>{{description}}</li>
                {{/projectList}}
            </ul>
            {{/projects}}
        </div>
    `,
    classic: `
        <div class="resume classic">
            <h1>{{name}}</h1>
            <p>{{email}} | {{phone}} | {{address}}</p>
            <h2>Professional Summary</h2>
            <p>{{summary}}</p>
            {{#education}}
            <h2>Education</h2>
            <ul>
                {{#educationList}}
                <li>{{degree}} - {{institution}} ({{year}})</li>
                {{/educationList}}
            </ul>
            {{/education}}
            {{#experience}}
            <h2>Work Experience</h2>
            <ul>
                {{#experienceList}}
                <li><strong>{{title}}</strong> at {{company}} ({{duration}})<br>{{description}}</li>
                {{/experienceList}}
            </ul>
            {{/experience}}
            {{#skills}}
            <h2>Skills</h2>
            <p>{{skills}}</p>
            {{/skills}}
            {{#projects}}
            <h2>Projects</h2>
            <ul>
                {{#projectList}}
                <li><strong>{{name}}</strong><br>{{description}}</li>
                {{/projectList}}
            </ul>
            {{/projects}}
        </div>
    `,
    minimalist: `
        <div class="resume minimalist">
            <h1>{{name}}</h1>
            <p>{{email}} | {{phone}} | {{address}}</p>
            <h2>Summary</h2>
            <p>{{summary}}</p>
            {{#education}}
            <h2>Education</h2>
            <ul>
                {{#educationList}}
                <li>{{degree}} - {{institution}} ({{year}})</li>
                {{/educationList}}
            </ul>
            {{/education}}
            {{#experience}}
            <h2>Experience</h2>
            <ul>
                {{#experienceList}}
                <li><strong>{{title}}</strong> at {{company}} ({{duration}})<br>{{description}}</li>
                {{/experienceList}}
            </ul>
            {{/experience}}
            {{#skills}}
            <h2>Skills</h2>
            <p>{{skills}}</p>
            {{/skills}}
            {{#projects}}
            <h2>Projects</h2>
            <ul>
                {{#projectList}}
                <li><strong>{{name}}</strong><br>{{description}}</li>
                {{/projectList}}
            </ul>
            {{/projects}}
        </div>
    `
};

// Function to add education entry
function addEducation() {
    educationCount++;
    const educationSection = document.getElementById('education-section');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <input type="text" placeholder="Degree">
        <input type="text" placeholder="Institution">
        <input type="text" placeholder="Year">
        <button class="add-btn" onclick="addEducation()">Add Another</button>
    `;
    educationSection.appendChild(newEntry);
}

// Function to add experience entry
function addExperience() {
    experienceCount++;
    const experienceSection = document.getElementById('experience-section');
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry';
    newEntry.innerHTML = `
        <input type="text" placeholder="Job Title">
        <input type="text" placeholder="Company">
        <input type="text" placeholder="Duration">
        <textarea placeholder="Description"></textarea>
        <button class="add-btn" onclick="addExperience()">Add Another</button>
    `;
    experienceSection.appendChild(newEntry);
}

// Function to add project entry
function addProject() {
    projectCount++;
    const projectsSection = document.getElementById('projects-section');
    const newEntry = document.createElement('div');
    newEntry.className = 'project-entry';
    newEntry.innerHTML = `
        <input type="text" placeholder="Project Name">
        <textarea placeholder="Description"></textarea>
        <button class="add-btn" onclick="addProject()">Add Another</button>
    `;
    projectsSection.appendChild(newEntry);
}

// Function to collect data
function collectData() {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        summary: document.getElementById('summary').value,
        education: [],
        experience: [],
        skills: document.getElementById('skills').value,
        projects: []
    };

    // Collect education
    const educationEntries = document.querySelectorAll('.education-entry');
    educationEntries.forEach(entry => {
        const inputs = entry.querySelectorAll('input');
        data.education.push({
            degree: inputs[0].value,
            institution: inputs[1].value,
            year: inputs[2].value
        });
    });

    // Collect experience
    const experienceEntries = document.querySelectorAll('.experience-entry');
    experienceEntries.forEach(entry => {
        const inputs = entry.querySelectorAll('input');
        const textarea = entry.querySelector('textarea');
        data.experience.push({
            title: inputs[0].value,
            company: inputs[1].value,
            duration: inputs[2].value,
            description: textarea.value
        });
    });

    // Collect projects
    const projectEntries = document.querySelectorAll('.project-entry');
    projectEntries.forEach(entry => {
        const inputs = entry.querySelectorAll('input');
        const textarea = entry.querySelector('textarea');
        data.projects.push({
            name: inputs[0].value,
            description: textarea.value
        });
    });

    return data;
}

// Function to render preview
function renderPreview() {
    const template = document.getElementById('template-select').value;
    const data = collectData();
    const includePersonal = document.getElementById('include-personal').checked;
    const includeEducation = document.getElementById('include-education').checked;
    const includeExperience = document.getElementById('include-experience').checked;
    const includeSkills = document.getElementById('include-skills').checked;
    const includeProjects = document.getElementById('include-projects').checked;

    let html = templates[template];

    // Replace placeholders
    html = html.replace(/{{name}}/g, data.name);
    html = html.replace(/{{email}}/g, data.email);
    html = html.replace(/{{phone}}/g, data.phone);
    html = html.replace(/{{address}}/g, data.address);
    html = html.replace(/{{summary}}/g, data.summary);
    html = html.replace(/{{skills}}/g, data.skills);

    // Handle conditional sections
    if (!includePersonal) {
        html = html.replace(/<h1>{{name}}<\/h1>\s*<p>{{email}} \| {{phone}} \| {{address}}<\/p>/, '');
    }
    if (!includeEducation) {
        html = html.replace(/{{#education}}[\s\S]*?{{\/education}}/g, '');
    } else {
        let educationHtml = '<ul>';
        data.education.forEach(edu => {
            educationHtml += `<li>${edu.degree} - ${edu.institution} (${edu.year})</li>`;
        });
        educationHtml += '</ul>';
        html = html.replace(/{{#educationList}}[\s\S]*?{{\/educationList}}/g, educationHtml);
    }
    if (!includeExperience) {
        html = html.replace(/{{#experience}}[\s\S]*?{{\/experience}}/g, '');
    } else {
        let experienceHtml = '<ul>';
        data.experience.forEach(exp => {
            experienceHtml += `<li><strong>${exp.title}</strong> at ${exp.company} (${exp.duration})<br>${exp.description}</li>`;
        });
        experienceHtml += '</ul>';
        html = html.replace(/{{#experienceList}}[\s\S]*?{{\/experienceList}}/g, experienceHtml);
    }
    if (!includeSkills) {
        html = html.replace(/{{#skills}}[\s\S]*?{{\/skills}}/g, '');
    }
    if (!includeProjects) {
        html = html.replace(/{{#projects}}[\s\S]*?{{\/projects}}/g, '');
    } else {
        let projectsHtml = '<ul>';
        data.projects.forEach(proj => {
            projectsHtml += `<li><strong>${proj.name}</strong><br>${proj.description}</li>`;
        });
        projectsHtml += '</ul>';
        html = html.replace(/{{#projectList}}[\s\S]*?{{\/projectList}}/g, projectsHtml);
    }

    document.getElementById('preview').innerHTML = html;
}

// Function to save draft
function saveDraft() {
    const data = collectData();
    localStorage.setItem('resumeDraft', JSON.stringify(data));
    alert('Draft saved!');
}

// Function to load draft
function loadDraft() {
    const data = JSON.parse(localStorage.getItem('resumeDraft'));
    if (data) {
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;
        document.getElementById('address').value = data.address;
        document.getElementById('summary').value = data.summary;
        document.getElementById('skills').value = data.skills;
        // Load education, experience, projects (simplified)
        alert('Draft loaded! (Note: Dynamic entries need manual handling)');
    }
}

// Function to download PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const preview = document.getElementById('preview');
    doc.html(preview, {
        callback: function (doc) {
            doc.save('resume.pdf');
        },
        x: 10,
        y: 10
    });
}

// Event listeners
document.getElementById('preview-btn').addEventListener('click', renderPreview);
document.getElementById('save-btn').addEventListener('click', saveDraft);
document.getElementById('load-btn').addEventListener('click', loadDraft);
document.getElementById('download-btn').addEventListener('click', downloadPDF);