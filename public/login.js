function toggleContact() {
  const dd = document.getElementById('contactDropdown');
  const btn = document.getElementById('contactBtn');
  const arrow = document.getElementById('contactArrow');
  const isOpen = dd.classList.contains('open');
  dd.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}
document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-right')) {
    document.getElementById('contactDropdown').classList.remove('open');
    document.getElementById('contactBtn').classList.remove('open');
    document.getElementById('contactArrow').style.transform = 'rotate(0deg)';
  }
});

document.getElementById('marks-scored').addEventListener('input', calcMarks);
document.getElementById('marks-max').addEventListener('input', calcMarks);

function calcMarks() {
  const s = parseFloat(document.getElementById('marks-scored').value);
  const m = parseFloat(document.getElementById('marks-max').value) || 600;
  const d = document.getElementById('marks-display');
  if (s && m && s <= m) {
    const pct = (s / m * 100).toFixed(1);
    d.textContent = '10th Percentage: ' + pct + '%';
    d.style.color = pct >= 60 ? '#2e7d32' : '#c62828';
  } else if (s > m) {
    d.textContent = 'Scored marks cannot exceed maximum marks';
    d.style.color = '#c62828';
  } else {
    d.textContent = 'Enter your 10th marks above';
    d.style.color = '#8a9ab8';
  }
}

function showMsg(txt, type) {
  const m = document.getElementById('msg');
  m.textContent = txt;
  m.className = 'msg ' + type;
}

function handleRegister() {
  const name = document.getElementById('fullname').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const college = document.getElementById('collegename').value.trim();
  const scored = document.getElementById('marks-scored').value.trim();
  const max = document.getElementById('marks-max').value.trim();
  const selectedBranches = Array.from(document.querySelectorAll('.branches-box input:checked'))
  .map(cb => cb.value);

  if (!name) { showMsg('Please enter your full name.', 'error'); return; }
  if (!/^\d{10}$/.test(mobile)) { showMsg('Please enter a valid 10-digit mobile number.', 'error'); return; }
  if (!college) { showMsg('Please enter your college name.', 'error'); return; }
  if (!scored || !max) { showMsg('Please enter your 10th marks.', 'error'); return; }
  if (parseFloat(scored) > parseFloat(max)) { showMsg('Scored marks cannot exceed maximum marks.', 'error'); return; }
if (selectedBranches.length === 0) {
  showMsg('Please select at least one preferred B.Tech branch.', 'error');
  return;
}
  const pct = (parseFloat(scored) / parseFloat(max) * 100).toFixed(1);
  showMsg('Registration successful! Welcome, ' + name + '!', 'success');



// redirect after short delay
window.location.href = "instructions.html";
}

// 👉 Redirect to instructions page




document.getElementById('start-btn').addEventListener('click', () => {
            window.location.href = "test.html";
        });