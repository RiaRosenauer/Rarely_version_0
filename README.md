# Rarely

Rarely is a web platform designed to support individuals with rare conditions, providing a space for community connection, resource sharing, and knowledge exchange.

## Features

- **Community Forum**: Connect with others through topic-based discussions
- **Group Chat**: Real-time communication with community members
- **Resource Library**: Access curated resources and information
- **Studies Section**: Stay updated with latest research and clinical trials
- **OCR Integration**: Extract text from medical documents
- **Dashboard**: Personalized view of your activities and relevant content

## Tech Stack

- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS
- API Routes for backend functionality

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Rarely_version_0.git
cd Rarely_version_0
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with necessary environment variables.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── chat/             # Chat feature
│   ├── forum/            # Forum pages
│   ├── resources/        # Resource library
│   └── studies/          # Studies section
├── components/            # Reusable React components
├── data/                  # Mock data and data utilities
├── public/               # Static assets
└── styles/               # Global styles
```
