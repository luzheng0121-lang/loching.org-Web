/* ============================================================
   MAIN

   三件事：
   1. 点击左侧目录 → 切换右侧 .panel 显示/隐藏（单页应用式，不刷新页面）
   2. 同步更新右下角 folio 页码
   3. 移动端：目录列表默认收起，点 "index" 按钮展开/收起
============================================================ */

(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.index__link[data-target]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var folioEl = document.getElementById('folio');
  var indexEl = document.getElementById('index');
  var toggleBtn = document.getElementById('indexToggle');

  function showPanel(id) {
    panels.forEach(function (p) {
      p.classList.toggle('is-active', p.id === id);
    });
    links.forEach(function (l) {
      l.classList.toggle('is-active', l.getAttribute('data-target') === id);
    });
    var active = document.getElementById(id);
    if (active && folioEl) {
      folioEl.textContent = active.getAttribute('data-folio') || '';
    }
    window.scrollTo(0, 0);
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = link.getAttribute('data-target');
      showPanel(target);
      history.replaceState(null, '', '#' + target);
      // 移动端选完作品后自动收起目录列表
      if (indexEl) indexEl.classList.remove('is-expanded');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  if (toggleBtn && indexEl) {
    toggleBtn.addEventListener('click', function () {
      var expanded = indexEl.classList.toggle('is-expanded');
      toggleBtn.setAttribute('aria-expanded', String(expanded));
    });
  }

  // 支持直接通过 URL hash 打开某个作品，比如分享链接 #w03
  var initial = window.location.hash.replace('#', '');
  if (initial && document.getElementById(initial)) {
    showPanel(initial);
  }
})();
