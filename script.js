const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

const applyTheme = (theme) => {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
};

applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark-mode")
    ? "light"
    : "dark";

  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

const activateNavLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activateNavLink(entry.target.id);
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => observer.observe(section));
// --- 추가영역: 연락처 기능 ---

// 1. 이메일 복사 함수
function copyEmail() {
  const email = "k9075k@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById("toast");
    toast.textContent = "메일 주소(" + email + ")가 복사되었습니다.";
    toast.className = "toast show";

    // 3초 뒤 자동으로 사라지게 하려면 아래 주석을 해제하세요
    // setTimeout(hideToast, 3000);
  });
}

// 2. 토스트 숨기기 함수 (클릭 시 호출)
function hideToast() {
  document.getElementById("toast").className = "toast";
}

// 3. 전화번호 오버레이 보이기
function showPhone() {
  const overlay = document.getElementById("phoneOverlay");
  if (overlay) overlay.style.display = "flex";
}

// 4. 전화번호 오버레이 숨기기
function hidePhone() {
  const overlay = document.getElementById("phoneOverlay");
  if (overlay) overlay.style.display = "none";
}
