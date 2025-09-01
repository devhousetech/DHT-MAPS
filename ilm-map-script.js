<script>
  // Make the interactive regions keyboard & touch friendly.
  (function () {
    // Select both cases: individual path ids and group ids
    const pathRegions = document.querySelectorAll('svg path[id*="ILM-map"]');
    const groupRegions = document.querySelectorAll('svg g[id*="ILM-map"]');

    function enhance(el) {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click?.();
          el.classList.add('is-pressed');
          setTimeout(() => el.classList.remove('is-pressed'), 120);
        }
      });

      el.addEventListener('pointerenter', () => el.classList.add('is-hovered'));
      el.addEventListener('pointerleave', () => {
        el.classList.remove('is-hovered');
        el.classList.remove('is-pressed');
      });

      el.addEventListener('touchstart', () => el.classList.add('is-pressed'), { passive: true });
      el.addEventListener('touchend',   () => el.classList.remove('is-pressed'));
      el.addEventListener('touchcancel',() => el.classList.remove('is-pressed'));
    }

    pathRegions.forEach(enhance);
    groupRegions.forEach(enhance);
  })();
</script>
