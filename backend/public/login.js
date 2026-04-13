// =========================
// CONTACT DROPDOWN
// =========================
function toggleContact() {
  const dd = document.getElementById('contactDropdown');
  const btn = document.getElementById('contactBtn');
  const arrow = document.getElementById('contactArrow');

  if (!dd || !btn || !arrow) return;

  const isOpen = dd.classList.contains('open');

  dd.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-right')) {
    document.getElementById('contactDropdown')?.classList.remove('open');
    document.getElementById('contactBtn')?.classList.remove('open');

    const arrow = document.getElementById('contactArrow');
    if (arrow) arrow.style.transform = 'rotate(0deg)';
  }
});


// =========================
// SAFE MARKS LISTENERS
// =========================
document.addEventListener("DOMContentLoaded", () => {

  const scoredEl = document.getElementById('marks-scored');
  const maxEl = document.getElementById('marks-max');

  if (scoredEl && maxEl) {
    scoredEl.addEventListener('input', calcMarks);
    maxEl.addEventListener('input', calcMarks);
  }

  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      window.location.href = "exam.html";
    });
  }
});


// =========================
// MARKS CALCULATION
// =========================
function calcMarks() {
  const sEl = document.getElementById('marks-scored');
  const mEl = document.getElementById('marks-max');
  const d = document.getElementById('marks-display');

  if (!sEl || !mEl || !d) return;

  const s = parseFloat(sEl.value);
  const m = parseFloat(mEl.value) || 600;

  if (s && m && s <= m) {
    const pct = (s / m * 100).toFixed(1);
    d.textContent = '10th Percentage: ' + pct + '%';
    d.style.color = pct >= 60 ? '#2e7d32' : '#c62828';
  } 
  else if (s > m) {
    d.textContent = 'Scored marks cannot exceed maximum marks';
    d.style.color = '#c62828';
  } 
  else {
    d.textContent = 'Enter your 10th marks above';
    d.style.color = '#8a9ab8';
  }
}


// =========================
// MESSAGE FUNCTION
// =========================
function showMsg(txt, type) {
  const m = document.getElementById('msg');
  if (!m) return;

  m.textContent = txt;
  m.className = 'msg ' + type;
}


// =========================
// REGISTRATION
// =========================
function handleRegister() {

  const name = document.getElementById('fullname')?.value.trim();
  const mobile = document.getElementById('mobile')?.value.trim();
  const college = document.getElementById('collegename')?.value.trim();
  const scored = document.getElementById('marks-scored')?.value.trim();
  const max = document.getElementById('marks-max')?.value.trim();

  const selectedBranches = Array.from(
    document.querySelectorAll('.branches-box input:checked')
  ).map(cb => cb.value);

  // VALIDATIONS
  if (!name) return showMsg('Please enter your full name.', 'error');

  if (!/^\d{10}$/.test(mobile)) 
    return showMsg('Please enter a valid 10-digit mobile number.', 'error');

  if (!college) 
    return showMsg('Please enter your college name.', 'error');

  if (!scored || !max) 
    return showMsg('Please enter your 10th marks.', 'error');

  if (parseFloat(scored) > parseFloat(max)) 
    return showMsg('Scored marks cannot exceed maximum marks.', 'error');

  if (selectedBranches.length === 0) 
    return showMsg('Please select at least one preferred B.Tech branch.', 'error');

  // SUCCESS
  const pct = (parseFloat(scored) / parseFloat(max) * 100).toFixed(1);

  showMsg('Registration successful! Welcome, ' + name + '!', 'success');

  // optional save
  localStorage.setItem("studentName", name);
  localStorage.setItem("percentage", pct);

  // redirect
  setTimeout(() => {
    window.location.href = "instructions.html";
  }, 1000);
}