/* ===============================
   CONSULTATION BUTTON
   =============================== */
document.querySelector('.primary').addEventListener('click', () => {
  alert('We’ll contact you soon to schedule your consultation.');
});

/* ===============================
   CONTACT FORM SUBMISSION
   =============================== */
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for reaching out! We’ll reply shortly.');
});

/* ===============================
   HEADER SCROLL BEHAVIOR
   =============================== */
let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector('.navbar');

window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    // scrolling up → show header smoothly at 15px
    navbar.style.top = "15px";
    navbar.style.opacity = "1";
  } else {
    // scrolling down → hide header smoothly
    navbar.style.top = "-100px"; // move out of view
    navbar.style.opacity = "0";
  }
  prevScrollPos = currentScrollPos;
});

/* ===============================
   BUTTON INTERACTIONS
   =============================== */
document.querySelectorAll('.learn-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('More details coming soon!');
  });
});

document.querySelector('.view-btn').addEventListener('click', () => {
  alert('Redirecting to full project portfolio...');
  // Later: window.location.href = 'portfolio.html';
});

/* ===============================
   FADE-IN ANIMATIONS
   =============================== */
// Project cards
const cards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
cards.forEach(card => cardObserver.observe(card));

// Steps
const steps = document.querySelectorAll('.step');
const stepObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
steps.forEach(step => stepObserver.observe(step));

// Reviews
const reviews = document.querySelectorAll('.review-card');
const reviewObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
reviews.forEach(review => reviewObserver.observe(review));

/* ===============================
   REVIEWS DATA + RENDERING
   =============================== */
let reviewsData = [
  { name: "Emily R.", role: "Homeowner", rating: "★★★★★", text: "Excellent craftsmanship on our custom shower build. The tile work is flawless. They finished exactly on the timeline they promised. Highly recommend.", photo: "client3.jpg" },
  { name: "Michael T.", role: "Homeowner", rating: "★★★★★", text: "We were nervous about the mess of a renovation, but they kept our home clean and communicated every step of the way. The final result exceeded our expectations!", photo: "client2.jpg" },
  { name: "Sarah J.", role: "Homeowner", rating: "★★★★★", text: "The team at Bathmaster Designs completely transformed our outdated master bath into a modern spa. Their attention to detail and professionalism was outstanding from start to finish.", photo: "client1.jpg" }
];

let currentIndex = 0;
const reviewList = document.getElementById("reviewList");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// ===============================
// CLIENT REVIEWS RENDERING
// ===============================
function renderReviews() {
  reviewList.innerHTML = "";
  const slice = reviewsData.slice(currentIndex, currentIndex + 3);
  slice.forEach(review => {
    const card = document.createElement("div");
    card.classList.add("review-card");

    // Use default profile icon if no photo provided OR if specific names
    const noPhotoNames = ["Sarah J", "Michel T", "Emily R"];
    const photoSrc = (review.photo && review.photo !== "default.jpg" && !noPhotoNames.includes(review.name))
      ? review.photo
      : "C:\\Users\\kurtj\\OneDrive\\Documents\\BathmasterDesigns 1.2\\profile-icon.png.png"; // <-- place your default profile icon image in your project folder

    card.innerHTML = `
      <div class="stars">${review.rating}</div>
      <p class="quote">"${review.text}"</p>
      <div class="client">
        <img src="${photoSrc}" alt="${review.name}" class="client-photo">
        <div class="client-info">
          <strong>${review.name}</strong><br>
          <span>${review.role}</span>
        </div>
      </div>
    `;
    reviewList.appendChild(card);
  });
}


/* ===============================
   REVIEW FORM SUBMISSION HANDLER
   =============================== */
document.getElementById("clientReviewForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const rating = document.getElementById("rating").value;
  const text = document.getElementById("review").value;
  const photoInput = document.getElementById("profileImage");

  let photo = "default.jpg";
  if (photoInput.files.length > 0) {
    photo = URL.createObjectURL(photoInput.files[0]);
  }

  reviewsData.unshift({ name, role, rating, text, photo });
  currentIndex = 0;
  renderReviews();
  this.reset();

  alert("Thank you! Your review has been posted.");
});

/* ===============================
   REVIEW NAVIGATION BUTTONS
   =============================== */
