<script>
(function () {
  // Find the root SVG that contains your map — if you have multiple SVGs,
  // narrow this selector (e.g. give your map <svg id="oahu-map"> and use that).
  const svg = document.querySelector('svg');
  if (!svg) return;

  // Create (or reuse) a topmost overlay layer inside the SVG.
  // This guarantees hover visuals render above all other content/folders.
  let overlay = svg.querySelector('g#ilm-hover-overlay');
  if (!overlay) {
    overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    overlay.setAttribute('id', 'ilm-hover-overlay');
    overlay.setAttribute('pointer-events', 'none');
    svg.appendChild(overlay); // last child = highest in stacking order
  }

  // Attach behavior to every path whose id="ILM-map" (your sample uses same id on many)
  const targets = svg.querySelectorAll('path[id="ILM-map"]');

  targets.forEach((el) => {
    // Keyboard focusability (optional but nice)
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    el.style.cursor = el.style.cursor || 'pointer';

    let clone = null;

    const showOverlay = () => {
      // If already showing for this element, skip
      if (clone && overlay.contains(clone)) return;

      // Clone the hovered path into the overlay
      clone = el.cloneNode(true);
      clone.removeAttribute('id');               // avoid duplicate IDs
      clone.classList.add('ilm-hover-clone');    // style + transform
      // Keep the same fill as the original at hover-time
      const s = getComputedStyle(el);
      clone.setAttribute('fill', s.fill);

      overlay.appendChild(clone);
    };

    const hideOverlay = () => {
      if (clone && overlay.contains(clone)) {
        overlay.removeChild(clone);
      }
      clone = null;
    };

    // Mouse / pointer
    el.addEventListener('pointerenter', showOverlay);
    el.addEventListener('pointerleave', hideOverlay);

    // Touch: brief press feedback (optional)
    el.addEventListener('touchstart', showOverlay, { passive: true });
    el.addEventListener('touchend', hideOverlay);
    el.addEventListener('touchcancel', hideOverlay);

    // Keyboard hover-ish: show on focus, hide on blur
    el.addEventListener('focus', showOverlay);
    el.addEventListener('blur', hideOverlay);

    // If your app programmatically changes fill on hover, mirror that:
    // Observe attribute/style changes and sync the clone’s fill.
    const obs = new MutationObserver(() => {
      if (clone) {
        const s = getComputedStyle(el);
        clone.setAttribute('fill', s.fill);
      }
    });
    obs.observe(el, { attributes: true, attributeFilter: ['style', 'class', 'fill'] });
  });
})();
</script>
