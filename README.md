# Superhero React Project

## Instructions

- [Confluence page](https://adkgroup.atlassian.net/wiki/spaces/SUP/overview?homepageId=1172865406)
- [JIRA board](https://adkgroup.atlassian.net/jira/software/c/projects/SO/boards/430)
- Design

## Getting Started

Copy env sample

```javscript
cp .env.sample .env
```

Get api access token and fill value in .env for `API_ACCESS_TOKEN`

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Next.js

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Recommended Standards

- Network
  - [Axios](https://github.com/axios/axios)
- State management
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Redux Saga](https://redux-saga.js.org/docs/introduction/GettingStarted)
- UI component library
  - [MUI](https://mui.com/getting-started/installation/)
- Testing
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Deployment
  - [Deployment](https://bitbucket.org/adkgroup/buildtools/src/master/)
- Styling framework
  - [Emotion](https://emotion.sh/docs/introduction)
  - [Styled Components](https://styled-components.com/)
  - [Tailwind CSS](https://tailwindcss.com/docs/installation)

react-testing-library

- todo: set up redux mock wrapper
  browser-support
  husky / lint-staged
  swagger codegen
  .vscode settings
  react-router-dom
  redux toolkit

# Deployment on Vercel

Vercel is a platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.

## Setup

Signup for an account on [Vercel](https://vercel.com/). Choose the Signup with Atlassian/Bitbucket option.

Import your project repository from your Bitbucket account. [See documentation](https://vercel.com/docs/concepts/git/vercel-for-bitbucket)\
*<small>Make sure you have forked the repository to your personal Bitbucket account. If ADK Group is the owner of the repository you will need to login to Vercel via the ADK Group admin login, not your adkgroup email.</small>*

If you have environment variables, you need to set them in vercel [See documentation](https://vercel.com/docs/concepts/projects/environment-variables)

Also you can use [Vercel CLI](https://vercel.com/cli)

```bash
 npm i -g vercel
 vercel
```
