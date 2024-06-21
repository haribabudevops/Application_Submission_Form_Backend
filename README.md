# Application_Submission_Form_Backend
Application Submission Form Backend is a Node.js Express server used for storing and retrieving form submissions for the Application Submission Form project.

- **View Submissions**: Navigate through submitted forms.
- **Create New Submissions**: Fill out and submit a new form with a stopwatch timer.
- **Keyboard Shortcuts**: Use keyboard shortcuts to toggle the stopwatch and submit the form.

## Prerequisites
- Express Server
- Typescript
- Node.js
- npm (Node Package Manager)

## How to Run

### Backend (Express Server)
1. **Navigate to the backend directory**:
    ```sh
    cd SubmissionBackend
    ```
2. **Install dependencies**:
    ```sh
    npm install
    ```
3. **Start the server**:
    ```sh
    node service.js
    ```
    - The server will start running at `http://localhost:3000`.

## Endpoints
- **`/ping`** - A GET request that always returns `True`.
- **`/submit`** - A POST request to submit form data.
- **`/read`** - A GET request to read submitted forms with query parameter `index`.

## Project Structure
└── SubmissionBackend/
├── db.json
├── package.json
├── server.ts
├── tsconfig.json
├── LICENSE.md
└── README.md

## Development
### Compiling TypeScript
To compile TypeScript files to JavaScript, run:
    
```sh
    tsc server.ts
```
    
This will compile the server.ts file into a dist directory as server.js.

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
