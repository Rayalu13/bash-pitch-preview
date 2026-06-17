// Bash Manager · shared page shell
// Injects masthead, venue row, chat dock.
// Theme is controlled from the Brief's Profile & Settings panel —
// we just read/apply the same storage key here so it propagates everywhere.

(function () {
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  const MANAGER = "Rohan · Manager";

  // ---- Theme (shared key with Brief: 'bash-theme-mode' = light|dark|system) ----
  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function getStoredMode() {
    try { return localStorage.getItem("bash-theme-mode") || "system"; }
    catch (_) { return "system"; }
  }
  function applyMode(mode) {
    const wantDark = mode === "system" ? systemPrefersDark() : mode === "dark";
    document.documentElement.classList.toggle("theme-dark", wantDark);
  }
  function watchSystemTheme() {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) {
      mq.addEventListener("change", () => {
        if (getStoredMode() === "system") applyMode("system");
      });
    }
    // Cross-tab sync: react when the Brief's settings panel writes the key
    window.addEventListener("storage", (e) => {
      if (e.key === "bash-theme-mode") applyMode(getStoredMode());
    });
  }

  // Masthead is intentionally minimal across sub-pages — only "← Main menu"
  // sits in the sticky header. The hub (index.html) renders its own bespoke
  // topbar; everywhere else, this single back-link is the entire header.
  function masthead() {
    return el(`
      <header class="masthead">
        <a class="back" href="../index.html">Main menu</a>
      </header>
    `);
  }

  function venueRow() { return null; }

  function chatDock(badge) {
    return el(`
      <div class="chat-dock">
        <div class="inner">
          <a class="chat-input-wrap" href="../index.html#chat">
            <span class="prompt-mark">›</span>
            <span class="placeholder">Ask Bash</span>
            <span class="hint">⌘K</span>
          </a>
          <a class="live-launcher" href="../index.html#live" aria-label="Open Live hospitality">
            <span class="live-pulse"></span>
            <span class="live-label">Live</span>
            ${badge ? `<span class="live-badge">${badge}</span>` : ""}
          </a>
        </div>
      </div>
    `);
  }

  // ---- Needs you · swipe-to-clear (matches Brief pattern) ----
  const SWIPE_THRESHOLD = 40;
  const SWIPE_OPEN = 96;

  function wireNeedsYou() {
    document.querySelectorAll(".needs").forEach((needs) => {
      const rows = Array.from(needs.querySelectorAll(".act-row"));
      if (rows.length === 0) return;

      // Inject Clear all into meta
      const meta = needs.querySelector(".sec-head .meta");
      if (meta) {
        const clearAll = el(`<button class="clear-all" type="button">Clear all</button>`);
        meta.appendChild(clearAll);
        clearAll.addEventListener("click", () => {
          needs.querySelectorAll(".act-row:not(.removing)").forEach((row, i) => {
            setTimeout(() => removeRow(needs, row), i * 60);
          });
        });
      }

      // Restructure each act-row → wrap kids in .act-item + append .act-clear
      rows.forEach((row) => {
        const prompt = row.getAttribute("data-prompt") || "";
        // Build inner item with the existing children
        const item = document.createElement("div");
        item.className = "act-item";
        if (prompt) item.setAttribute("data-prompt", prompt);
        // Move all current children into the new item
        while (row.firstChild) item.appendChild(row.firstChild);
        row.appendChild(item);
        // Append clear button
        const clearBtn = el(`<button class="act-clear" type="button" aria-label="Clear">Clear</button>`);
        row.appendChild(clearBtn);
        // Strip data-prompt from outer row so generic data-prompt handler doesn't double-fire
        row.removeAttribute("data-prompt");

        // ---- swipe ----
        let startX = 0, startY = 0, dx = 0, dragging = false, swiping = false;

        const onDown = (e) => {
          const pt = e.touches ? e.touches[0] : e;
          startX = pt.clientX; startY = pt.clientY; dx = 0;
          dragging = true; swiping = false;
          if (e.pointerId != null && item.setPointerCapture) {
            try { item.setPointerCapture(e.pointerId); } catch (_) {}
          }
        };
        const onMove = (e) => {
          if (!dragging) return;
          const pt = e.touches ? e.touches[0] : e;
          const ndx = pt.clientX - startX;
          const ndy = pt.clientY - startY;
          if (!swiping && Math.abs(ndx) > 6 && Math.abs(ndx) > Math.abs(ndy)) {
            swiping = true;
            row.classList.add("swiping");
            closeAllSwiped(needs, row);
          }
          if (swiping) {
            if (e.cancelable) e.preventDefault();
            const startOffset = row.classList.contains("swiped") ? -SWIPE_OPEN : 0;
            dx = Math.max(-SWIPE_OPEN - 16, Math.min(16, startOffset + ndx));
            item.style.transform = "translateX(" + dx + "px)";
          }
        };
        const onUp = () => {
          if (!dragging) return;
          dragging = false;
          if (swiping) {
            row.classList.remove("swiping");
            item.style.transform = "";
            const wasOpen = row.classList.contains("swiped");
            if (!wasOpen && dx < -SWIPE_THRESHOLD) row.classList.add("swiped");
            else if (wasOpen && dx > -SWIPE_OPEN + SWIPE_THRESHOLD) row.classList.remove("swiped");
            item.addEventListener("click", killClick, true);
            setTimeout(() => item.removeEventListener("click", killClick, true), 0);
          }
          swiping = false;
        };
        function killClick(e) { e.stopPropagation(); e.preventDefault(); }

        item.addEventListener("pointerdown", onDown);
        item.addEventListener("pointermove", onMove);
        item.addEventListener("pointerup", onUp);
        item.addEventListener("pointercancel", onUp);

        // Tap → open chat with prefill (unless swiped open — first tap closes)
        item.addEventListener("click", (e) => {
          if (row.classList.contains("swiped")) {
            row.classList.remove("swiped");
            return;
          }
          const p = item.getAttribute("data-prompt");
          if (p) {
            sessionStorage.setItem("bash_prefill", p);
            window.location.href = "../index.html#chat";
          }
        });

        // Clear button
        clearBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          removeRow(needs, row);
        });
      });
    });

    // Tap outside any swiped row closes it
    document.addEventListener("click", (e) => {
      document.querySelectorAll(".needs").forEach((needs) => {
        if (!e.target.closest(".needs .act-row")) closeAllSwiped(needs, null);
      });
    });
  }

  function closeAllSwiped(needs, except) {
    needs.querySelectorAll(".act-row.swiped").forEach((r) => {
      if (r !== except) r.classList.remove("swiped");
    });
  }

  function removeRow(needs, row) {
    if (!row || row.classList.contains("removing")) return;
    row.classList.remove("swiped");
    const h = row.offsetHeight;
    row.style.maxHeight = h + "px";
    void row.offsetWidth; // reflow so transition has a starting height
    row.classList.add("removing");
    row.addEventListener("transitionend", () => {
      row.remove();
      const live = needs.querySelectorAll(".act-row:not(.removing)");
      const meta = needs.querySelector(".sec-head .meta");
      if (meta) {
        const txtNode = meta.childNodes[0];
        const ct = live.length;
        if (txtNode && txtNode.nodeType === 3) {
          txtNode.nodeValue = ct + (ct === 1 ? " item" : " items");
        }
      }
      if (live.length === 0) needs.classList.add("is-empty");
    }, { once: true });
  }

  function reveal() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("shown");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
  }

  // Apply theme as early as possible to avoid a flash
  applyMode(getStoredMode());
  watchSystemTheme();

  window.BashShell = {
    wireNeedsYou: wireNeedsYou,
    reveal: reveal,
    mount(opts) {
      const o = Object.assign(
        { venue: "Bandra Social", open: true, liveBadge: 3 },
        opts || {}
      );
      const device = document.querySelector(".device");
      if (!device) return;

      const head = device.querySelector("[data-slot=head]");
      if (head) head.replaceWith(masthead());
      else device.prepend(masthead());

      // venue-row is now consolidated into the masthead — drop the legacy slot.
      const ven = device.querySelector("[data-slot=venue]");
      if (ven) ven.remove();

      device.appendChild(el(`<div class="pad-bottom"></div>`));
      document.body.appendChild(chatDock(o.liveBadge));

      // Wire Needs you swipe FIRST — it restructures rows and adds its own clicks
      wireNeedsYou();

      // Generic data-prompt handler — skip anything inside .needs (handled above)
      document.querySelectorAll("[data-prompt]").forEach((n) => {
        if (n.closest(".needs")) return;
        n.addEventListener("click", (e) => {
          if (e.target.closest(".act-clear") || e.target.closest(".clear-all")) return;
          sessionStorage.setItem("bash_prefill", n.dataset.prompt);
          window.location.href = "../index.html#chat";
        });
      });

      // Do-cards — primary button marks the card as done with a confirmation
      document.querySelectorAll(".do-card .do-btn.primary").forEach((btn) => {
        btn.addEventListener("click", () => {
          const card = btn.closest(".do-card");
          if (!card) return;
          card.classList.add("done");
        });
      });

      reveal();
    },
  };
})();
