import { initFirebase } from '../lib/firebase';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

function bindForm() {
  const form = document.querySelector<HTMLFormElement>('#contactForm');
  const statusEl = document.querySelector<HTMLElement>('#formStatus');
  const submitBtn = form?.querySelector<HTMLButtonElement>('button[type="submit"]') ?? undefined;

  if (!form || !submitBtn || !statusEl) return;
  // Avoid duplicate bindings during HMR
  if (form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    // Basic front-end validation
    if (!form!.checkValidity()) {
      form!.reportValidity();
      return;
    }

    statusEl!.textContent = '';
    statusEl!.classList.remove('text-red-600', 'text-green-700');
    submitBtn!.disabled = true;
    submitBtn!.textContent = 'Sending...';

    try {
      await initFirebase();
  const db = getFirestore();

      const payload = {
        name: (form!.elements.namedItem('name') as HTMLInputElement)?.value.trim(),
        email: (form!.elements.namedItem('email') as HTMLInputElement)?.value.trim(),
        subject: (form!.elements.namedItem('subject') as HTMLInputElement)?.value.trim(),
        message: (form!.elements.namedItem('message') as HTMLTextAreaElement)?.value.trim(),
        createdAt: serverTimestamp(),
        source: 'contact-page',
      };

      await addDoc(collection(db, 'contactMessages'), payload);

      form!.reset();
      statusEl!.textContent = 'Thanks! Your message has been sent.';
      statusEl!.classList.add('text-green-700');
    } catch (err) {
      console.error('Failed to submit contact form:', err);
      statusEl!.textContent = 'Sorry, something went wrong. Please try again later.';
      statusEl!.classList.add('text-red-600');
    } finally {
      submitBtn!.disabled = false;
      submitBtn!.textContent = 'Send Message';
    }
  }

  form.addEventListener('submit', handleSubmit);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindForm, { once: true });
} else {
  bindForm();
}
