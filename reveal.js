/* ============================================================
   REVEAL

   Pairs with css/motion.css. A spread fades/rises in once, the
   first time it crosses ~15% into view, then is left alone — this
   is meant to read like a page settling, not a repeating animation
   the visitor can trigger by scrolling back and forth.
============================================================ */

(function () {
  var spreads = Array.prototype.slice.call(document.querySelectorAll('.spread'));
  if (!spreads.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  spreads.forEach(function (s) { observer.observe(s); });
})();
