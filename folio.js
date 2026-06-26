/* ============================================================
   FOLIO

   Updates the running head (section name + folio number) as the
   reader moves through spreads — exactly the information a printed
   running header carries, kept current via IntersectionObserver
   rather than scroll math, so it stays cheap and accurate.
============================================================ */

(function () {
  var spreads = Array.prototype.slice.call(document.querySelectorAll('.spread'));
  var sectionEl = document.getElementById('runningHeadSection');
  var folioEl = document.getElementById('runningHeadFolio');

  if (!spreads.length || !sectionEl || !folioEl) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        var name = entry.target.getAttribute('data-section-name');
        var folio = entry.target.getAttribute('data-folio');
        if (name) sectionEl.textContent = name;
        if (folio) folioEl.textContent = folio;
      }
    });
  }, { threshold: [0.5] });

  spreads.forEach(function (s) { observer.observe(s); });
})();
