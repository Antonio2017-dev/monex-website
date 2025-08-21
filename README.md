# Monex Interactive Website

## Registration Form

This includes:

### Field-Level Validations (using Yup + React Hook Form)

* **First Name**: Only letters, no spaces, numbers, or symbols.
* **Middle Name** (optional): Only letters, no spaces, numbers, or symbols.
* **Last Name**: Only letters and spaces (for users with multiple last names).
* **Username**: At least 4 characters; no spaces allowed.
* **Email**: Must be a valid address with a domain (e.g., [user@example.com](mailto:user@example.com)).
* **Phone Number**: Auto-formats as `XXX-XXX-XXXX`. Validated to avoid invalid formats.
* **Date of Birth**: Users must be 18+ years old. Validated both on input and on terms acceptance.
* **Gender Selection**: Includes options like *Male, Female, Non-binary, Prefer not to disclose, and Prefer to self-describe*. If "self-describe" is selected, a mandatory input appears.
* **Password**: Requires:
  * Minimum 8 characters
  * At least one uppercase letter
  * At least one number
  * At least one symbol (e.g., `!@#$`)
* **Confirm Password**
* **Terms & Privacy Policy**: Must be checked to proceed. Validation triggers if required fields are not complete.

### User Experience Features

* First letter auto-capitalization for names.
* Phone number formatting as you type.
* Real-time password strength feedback (Weak / Medium / Strong).
* Helpful inline error messages for non-technical users.
* Smooth scrolling to the first error if the form is incomplete.
* Email confirmation notification shown after successful registration.

---

## Login Page

The login form allows users to sign in using **email**, **username**, or **phone number** along with their password.

* Includes simple but effective error messages for wrong credentials.
* Redirects to the Welcome Page after successful login.
* Uses `localStorage` to check against registered data (for demo purposes).

---

## Welcome Page

After logging in, users are greeted with a **custom Welcome Page**:

* Displays the user’s first and last name.
* Includes a modern, branded layout matching the rest of the site.
* Has a responsive design and logout functionality.
* Clean UI using CSS modules.

---

## Tech Stack

| Feature                  | Tools Used                  |
| ------------------------ | --------------------------- |
| Framework                | React                       |
| Form Handling            | React Hook Form             |
| Validation               | Yup                         |
| Styling                  | CSS + CSS Modules           |
| State & Data             | React Hooks, `localStorage` |
| Deployment (Recommended) | Netlify / Vercel            |
