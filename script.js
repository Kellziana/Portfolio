// intro
const text = "Hi, I'm Samina. Welcome to my portfolio!";
const speed = 50;
let i = 0;

function typeText() {
    if (i < text.length) {
        document.getElementById("typed-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeText, speed);
    }
}

window.onload = typeText;

// bg
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#00ffe0" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00ffe0",
            opacity: 0.4,
            width: 1
        },
        move: { enable: true, speed: 2 }
    }
});

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}


const sections = document.querySelectorAll('.info-section');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    }
);

sections.forEach(section => {
    observer.observe(section);
});

const techToggle = document.querySelector('.tech-toggle');
const skillsContainer = document.querySelector('#stack .skills-container');
const arrow = document.querySelector('.tech-toggle .arrow');
const fills = document.querySelectorAll('#stack .fill');

if (techToggle && skillsContainer) {
    let isOpen = false;

    techToggle.addEventListener('click', () => {
        isOpen = !isOpen;

        skillsContainer.style.display = isOpen ? 'block' : 'none';
        arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';

        fills.forEach(fill => {
            fill.style.width = isOpen ?
                fill.style.getPropertyValue('--percent') :
                '0';
        });
    });
}

// Fade in 
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'all 0.8s ease';
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3,
});

projectCards.forEach(card => projectObserver.observe(card));

// Scroll
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = "1";
        scrollToTopBtn.style.pointerEvents = "auto";
    } else {
        scrollToTopBtn.style.opacity = "0";
        scrollToTopBtn.style.pointerEvents = "none";
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// Modal
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = document.querySelector(".modal-title");
const modalMedia = document.getElementById("modalMedia");
const modalStack = document.getElementById("modalStack");
const modalDesc = document.getElementById("modalDesc");
const modalGitHub = document.getElementById("modalGitHub");
const modalHow = document.getElementById("modalHow");

// Open modal
document.querySelectorAll(".view-project-btn").forEach(button => {
    button.addEventListener("click", () => {
        const title = button.dataset.title || "Project";
        const video = button.dataset.video;
        const desc = button.dataset.desc || "";
        const stack = button.dataset.stack || "";
        const github = button.dataset.github || "#";
        const how = button.dataset.how || "No details provided.";

        modalTitle.textContent = title;
        modalStack.textContent = stack;
        modalDesc.textContent = desc;
        modalHow.textContent = how;

        modalMedia.innerHTML = "";
        if (video) {
            const gif = document.createElement("img");
            gif.src = video;
            gif.alt = `${title} demo`;
            gif.classList.add("modal-gif");
            modalMedia.appendChild(gif);
        } else {
            modalMedia.innerHTML = "<p style='color: #00ffe0;'>No video available.</p>";
        }
        modalGitHub.href = github;
        modal.style.display = "block";
    });
});


// Close modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});