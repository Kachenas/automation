// ===== Tailwind Config =====
if (typeof tailwind !== "undefined") {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          navy: { 900: "#06060e", 800: "#0d0d1a", 700: "#14142b" },
          neon: { blue: "#4f6df5", violet: "#8b5cf6" },
        },
      },
    },
  };
}

// ===== Default Config =====
const defaultConfig = {
  background_color: "#06060e",
  surface_color: "#0d0d1a",
  text_color: "#e2e4f0",
  accent_blue: "#4f6df5",
  accent_violet: "#8b5cf6",
  font_family: "Outfit",
  font_size: 16,
  hero_headline: "Automate Your Business with AI Agents That Actually Work",
  hero_subheadline:
    "We design intelligent systems using AI + automation tools like n8n to eliminate repetitive work, reduce costs, and scale your operations.",
  cta_primary: "Get a Free Automation Audit",
  cta_secondary: "See How It Works",
  problem_headline: "You're Losing Time on Work That Should Be Automated",
  solution_headline: "We Build Intelligent Automation Systems",
  final_cta_headline: "Stop Doing Manual Work. Start Scaling Smarter.",
  final_cta_button: "Book a Free Consultation",
  urgency_text: "\u26A1 Limited onboarding slots available",
};

function applyConfig(config) {
  const c = (key) => config[key] || defaultConfig[key];
  const font = c("font_family");
  const baseSize = c("font_size");
  const baseFontStack = `${font}, 'Outfit', sans-serif`;

  // Background
  const appWrapper = document.getElementById("app-wrapper");
  if (appWrapper) appWrapper.style.backgroundColor = c("background_color");

  document.querySelectorAll(".glass-card").forEach((el) => {
    el.style.background = `linear-gradient(135deg, ${c("surface_color")}cc, ${c("surface_color")}99)`;
  });

  // Text color
  document.body.style.color = c("text_color");

  // Font
  document.body.style.fontFamily = baseFontStack;

  // Font size scaling
  document.querySelectorAll("h1").forEach((el) => {
    el.style.fontSize = `${baseSize * 3.2}px`;
  });
  document.querySelectorAll("h2").forEach((el) => {
    el.style.fontSize = `${baseSize * 2.5}px`;
  });

  // Text content
  const heroH = document.getElementById("hero-headline");
  if (heroH) {
    const text = c("hero_headline");
    heroH.innerHTML = text.replace(
      /(Actually Work|That Actually Work)/g,
      '<span style="background: linear-gradient(135deg, ' +
        c("accent_blue") +
        ", " +
        c("accent_violet") +
        ', #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">$1</span>'
    );
  }

  const heroSub = document.getElementById("hero-subheadline");
  if (heroSub) heroSub.textContent = c("hero_subheadline");

  const ctaPrimary = document.getElementById("cta-primary-btn");
  if (ctaPrimary)
    ctaPrimary.querySelector("span").textContent = c("cta_primary");

  const ctaSecondary = document.getElementById("cta-secondary-btn");
  if (ctaSecondary) ctaSecondary.textContent = c("cta_secondary");

  const probH = document.getElementById("problem-headline");
  if (probH) probH.textContent = c("problem_headline");

  const solH = document.getElementById("solution-headline");
  if (solH) solH.textContent = c("solution_headline");

  const finalH = document.getElementById("final-cta-headline");
  if (finalH) finalH.textContent = c("final_cta_headline");

  const finalBtn = document.getElementById("final-cta-button");
  if (finalBtn)
    finalBtn.querySelector("span").textContent = c("final_cta_button");

  const urgency = document.getElementById("urgency-text");
  if (urgency) urgency.textContent = c("urgency_text");

  // Accent colors on buttons
  document.querySelectorAll(".btn-primary").forEach((el) => {
    el.style.background = `linear-gradient(135deg, ${c("accent_blue")}, ${c("accent_violet")})`;
  });
}

// ===== Element SDK Init =====
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => {
      applyConfig(config);
    },
    mapToCapabilities: (config) => {
      const c = (key) => config[key] || defaultConfig[key];
      return {
        recolorables: [
          {
            get: () => c("background_color"),
            set: (v) => {
              config.background_color = v;
              window.elementSdk.setConfig({ background_color: v });
            },
          },
          {
            get: () => c("surface_color"),
            set: (v) => {
              config.surface_color = v;
              window.elementSdk.setConfig({ surface_color: v });
            },
          },
          {
            get: () => c("text_color"),
            set: (v) => {
              config.text_color = v;
              window.elementSdk.setConfig({ text_color: v });
            },
          },
          {
            get: () => c("accent_blue"),
            set: (v) => {
              config.accent_blue = v;
              window.elementSdk.setConfig({ accent_blue: v });
            },
          },
          {
            get: () => c("accent_violet"),
            set: (v) => {
              config.accent_violet = v;
              window.elementSdk.setConfig({ accent_violet: v });
            },
          },
        ],
        borderables: [],
        fontEditable: {
          get: () => c("font_family"),
          set: (v) => {
            config.font_family = v;
            window.elementSdk.setConfig({ font_family: v });
          },
        },
        fontSizeable: {
          get: () => c("font_size"),
          set: (v) => {
            config.font_size = v;
            window.elementSdk.setConfig({ font_size: v });
          },
        },
      };
    },
    mapToEditPanelValues: (config) => {
      const c = (key) => config[key] || defaultConfig[key];
      return new Map([
        ["hero_headline", c("hero_headline")],
        ["hero_subheadline", c("hero_subheadline")],
        ["cta_primary", c("cta_primary")],
        ["cta_secondary", c("cta_secondary")],
        ["problem_headline", c("problem_headline")],
        ["solution_headline", c("solution_headline")],
        ["final_cta_headline", c("final_cta_headline")],
        ["final_cta_button", c("final_cta_button")],
        ["urgency_text", c("urgency_text")],
      ]);
    },
  });
}

// ===== Scroll Reveal =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Init Lucide Icons =====
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

// ===== Dynamic Year =====
function setCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
setCurrentYear();

// ===== Contact Form Handler =====
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Message Sent!</span>';
    btn.disabled = true;
    btn.style.opacity = "0.7";
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.opacity = "1";
      contactForm.reset();
    }, 3000);
  });
}