nextBtn.addEventListener("click", () => {
  if (currentIndex + 3 < reviewsData.length) {
    currentIndex += 3;
  } else {
    currentIndex = 0;
  }
  renderReviews();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex - 3 >= 0) {
    currentIndex -= 3;
  } else {
    currentIndex = Math.max(0, reviewsData.length - 3);
  }
  renderReviews();
});

/* ===============================
   TOGGLE REVIEW FORM
   =============================== */
const toggleBtn = document.getElementById('toggleFormBtn');
const reviewForm = document.querySelector('.review-form');
toggleBtn.addEventListener('click', () => {
  reviewForm.classList.toggle('active');
  toggleBtn.textContent = reviewForm.classList.contains('active') ? "Hide Review Form" : "Share Your Experience";
});

/* ===============================
   INITIAL RENDER
   =============================== */
renderReviews();

/* ===============================
   CONTACT FORM ANIMATION
   =============================== */
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const wrapper = document.querySelector(".contact-wrapper");
  wrapper.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  wrapper.style.opacity = "0.9";
  wrapper.style.transform = "scale(0.98)";

  setTimeout(() => {
    this.reset();
    wrapper.style.opacity = "1";
    wrapper.style.transform = "scale(1)";
    alert("Thank you! Your request has been submitted.");
  }, 600);
});

