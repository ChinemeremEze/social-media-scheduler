# Social Media Scheduler

## Overview

Social Media Scheduler is a comprehensive Next.js application designed to streamline the process of managing and scheduling posts across multiple social media platforms. This tool provides an intuitive interface for content creators, social media managers, and businesses to efficiently plan, create, and analyze their social media presence.

## Features

- **Multi-Platform Support**: Schedule posts for multiple social media platforms (currently supporting Twitter and Instagram).
- **Post Creation**: Easily create posts with text content and media attachments (images and videos).
- **Media Preview**: View a preview of attached media before scheduling your post.
- **Flexible Scheduling**: Set specific dates and times for your posts to be published.
- **Post Management**: View, edit, and delete scheduled posts.
- **Analytics Dashboard**: Gain insights into your social media performance with detailed analytics, including impressions, likes, and views.
- **Responsive Design**: Fully responsive interface that works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js 13 with App Router
- **React**: Version 18 for building user interfaces
- **TypeScript**: For type-safe code
- **Styling**: Tailwind CSS for responsive design
- **UI Components**: shadcn/ui for pre-built, customizable components
- **Data Visualization**: Recharts for creating interactive charts

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A backend service set up to handle API requests (refer to the API documentation)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/stanleyezeakudolu/social-media-scheduler.git
```

2. Navigate to the project directory:

```bash
cd social-media-scheduler
```

3. Install dependencies:

```bash
npm install
```

### Local Development

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```plaintext
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_TWITTER_API_KEY=your_twitter_api_key
NEXT_PUBLIC_INSTAGRAM_API_KEY=your_instagram_api_key
```

Replace `your_backend_api_url`, `your_twitter_api_key`, and `your_instagram_api_key` with your actual backend API URL and social media API keys.

### Build for Production

To create an optimized build for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

### Testing

Run unit tests:

```bash
npm run test
# or
yarn test
```

Run end-to-end tests:

```bash
npm run test:e2e
# or
yarn test:e2e
```

## Deployment

1. Build the project for production:

```bash
npm run build
# or
yarn build
```
