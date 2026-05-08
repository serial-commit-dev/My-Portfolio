// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form handler -> SheetDB
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const SHEETDB_URL = 'https://sheetdb.io/api/v1/cuuxgixy343ii';

function setStatus(msg, type) {
    status.textContent = msg;
    status.className = 'form-status' + (type ? ' ' + type : '');
}

function isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const feedback = form.feedback.value.trim();

    if (!name || name.length > 100) return setStatus('Please enter a valid name.', 'error');
    if (!isValidEmail(email)) return setStatus('Please enter a valid email.', 'error');
    if (!message) return setStatus('Message cannot be empty.', 'error');

    submitBtn.disabled = true;
    setStatus('Sending…');

    try {
        const res = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                data: [{
                    name, email, message, feedback,
                    timestamp: new Date().toISOString()
                }]
            })
        });

        if (!res.ok) throw new Error('Request failed: ' + res.status);

        setStatus('Thanks! Your message has been sent.', 'success');
        form.reset();

        if (typeof gtag === 'function') {
            gtag('event', 'form_lead', {
                'event_category': 'form_submission',
                'event_label': 'contact_me_form',
            });
        }
    } catch (err) {
        console.error(err);
        setStatus('Something went wrong. Please try again later.', 'error');
    } finally {
        submitBtn.disabled = false;
    }
});
