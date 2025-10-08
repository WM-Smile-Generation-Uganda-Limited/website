import { initFirebase } from '../lib/firebase';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

function bindForm() {
  const form = document.querySelector<HTMLFormElement>('#partnershipForm');
  const statusEl = document.querySelector<HTMLElement>('#partnerFormStatus');
  const submitBtn = form?.querySelector<HTMLButtonElement>('button[type="submit"]') ?? undefined;

  if (!form || !statusEl || !submitBtn) return;
  if (form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

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
        organization: (form!.elements.namedItem('organization') as HTMLInputElement)?.value.trim() || null,
        email: (form!.elements.namedItem('email') as HTMLInputElement)?.value.trim(),
        message: (form!.elements.namedItem('message') as HTMLTextAreaElement)?.value.trim(),
        createdAt: serverTimestamp(),
        source: 'partnership-page',
      };

      await addDoc(collection(db, 'partnershipInquiries'), payload);

      form!.reset();
      statusEl!.textContent = 'Thanks! Your inquiry has been sent. We will get back to you shortly.';
      statusEl!.classList.add('text-green-700');
    } catch (err) {
      console.error('Failed to submit partnership form:', err);
      statusEl!.textContent = 'Sorry, something went wrong. Please try again later.';
      statusEl!.classList.add('text-red-600');
    } finally {
      submitBtn!.disabled = false;
      submitBtn!.textContent = 'Submit Inquiry';
    }
  }

  form.addEventListener('submit', handleSubmit);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindForm, { once: true });
} else {
  bindForm();
}