/* ===============================
   FOOTER ANIMATION OBSERVER
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  observer.observe(footer);
});

// ===============================
// FOOTER LINKS BEHAVIOR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const portfolioModal = document.getElementById("portfolioModal");

  // Services → scroll to Services section
  const footerServices = document.getElementById("footerServices");
  footerServices.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
  });

  // Our Process → scroll to Process section
  const footerProcess = document.getElementById("footerProcess");
  footerProcess.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("process").scrollIntoView({ behavior: "smooth" });
  });

  // Portfolio → open portfolio modal
  const footerPortfolio = document.getElementById("footerPortfolio");
  footerPortfolio.addEventListener("click", (e) => {
    e.preventDefault();
    portfolioModal.style.display = "flex";
  });
});

/* ===============================
   ABOUT SECTION SERVICE CARDS ANIMATION
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 200); // stagger each card by 200ms
      }
    });
  }, { threshold: 0.2 });

  serviceCards.forEach(card => observer.observe(card));
});

// ===============================
// PORTFOLIO MODAL BEHAVIOR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const portfolioLink = document.querySelector('a[href="#portfolio"]');
  const modal = document.getElementById("portfolioModal");
  const closeBtn = document.querySelector(".close-btn");

  // Open modal when clicking Portfolio link
  portfolioLink.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default scroll
    modal.style.display = "flex";
  });

  // Close modal when clicking X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// ===============================
// PORTFOLIO CATEGORY POPUP
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const categoryLinks = document.querySelectorAll(".category-link");
  const categoryModal = document.getElementById("categoryModal");
  const categoryTitle = document.getElementById("categoryTitle");
  const categoryImages = document.getElementById("categoryImages");
  const closeBtns = document.querySelectorAll(".close-btn");

  // Open category modal when clicking a category link
  categoryLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.dataset.category;
      categoryTitle.textContent = category;

      // Load images based on category
      categoryImages.innerHTML = "";
      let images = [];
      if (category === "Half Bath & Basic Renovations") {
        images = ["half1.jpg","half2.jpg","half3.jpg"];
      } else if (category === "Full Bathroom Renovations") {
        images = ["full1.jpg","full2.jpg","full3.jpg"];
      } else if (category === "New Bathroom Builds") {
        images = ["new1.jpg","new2.jpg","new3.jpg"];
      }

      images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = category;
        categoryImages.appendChild(img);
      });

      categoryModal.style.display = "flex";
    });
  });

  // Close modals
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
});

// ===============================
// VIEW ALL PROJECTS → PORTFOLIO MODAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const viewBtn = document.querySelector(".view-btn");
  const portfolioModal = document.getElementById("portfolioModal");

  viewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    portfolioModal.style.display = "flex"; // open the portfolio modal
  });
});

// ===============================
// IMAGE POPUP INSIDE PORTFOLIO MODAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const portfolioImages = document.querySelectorAll(".modal-gallery img, .category-gallery img");
  const imageModal = document.getElementById("imageModal");
  const popupImage = document.getElementById("popupImage");
  const closeBtn = imageModal.querySelector(".close-btn");

  // Open image popup
  portfolioImages.forEach(img => {
    img.addEventListener("click", () => {
      popupImage.src = img.src;
      popupImage.alt = img.alt;
      imageModal.style.display = "flex";
    });
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    imageModal.style.display = "none";
  });

  // Close when clicking outside image
  window.addEventListener("click", (e) => {
    if (e.target === imageModal) {
      imageModal.style.display = "none";
    }
  });
});
// ===============================
// IMAGE POPUP SIZE CONTROL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const portfolioImages = document.querySelectorAll(".modal-gallery img, .category-gallery img");
  const imageModal = document.getElementById("imageModal");
  const popupImage = document.getElementById("popupImage");
  const closeBtn = imageModal.querySelector(".close-btn");

  // Open image popup with dynamic sizing
  portfolioImages.forEach(img => {
    img.addEventListener("click", () => {
      popupImage.src = img.src;
      popupImage.alt = img.alt;

      // Reset styles
      popupImage.style.width = "auto";
      popupImage.style.height = "auto";

      // Calculate viewport limits
      const maxWidth = window.innerWidth * 0.5;  // 50% of viewport width
      const maxHeight = window.innerHeight * 0.5; // 50% of viewport height

      // Create temp image to get natural size
      const tempImg = new Image();
      tempImg.src = img.src;
      tempImg.onload = () => {
        let width = tempImg.width;
        let height = tempImg.height;

        // Scale down if larger than limits
        if (width > maxWidth) {
          const scale = maxWidth / width;
          width *= scale;
          height *= scale;
        }
        if (height > maxHeight) {
          const scale = maxHeight / height;
          width *= scale;
          height *= scale;
        }

        popupImage.style.width = width + "px";
        popupImage.style.height = height + "px";
      };

      imageModal.style.display = "flex";
    });
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    imageModal.style.display = "none";
  });

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === imageModal) {
      imageModal.style.display = "none";
    }
  });
});

// ===============================
// MOBILE NAVBAR TOGGLE
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".navbar nav ul");

  menuToggle.onclick = () => {
    navMenu.classList.toggle("show");
    menuToggle.classList.toggle("active");
  };
});
// ===============================
// CHATBOT LOGIC
// ===============================
const toggle = document.querySelector('.chat-toggle');
const windowEl = document.querySelector('.chat-window');
const closeBtn = document.querySelector('.chat-close');
const chatBody = document.getElementById('chatBody');
const input = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

toggle.addEventListener('click', () => {
  windowEl.style.display = 'flex';
  toggle.style.display = 'none'; // hide bubble when expanded
  resetChat();
});

closeBtn.addEventListener('click', () => {
  windowEl.style.display = 'none';
  toggle.style.display = 'flex'; // show bubble again
  resetChat();
});

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';

  setTimeout(() => {
    let reply = '';
    if (/inspiration/i.test(text)) {
      reply = 'Great choice! You can browse our portfolio to see completed projects.';
    } else if (/renovation/i.test(text)) {
      reply = 'Perfect! Would you like to schedule a free consultation?';
    } else if (/full remodel/i.test(text)) {
      reply = 'We specialize in complete bathroom transformations.';
    } else if (/shower/i.test(text)) {
      reply = 'We can design and build custom showers tailored to your space.';
    } else if (/accessible/i.test(text)) {
      reply = 'We create safe, stylish accessible bathrooms.';
    } else if (/yes/i.test(text)) {
      reply = 'Please provide your email or phone number, and we’ll reach out.';
    } else if (/no/i.test(text)) {
      reply = 'No problem! You can explore our services anytime.';
    } else {
      reply = 'Thanks for sharing! Feel free to ask me about services, portfolio, or consultations.';
    }
    addMessage(reply, 'bot');
  }, 600);
}

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = type === 'bot' ? 'bot-msg' : 'user-msg';
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function resetChat() {
  chatBody.innerHTML = '';
  addMessage('Hello! 👋 Welcome to Bath Master Design. Are you looking for inspiration or ready to start a renovation project?', 'bot');
}
