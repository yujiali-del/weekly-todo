(function () {
  window.toast = function (m) {
    var e = document.getElementById('toast');
    if (!e) return;
    e.textContent = m;
    e.classList.add('show');
    clearTimeout(window.__t);
    window.__t = setTimeout(function () { e.classList.remove('show'); }, 2600);
  };
  window.demo = function (e, m) {
    if (e) e.preventDefault();
    toast(m || 'This links to a real page once connected to a store');
    return false;
  };

  // grip-sock canvas illustration. o = {base, cuff, dot} or {base, cuff, dots:[c1,c2,c3]}
  window.drawSock = function (canvas, o) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth || 100, h = canvas.clientHeight || 100;
    canvas.width = w * dpr; canvas.height = h * dpr;
    var x = canvas.getContext('2d'); x.scale(dpr, dpr); x.clearRect(0, 0, w, h);
    x.save(); x.translate(w * .5, h * .52); var s = Math.min(w, h) / 100; x.scale(s, s);
    x.beginPath();
    x.moveTo(-16, -42); x.lineTo(12, -42);
    x.quadraticCurveTo(16, -8, 18, 8);
    x.quadraticCurveTo(20, 26, 36, 30);
    x.quadraticCurveTo(42, 32, 41, 38);
    x.quadraticCurveTo(38, 43, 28, 42);
    x.lineTo(-8, 40);
    x.quadraticCurveTo(-20, 38, -19, 16);
    x.lineTo(-16, -42); x.closePath();
    x.fillStyle = o.base; x.fill();
    x.strokeStyle = 'rgba(51,43,43,.08)'; x.lineWidth = 1; x.stroke();
    x.fillStyle = o.cuff; x.beginPath();
    x.moveTo(-16, -42); x.lineTo(12, -42); x.lineTo(12.6, -30); x.lineTo(-15.4, -30); x.closePath(); x.fill();
    x.strokeStyle = 'rgba(255,255,255,.5)'; x.lineWidth = 1.1;
    for (var i = -14; i <= 10; i += 4) { x.beginPath(); x.moveTo(i, -41); x.lineTo(i, -31); x.stroke(); }
    var pts = [[-6, 30], [3, 32], [12, 30], [20, 25], [-2, 23], [8, 25], [16, 17], [25, 21], [1, 14], [11, 16], [22, 11]];
    var dots = o.dots || [o.dot];
    pts.forEach(function (p, i) {
      x.fillStyle = dots[i % dots.length];
      x.beginPath(); x.arc(p[0], p[1], 1.8, 0, 7); x.fill();
    });
    x.restore();
  };

  window.CUTE_COLORS = [
    { name: 'Bubblegum Pink', base: '#F8D9E3', cuff: '#E8B7C8', dot: '#332B2B' },
    { name: 'Butter Pop', base: '#FCEFC8', cuff: '#F5D98B', dot: '#332B2B' },
    { name: 'Peach Fizz', base: '#FBE3D2', cuff: '#F3C7A7', dot: '#332B2B' },
    { name: 'Cloud White', base: '#FFFFFF', cuff: '#FCFCFA', dot: '#E8B7C8' },
    { name: 'Soft Ink', base: '#F1EDE9', cuff: '#332B2B', dot: '#F5D98B' },
    { name: 'Confetti Dot', base: '#FFFFFF', cuff: '#E8B7C8', dots: ['#E8B7C8', '#F5D98B', '#F3C7A7'] }
  ];

  function initReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: .1 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
