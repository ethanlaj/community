# Tasks and Requirements

Note: These tasks are only the initial tasks that were created at the beginning of the project. They are not up to date. For up to date tasks, please refer to the [Trello board (invite-only)](https://trello.com/b/Xv6cbIvZ/community).

## Requirements:

### R1. Client Requests

- Update contact name field to include first and last name.
- Ability to add multiple organizations to a meeting.
- Add active status (maybe startdate, enddate) to Organization Contact.
- Ability to see more information of any contact just by hovering over it.
- Red exclamation mark or a stop sign when you hover over a contact that should not be contacted for that company.
- Add a field to communications form that says what kind of a communication it is.
- Add notes field to the contact form.

### R2. Imports/Exports

- **Exports:**
  - Add API endpoint that sends an excel file with dummy data to the UI.
  - Have the UI download excel file from the API endpoint.
  - Add API endpoint that exports all communications data in Excel file format.
  - Add API endpoint that exports all organization data in Excel file format.
  - Connect UI to communications export endpoint.
  - Connect UI to organizations export endpoint.
- **Imports:**
  - Create support for excel file imports for communications, create one or more import API endpoints.
  - Create organizations import API endpoint.
  - UI for communications import.
  - UI for organizations import.
  - Template for excel imports.

### R3. Users

- Implement logins using Microsoft Authentication.
- Add create user endpoint to API.
- Add delete user endpoint to API.
- Add update user endpoint to API.

### R4. Contacts

- Add a Create contact page on the UI.
- Add ability to assign contacts to organization locations on the UI.

### R5. Communication

- Users should be able to log communications they make with organizations/contacts.

### R6. Software Requirements

- Add Ability to do Database Migrations.
- Add Typescript Support.
- Update useForm hook to support generics.
- Fix ReadMe.

### R7. Notifications

- Add ability for users to subscribe to contacts.
- Add ability for users to subscribe to organizations.
- Show update notifications on UI.

### R8. Searching

- Add a search bar to UI.
- Update DB to support aliases for Organizations.
- Update DB to support aliases for Contact.
- Add ability to add aliases for Organizations in update organization form.
- Add ability to add aliases for Contacts in update organization form.
- Add ability to remove aliases for Organizations in update organization form.
- Add ability to remove aliases for Contacts in update organization form.

### R9. Organizations

- Add an Organizations page
- Add an invidual Organization page that is linked to when clicking an organization
- Add ability to create an organization
- Add update organizations
- Add delete organization
