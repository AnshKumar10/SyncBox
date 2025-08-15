

## Description
SyncBox is a modern cloud storage solution designed for security, accessibility, and ease of use. It enables users to store, manage, and share files seamlessly across devices, with a sleek ShadCN UI interface and a robust Appwrite backend for real-time performance.

## Tech Stack
- **Frontend:** React 19 (RC), Next.js 15, Tailwind CSS + tailwindcss-animate, ShadCN UI, Radix UI
- **Core Libraries:** Appwrite (Auth, Database, File Storage), Zod, React Hook Form, Recharts
- **UX Enhancements:** React Dropzone, use-debounce
- **Tooling:** TypeScript, ESLint, Prettier

## Key Features
- **Anywhere Access** — Sync files across desktop, tablet, and mobile.
- **Drag & Drop Uploads** — Effortless file uploads via React Dropzone.
- **End-to-End Security** — Encrypted file storage with Appwrite.
- **Free Storage Tier** — 2GB free space for personal or small projects.
- **One-Click Sharing** — Generate secure, shareable file links instantly.
- **Storage Usage Dashboard** — Visualize space usage with Recharts.
- **User Authentication** — Secure signup/login with personalized storage.
- **Sleek UI** — Built with ShadCN components and Radix UI primitives.

## Challenges & Solutions

### 1. Secure File Handling  
**Challenge:**  
Ensuring files remain private and protected while allowing easy sharing.  

**Solution:**  
Integrated **Appwrite**’s secure storage and authentication, combined with encrypted links for controlled access.

---

### 2. Smooth File Uploads Across Devices  
**Challenge:**  
Creating an intuitive upload experience that works consistently on desktop and mobile.  

**Solution:**  
Used **React Dropzone** for drag-and-drop uploads with fallback support for mobile touch interactions.

---

### 3. Real-Time Storage Insights  
**Challenge:**  
Providing users with up-to-date storage usage without impacting performance.  

**Solution:**  
Leveraged **Recharts** for lightweight data visualization and optimized queries to fetch storage stats on demand.

## What I Learned
- Integrating Appwrite for authentication, database, and file storage in a production-ready app.
- Creating a responsive file upload system for cross-device usability.
- Designing consistent UI components with ShadCN UI and Radix UI.

## Screenshots
![image](https://github.com/user-attachments/assets/3ce03561-a902-4625-9262-7ab8188e8ca3)  
![image](https://github.com/user-attachments/assets/4e8ae455-f92f-4605-a2c0-1a1c15ce33b4)  
![image](https://github.com/user-attachments/assets/bdff8c9a-18a4-4d23-ab4e-0ba8cec5f8f5)
