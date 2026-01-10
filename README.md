# Quiz Generator Frontend

The Frontend is Vite + React application that provides the use interface for the platform.

**The main features include:**
- Uploading documents (PDF, DOCX, PPTX)
- Sending files to the backend for AI- powered quiz generation
- Usser authentication with Supabase
- Dashboard for managing uploads and generated content

This project communicates with the backend FastAPI service, which handles authentication, AI processing, and quiz generation.

**Installation**
Run this inside the `/frontend` directory: `npm install`

Run `npm run dev` in the terminal. vite with start. 

*Create `.env` file in the root of the folder*
-Inside 
`VITE_SUPABASE_URL=your_supabase_url`
`VITE_SUPABASE_KEY=your_anon_public_key`


## User Authentication Using Supabase ##
The frontend uses Supabase to:

Register users

Log in users

Persist sessions

Protect private pages

### Initialize Supabase like this: ###
- created *lib* folder and in the folder a JS file 
```import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set in environment.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```
## File upladod Module ##
**The upload page allows:** 

Drag-and-drop files

Clicking the folder icon to open file explorer

Only accepting: PDF, DOCX, PPTX

``` const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
];
```

