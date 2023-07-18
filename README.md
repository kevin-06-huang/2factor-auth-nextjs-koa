# 2FA Demo

This is a demo project showcasing two-factor authentication (2FA) implementation using Next.js and Koa.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies.

## Usage

1. Run `npm run dev` to start the development server on port 5000.
2. Access the demo application in your web browser at `http://localhost:5000`.

## Project Structure

- `authServer`: Contains the server-side code for authentication.
- `prisma`: Contains the Prisma schema for database configuration.
- `src`: Contains the client-side code and Next.js pages.

## Scripts

- `dev`: Starts the development server on port 5000.
- `build`: Builds the Next.js application.
- `start`: Starts the Next.js production server.
- `lint`: Lints the project files using ESLint.
- `server`: Starts the authentication server using TypeScript and Koa.
- `db:migrate`: Creates a new Prisma migration for the user entity.
- `db:push`: Pushes the Prisma schema changes to the database.
- `format`: Formats the project files using Prettier.

## Dependencies

- `@koa/cors`: Cross-origin resource sharing middleware for Koa.
- `@prisma/client`: Prisma client for database access.
- `@types/node`, `@types/react`, `@types/react-dom`: TypeScript type definitions for Node.js and React.
- `autoprefixer`, `postcss`: CSS post-processing tools.
- `dotenv`: Loads environment variables from a `.env` file.
- `eslint`, `eslint-config-next`: ESLint configuration for Next.js projects.
- `hi-base32`: Base32 encoding library for OTP generation.
- `koa`, `koa-bodyparser`, `koa-router`: Web framework and middleware for Koa.
- `next`, `react`, `react-dom`: Next.js and React libraries.
- `otpauth`, `qrcode`: Libraries for generating and displaying OTP QR codes.
- `tailwindcss`: CSS utility framework.
- `typescript`: TypeScript language support.
- `zustand`: State management library.

## Development Dependencies

- `@types/koa`, `@types/koa__cors`, `@types/koa-bodyparser`, `@types/koa-router`: TypeScript type definitions for Koa.
- `@types/qrcode`: TypeScript type definitions for QR code generation.
- `prettier`, `prettier-plugin-tailwindcss`: Code formatting tools.
- `prisma`: Prisma migration and database management tool.
- `ts-node`: TypeScript execution and REPL for Node.js.
