"use client";

export function ContactForm() {
  return (
    <form
      className="contact-page-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <label>
        Your name
        <input type="text" name="name" required />
      </label>
      <label>
        Your email
        <input type="email" name="email" required />
      </label>
      <label>
        Subject
        <input type="text" name="subject" required />
      </label>
      <label>
        Your message (optional)
        <textarea name="message" rows={5} />
      </label>
      <button type="submit" className="btn btn-primary btn-submit">
        Submit
      </button>
    </form>
  );
}
