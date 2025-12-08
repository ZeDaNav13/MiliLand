(function () {
  const body = document.body;
  const mainEl = document.querySelector("main");
  const scrollHints = document.querySelector(".scroll-hints");
  const chevronLeft = document.querySelector(".chevron-left");
  const chevronRight = document.querySelector(".chevron-right");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const contactModal = document.getElementById("contact-modal");
  const contactOpeners = document.querySelectorAll("[data-open-contact]");
  const contactClosers = document.querySelectorAll("[data-close-contact]");
  const contactForm = contactModal?.querySelector(".contact-form");
  const contactSubmit = contactModal?.querySelector(".contact-submit");
  const contactInputs = contactForm ? Array.from(contactForm.querySelectorAll("input")) : [];
  const isWorks = body.classList.contains("page-works");
  let worksLockedToGrid = isWorks;
  const workCircles = isWorks ? Array.from(document.querySelectorAll(".brand-circle[data-project]")) : [];
  const workDetailSlide = document.getElementById("work-detail");
  const workDetailTitle = document.getElementById("detail-title");
  const workDetailCircle = document.getElementById("detail-circle");
  const workDetailDescription = document.getElementById("detail-description");
  const workDetailTags = document.getElementById("detail-tags");

  const getWorksSlideIndex = () => {
    if (!mainEl) return 0;
    return Math.round(mainEl.scrollLeft / mainEl.clientWidth);
  };

  const longBody = isWorks ? "This project runs on a calm, reliable build: content is structured, performance budgets are enforced, and analytics land exactly where they need to be. Every module is documented, named, and reusable so future campaigns can plug in without rework. The launch path is mapped end-to-end, from the first impression down to post-conversion nurture. Accessibility checks and keyboard paths are baked into the components, and motion is used sparingly to guide the eye, not to distract. The client team gets Storybook notes, Figma tokens, and quickstart docs so they can ship with confidence. We leave room for experiments: A/B slots, copy variants, and safe toggles let the team learn without breaking production. Deployment is automated, with preview environments for every change, and rollbacks are one click away if needed. We write the boring but critical parts too: empty states, error handling, loading skeletons, and microcopy that explains what’s happening. We keep a running decision log so anyone can track tradeoffs and know why something is the way it is. QA checklists and lightweight smoke tests accompany each release so surprises stay rare. When an issue does appear, support playbooks and runbooks help the team respond quickly and consistently. Metrics watch real user performance and alert us when trends slip, not after users complain. After launch, we pair on the first week of live use to fix any rough edges fast and to hand over the remaining knobs safely. The goal is simple: a durable, fast experience that earns trust from both the audience and the team that runs it, while staying easy to extend tomorrow." : "";

  const projectData = isWorks ? {
    A: {
      label: "A",
      name: "Project A",
      description: "Global launch site built for speed and scale. We set up modular heroes, localized CTA routing, and a component library that marketing can reuse without engineering. Performance budgets, Core Web Vitals tuning, and optimized media keep the site fast on low-end devices. Analytics wiring tracks scroll depth, video intent, and checkout signals so the growth team can act on clean data. We added A/B-ready slots, microcopy variants, and a clear handoff process so future campaigns ship quickly. The outcome: a repeatable launch stack that is durable, fast, and easy for the team to update.",
      tags: ["SEO", "Branding", "Campaigns"]
    },
    B: {
      label: "B",
      name: "Project B",
      description: "Real-time logistics dashboard that turns noisy data into clear decisions. We centralized fleet metrics, SLA health, and route anomalies into a single view with lightweight chart primitives. Alerting hooks connect to incident tooling so operators see issues in seconds, not minutes. Queries and caching were tuned for low latency, and we wrapped everything in a small design kit—tokens, spacing, and layout recipes—so the internal team can add widgets without drift. Operators now get signal over noise, and leadership has a reliable daily picture of operations.",
      tags: ["Dashboards", "Data Viz", "UI Kit"]
    },
    C: {
      label: "C",
      name: "Project C",
      description: "Membership paywall and streaming stack for a live-events client. We mapped the conversion path from teaser to upgrade and built authentication, entitlements, and CDN failovers to keep streams steady. Empty states, onboarding hints, and role-aware prompts guide first-time viewers. Analytics track joins, churn signals, and session quality, feeding dashboards for the success team. Integrations pull member status into email and chat so support can act quickly during broadcasts. The result is a dependable revenue lane that holds up under peak traffic.",
      tags: ["Video", "Paywall", "Integrations"]
    },
    D: {
      label: "D",
      name: "Project D",
      description: "Headless CMS rollout with author tooling so the team ships pages without engineering. We audited content types, consolidated redundancies, and designed a guarded authoring flow with live preview. Blocks cover heroes, pricing, FAQs, testimonials, and CTAs with built-in accessibility checks. Migrations, versioning, and staging workflows keep changes safe. Performance budgets run in CI to prevent slow pages as the library grows. Training, docs, and quickstart patterns leave authors confident and self-sufficient.",
      tags: ["CMS", "Automation", "Docs"]
    },
    E: {
      label: "E",
      name: "Project E",
      description: "Commerce microsite built around clear storytelling and a fast path to checkout. We translated the brand’s positioning into a concise narrative: reasons to believe up top, proof points in the middle, and a simple, trustworthy checkout. Motion cues are quick and purposeful. We trimmed steps, added trust signals, and optimized media delivery to keep the experience light. A/B slots let the marketing team test bundles and offers without code. Visitors move from interest to purchase with minimal friction.",
      tags: ["Ecommerce", "UX Writing", "Performance"]
    },
    F: {
      label: "F",
      name: "Project F",
      description: "Internal tool that unifies support, ticketing, and billing into one fast view. We mapped agent workflows and built tight keyboard navigation so common actions happen without context switching. Inline controls handle credits, status changes, and escalations. Role-based permissions and audit logs keep compliance satisfied. Live metrics show resolution time, backlog pressure, and team load. After launch, handle times dropped, training shortened, and leadership finally had a trustworthy view of daily operations.",
      tags: ["Internal Tools", "APIs", "Ops"]
    },
    G: {
      label: "G",
      name: "Project G",
      description: "Brand refresh captured in a lean design system across web, email, and campaigns. We distilled the identity into tokens for color, type, spacing, and motion, then built components that stay on-brand across surfaces. Storybook docs, usage guidelines, and Figma libraries keep design and engineering in sync. We piloted on key landers, then extended to lifecycle email and paid media. Quality tightened, duplicate work dropped, and review cycles sped up. Teams now ship faster with fewer inconsistencies.",
      tags: ["Design System", "Branding", "Campaigns"]
    },
    H: {
      label: "H",
      name: "Project H",
      description: "Product onboarding flow with guided tours, smart empty states, and tested messaging. We started from activation metrics, found friction, and designed a welcome path that makes next steps obvious. Tours adapt to user roles; empty states teach without feeling like docs. Progressive disclosure hides advanced options until needed. Experiments tuned copy, timing, and incentives. Activation went up, support pings dropped, and new users see why the product matters from day one.",
      tags: ["Onboarding", "UX", "Experimentation"]
    },
    I: {
      label: "I",
      name: "Project I",
      description: "Data-heavy research portal turned into a fast, searchable experience. We reorganized content into clear taxonomies, built faceted search with instant feedback, and added saved views for teams. Performance budgets and lean assets keep results quick, even on spotty connections. We layered in permissions and audit logs to satisfy compliance without slowing contributors. Documentation, naming, and component recipes help the internal team extend the library safely.",
      tags: ["Search", "IA", "Performance"]
    }
  } : {};

  function updateScrollHints() {
    const inWorks = body.classList.contains("page-works");
    const inSlides = inWorks || body.classList.contains("page-about");
    if (!inSlides || !mainEl || !scrollHints) {
      scrollHints?.classList.remove("show-left", "show-right");
      return;
    }
    const maxScroll = mainEl.scrollWidth - mainEl.clientWidth;
    const sc = mainEl.scrollLeft;
    const leftThreshold = inWorks ? mainEl.clientWidth * 0.5 : 12;
    const pad = 12;
    const slideIndex = inWorks ? getWorksSlideIndex() : 0;
    const canScrollLeft = sc > leftThreshold;

    let canScrollRight = sc < maxScroll - pad;
    if (inWorks) {
      if (slideIndex === 0) {
        canScrollRight = true;
      } else if (slideIndex === 1) {
        canScrollRight = false;
      }
    }

    if (inWorks && !worksLockedToGrid && sc <= pad) {
      worksLockedToGrid = true;
    }
    scrollHints.classList.toggle("show-left", canScrollLeft);
    scrollHints.classList.toggle("show-right", canScrollRight);
  }

  function scrollHero(direction) {
    if (!mainEl) return;
    const inSlides = body.classList.contains("page-about") || body.classList.contains("page-works");
    if (!inSlides) return;
    if (isWorks && direction === "right" && worksLockedToGrid && getWorksSlideIndex() > 0) return;
    const delta = mainEl.clientWidth;
    const next = direction === "left" ? mainEl.scrollLeft - delta : mainEl.scrollLeft + delta;
    mainEl.scrollTo({ left: next, behavior: "smooth" });
  }

  mainEl?.addEventListener("scroll", updateScrollHints, { passive: true });
  window.addEventListener("resize", updateScrollHints);
  chevronLeft?.addEventListener("click", () => scrollHero("left"));
  chevronRight?.addEventListener("click", () => scrollHero("right"));

  updateScrollHints();

  menuToggle?.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mobileMenu?.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });

  function openContactModal() {
    if (!contactModal) return;
    contactModal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
  }

  contactOpeners.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openContactModal();
    });
  });

  contactClosers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      closeContactModal();
    });
  });

  contactModal?.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      closeContactModal();
    }
  });

  function renderProjectDetail(key) {
    if (!isWorks) return;
    const project = projectData[key];
    if (!project) return;
    if (workDetailCircle) {
      workDetailCircle.textContent = project.label;
    }
    if (workDetailTitle) {
      workDetailTitle.textContent = project.name;
    }
    if (workDetailDescription) {
      workDetailDescription.textContent = project.description;
    }
    if (workDetailTags) {
      workDetailTags.innerHTML = "";
      project.tags.forEach(tag => {
        const pill = document.createElement("span");
        pill.className = "detail-pill";
        pill.textContent = tag;
        workDetailTags.appendChild(pill);
      });
    }
  }

  function goToProject(key) {
    renderProjectDetail(key);
    if (mainEl && workDetailSlide) {
      worksLockedToGrid = false;
      const targetLeft = workDetailSlide.getBoundingClientRect().left - mainEl.getBoundingClientRect().left + mainEl.scrollLeft;
      mainEl.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  }

  if (isWorks) {
    const blockHorizontalScroll = (e) => {
      if (!worksLockedToGrid) return;
      const horizontalIntent = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const slideIndex = getWorksSlideIndex();
      if (horizontalIntent && e.deltaX > 0 && slideIndex >= 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    mainEl?.addEventListener("wheel", blockHorizontalScroll, { passive: false });

    workCircles.forEach(circle => {
      const key = circle.dataset.project;
      circle.addEventListener("click", () => goToProject(key));
      circle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToProject(key);
        }
      });
    });

    renderProjectDetail("A");
  }

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contactSubmit) return;

    const payload = contactInputs.reduce((acc, input) => {
      acc[input.name] = input.value.trim();
      return acc;
    }, {});

    const mailto = new URL("mailto:mili@mililand.com");
    const lines = [
      `Name: ${payload.name || ""}`,
      `Email: ${payload.email || ""}`,
      `Subject: ${payload.subject || ""}`,
    ].join("\n");
    mailto.searchParams.set("subject", payload.subject || "Hello from the site");
    mailto.searchParams.set("body", lines);

    contactSubmit.textContent = "Message sent";
    contactSubmit.style.background = "var(--offwhite)";
    contactSubmit.style.color = "#ff0055";
    contactSubmit.style.borderColor = "transparent";
    contactSubmit.disabled = true;

    window.location.href = mailto.toString();

    setTimeout(() => {
      closeContactModal();
      contactInputs.forEach(input => input.value = "");
      contactSubmit.textContent = "Send";
      contactSubmit.style.background = "#ff0055";
      contactSubmit.style.color = "#fff";
      contactSubmit.style.borderColor = "#ff0055";
      contactSubmit.disabled = false;
    }, 1500);
  });
})();
