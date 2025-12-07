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

  function updateScrollHints() {
    const inSlides = body.classList.contains("page-about") || body.classList.contains("page-works");
    if (!inSlides || !mainEl || !scrollHints) {
      scrollHints?.classList.remove("show-left", "show-right");
      return;
    }
    const maxScroll = mainEl.scrollWidth - mainEl.clientWidth;
    const sc = mainEl.scrollLeft;
    const pad = 12;
    const canScrollLeft = sc > pad;
    const canScrollRight = sc < maxScroll - pad;
    scrollHints.classList.toggle("show-left", canScrollLeft);
    scrollHints.classList.toggle("show-right", canScrollRight);
  }

  function scrollHero(direction) {
    if (!mainEl) return;
    const inSlides = body.classList.contains("page-about") || body.classList.contains("page-works");
    if (!inSlides) return;
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
})();
