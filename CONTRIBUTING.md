# Contributing to EduPath

Thank you for your interest in contributing to EduPath! We are building the future of student guidance in Indonesia.

## How to Contribute

### 1. Reporting Bugs
- Open an Issue in this repository.
- Describe the bug clearly: what did you do, what happened, and what did you expect?
- Attach screenshots if possible.

### 2. Suggesting Features
- We love new ideas! Open an Issue with the tag `enhancement`.
- Explain the user value: "As a student, I want to..."

### 3. Submitting Changes
1.  **Fork** the repository.
2.  Create a new Branch: `git checkout -b feature/AmazingFeature`.
3.  **Commit** your changes: `git commit -m 'Add AmazingFeature'`.
4.  **Push** to the branch: `git push origin feature/AmazingFeature`.
5.  Open a **Pull Request**.

## Code Style
- We use **TypeScript** strictly. No `any` types if possible.
- Use **Tailwind CSS** for styling.
- Follow the existing folder structure (`components/`, `data/`).

## Data Updates
If you want to add more universities:
1.  Edit `data/universities.json`.
2.  Ensure you follow the schema:
    ```json
    {
      "id": "unique-id",
      "name": "University Name",
      "cost_range": "Rp X - Rp Y",
      "top_prodi": [...]
    }
    ```

Thank you only for helping Indonesian students achieve their dreams! 🚀
