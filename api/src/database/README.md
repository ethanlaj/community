# Database Management Guide

This document provides a detailed guide on managing database changes within our project. We use Sequelize as an ORM (Object-Relational Mapper), and it helps us handle database operations without writing SQL code.

## Scripts

We have set up several npm scripts to simplify the database operations:

-   `db:init`: Sets up the database based on the current models and marks existing migrations as executed. This is typically only used during initial setup.
-   `db:create`: Interactive script that creates new migration files based on your input.
-   `db:migrate`: Executes new migrations that have not been run on the database.
-   `db:undo`: Reverts the most recently executed migration.

Here's how to use them:

### Initial Database Setup

To set up your database for the first time, run:

```bash
npm run db:init
```

This command will create tables in your database corresponding to the current state of your models. It's typically used only once when setting up the project for the first time or when setting up a fresh database.

### Creating New Migrations

When you need to make changes to the database structure (like adding a new table or modifying an existing one), you should create a new migration file. To do this, run:

```bash
npm run db:create
```

Follow the prompts to create your migration file appropriately. This will ensure changes are version-controlled and can be tracked and altered if necessary.

### Applying Migrations

To apply new migrations to your database, run:

```bash
npm run db:migrate
```

This command applies all pending migrations to the database, altering the structure as specified in the migration files.

### Undoing Migrations

If you need to revert the most recent migration, you can do so by running:

```bash
npm run db:undo
```

This will undo the latest database migration. Be careful with this command, especially in production, as it can lead to data loss if not used correctly.

## Important Notes

-   Never modify the database directly; always use migrations so changes can be tracked and replicated across all development environments.
-   Test your migrations on a development database before pushing them to production.
-   Migrations will be applied to production when they are pushed to the `main` branch. This is done automatically.

By following these practices, we can maintain a consistent, version-controlled database schema that can be easily managed and collaborated on across our development team.
