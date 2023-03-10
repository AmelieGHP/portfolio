### Project Initialization

- Create .env in '/backend' & '/frontend'
- Run command `npm run setup` & 'npm run migrate'

### Available Commands

- `setup` : Initialization of frontend and backend, as well as all toolings
- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

### Portfolio

This is a portfolio. View on '/'.
You can add, delete, update technos & projects, & update your profile on '/admin' (not protected yet).
Almost fully responsive.
Contact section doesn't work on main, but was added on dev later and works there.

Docs :

- user stories (Jira) in https://babyplace-wcs.atlassian.net/jira/software/projects/POR/boards/2/backlog
- database model (MySQL Workbench) in 'backend/public/assets/databaseModel.png'
- website model (Figma) in 'backend/public/assets/maquette.png'
