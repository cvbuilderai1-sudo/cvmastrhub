# SmartCV Hub

SmartCV Hub is an AI-powered platform for creating and analyzing resumes.

## Features

- **CV Builder**: Create professional resumes with AI-assisted content.
- **CV Analyzer**: Get instant feedback and optimization tips for your resume.
- **Multilingual Support**: Available in English, French, and Arabic (RTL support).
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, and next-intl.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smartcv-hub.git
   cd smartcv-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/[locale]`: Localized routes and layouts.
- `src/components`: Reusable UI components.
- `src/messages`: Translation files.
- `src/lib`: Shared utilities and constants.

## License

MIT
