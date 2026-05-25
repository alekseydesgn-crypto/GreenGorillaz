const phone = document.getElementById('phone');

function maskRu(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);
  const rest = digits.slice(1);
  let out = '+7';
  if (rest.length > 0) out += ' (' + rest.slice(0, 3);
  if (rest.length >= 3) out += ') ' + rest.slice(3, 6);
  if (rest.length >= 6) out += '-' + rest.slice(6, 8);
  if (rest.length >= 8) out += '-' + rest.slice(8, 10);
  return out;
}

phone.addEventListener('input', (e) => {
  e.target.value = maskRu(e.target.value);
});

phone.addEventListener('focus', (e) => {
  if (!e.target.value) e.target.value = '+7 (';
});

const form = document.getElementById('leadForm');
const formOk = document.getElementById('formOk');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = [form.name, form.phone, form.club];
  fields.forEach((el) => el.parentElement.classList.remove('invalid'));

  const name = form.name.value.trim();
  const phoneDigits = form.phone.value.replace(/\D/g, '');
  const club = form.club.value;

  let valid = true;
  if (!name) { form.name.parentElement.classList.add('invalid'); valid = false; }
  if (phoneDigits.length < 11) { form.phone.parentElement.classList.add('invalid'); valid = false; }
  if (!club) { form.club.parentElement.classList.add('invalid'); valid = false; }

  if (!valid) return;

  formOk.classList.add('show');
  form.reset();
  setTimeout(() => formOk.classList.remove('show'), 5000);
});
