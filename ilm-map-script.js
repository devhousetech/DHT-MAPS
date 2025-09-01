  <script>
    (function() {
      const svg = document.querySelector("svg");
      if (!svg) return;

      const groups = svg.querySelectorAll("g");

      groups.forEach(g => {
        const path = g.querySelector('path[id="ILM-map"]');
        if (!path) return;

        let placeholder = null;

        function bringToFront() {
          if (!placeholder) {
            placeholder = document.createComment("placeholder");
            g.parentNode.insertBefore(placeholder, g); // mark original spot
            svg.appendChild(g); // reparent to end => on top
          }

          // Force a reflow before adding the class so the transition runs
          void g.getBoundingClientRect();
          g.classList.add("hover-active");
        }

        function restore() {
          g.classList.remove("hover-active");
          if (placeholder) {
            placeholder.parentNode.insertBefore(g, placeholder);
            placeholder.remove();
            placeholder = null;
          }
        }

        // Mouse + keyboard
        g.addEventListener("mouseenter", bringToFront);
        g.addEventListener("mouseleave", restore);
        g.addEventListener("focusin", bringToFront);
        g.addEventListener("focusout", restore);

        // Make group focusable for keyboard users
        if (!g.hasAttribute("tabindex")) g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");
      });
    })();
</script>
