// Mobile Menu Toggle
const menuToggle = document.createElement("button");
menuToggle.innerText = "☰";
menuToggle.classList.add("menu-toggle");

const navbar = document.querySelector(".navbar .container");
navbar.appendChild(menuToggle);

menuToggle.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Fade-in Effect when Scrolling
const sections = document.querySelectorAll(
  ".hero-content, .hero-image, .portfolio-stats, .services, .why-me"
);

const revealSection = () => {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealSection);
revealSection(); // Run initially

// Animate sections on scroll
const animateOnScroll = () => {
  sections.forEach((section) => {
    const sectionPos = section.getBoundingClientRect().top;
    if (sectionPos < window.innerHeight - 100) {
      section.classList.add("show");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // Initial trigger

const skillCards = document.querySelectorAll(".skill-card");

const animateSkills = () => {
  skillCards.forEach((card) => {
    const pos = card.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) {
      card.classList.add("show");
    }
  });
};

window.addEventListener("scroll", animateSkills);
animateSkills(); // Trigger on page load

const counters = document.querySelectorAll(".stat-value");
let activated = false;

const animateStats = () => {
  if (activated) return;
  activated = true;

  counters.forEach((counter) => {
    let target = parseInt(counter.innerText);
    let count = 0;

    const updateCounter = () => {
      if (count < target) {
        count += Math.ceil(target / 50);
        counter.innerText = count + "+";
        setTimeout(updateCounter, 30);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCounter();
  });
};

window.addEventListener("scroll", () => {
  const statsSection = document.querySelector(".portfolio-stats");
  const pos = statsSection.getBoundingClientRect().top;
  if (pos < window.innerHeight - 50) animateStats();
});

const whyMeSection = document.querySelector(".why-me");

const revealWhyMe = () => {
  if (whyMeSection.getBoundingClientRect().top < window.innerHeight - 50) {
    whyMeSection.classList.add("show");
  }
};

window.addEventListener("scroll", revealWhyMe);
revealWhyMe(); // Run initially

document.getElementById("year").textContent = new Date().getFullYear();

const projectCards = document.querySelectorAll(".project-card");

const revealProjects = () => {
  projectCards.forEach((card) => {
    const pos = card.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) {
      card.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealProjects);
revealProjects(); // Trigger on page load

const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const cards = document.querySelectorAll(".project-card");

let index = 0;
const totalCards = cards.length;
const visibleCards = 3;

const updateCarousel = () => {
  const offset = index * (100 / visibleCards);
  track.style.transform = `translateX(-${offset}%)`;
};

nextBtn.addEventListener("click", () => {
  if (index < totalCards - visibleCards) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

// Auto-slide every 4 seconds
setInterval(() => {
  if (index < totalCards - visibleCards) {
    index++;
  } else {
    index = 0;
  }
  updateCarousel();
}, 4000);

document.addEventListener("DOMContentLoaded", function () {
  // GitHub Calendar (Heatmap)
  GitHubCalendar("#github-calendar", "brianamol", {
    responsive: true,
    global_stats: false,
    tooltips: true,
  });

  // Fetch GitHub stats for chart
  fetch("https://api.github.com/users/brianamol/repos")
    .then((response) => response.json())
    .then((repos) => {
      const languages = {};
      repos.forEach((repo) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      // Convert data to Chart.js format
      const labels = Object.keys(languages);
      const data = Object.values(languages);

      // Create a Pie Chart using Chart.js
      const ctx = document
        .getElementById("github-stats-chart")
        .getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Most Used Languages",
              data: data,
              backgroundColor: ["#ffcc00", "#fca311", "#e5e5e5", "#14213d"],
              borderWidth: 1,
            },
          ],
        },
      });
    })
    .catch((error) => console.error("Error fetching GitHub data:", error));
});

fetch("https://dev.to/api/articles?username=brianamol&per_page=3")
  .then((response) => response.json())
  .then((articles) => {
    let articlesHTML = "";
    articles.forEach((article) => {
      articlesHTML += `
      <div class="devto-article">
        <img src="${
          article.cover_image || "default-image.jpg"
        }" alt="Article Image">
        <h3>${article.title}</h3>
        <p>${article.description.substring(0, 100)}...</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;
    });
    document.getElementById("devto-articles").innerHTML = articlesHTML;
  })
  .catch((error) => console.error("Error fetching Dev.to articles:", error));

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  themeToggle.checked = savedTheme === "light";
}

// Toggle theme
themeToggle.addEventListener("change", (e) => {
  const theme = e.target.checked ? "light" : "dark";
  body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});
