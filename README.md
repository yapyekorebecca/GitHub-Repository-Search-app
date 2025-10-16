# GitHub-Repository-Search-app

A modern, feature-rich React + Node.js application for searching and exploring public GitHub repositories with an elegant sidebar interface and advanced filtering capabilities.

## Features

### Search & Discovery
- **Powerful Search** - Search public GitHub repositories by keyword with real-time results
- **Advanced Filters** - Filter by programming language, minimum stars, minimum forks, and license type
- **Smart Sorting** - Sort results by best match, most stars, or most forks
- **Pagination** - Navigate through results with smooth page transitions

### User Experience
- **Dark/Light Theme** - Toggle between beautiful dark and light modes
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Persistent Preferences** - Saves your last query and filter settings in localStorage
- **Visual Stats** - Display total stars and forks for current page results
- **Smooth Animations** - Polished transitions and hover effects throughout

### Technical
- **Modern Stack** - Built with React 18, Vite, and Express.js
- **GitHub REST API** - Direct integration with GitHub's official API
- **CORS Proxy** - Node.js backend handles API calls to avoid CORS issues
- **Optimized Performance** - Fast loading with efficient state management

##  Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

**Option 1: Run Everything at Once (Recommended)**
```bash
npm install
npm run dev
```

This single command will:
- Install all dependencies for both frontend and backend
- Launch backend server at `http://localhost:5000`
- Launch frontend dev server at `http://localhost:5173`
- Display logs from both servers in the same terminal

**Option 2: Run Separately**

1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Open App:**
   Navigate to `http://localhost:5173` in your browser

## How to Use
**Enter Search Query** - Type keywords like "react", "machine learning", or "web framework"
4. **Apply Filters** :
   - Choose a programming language.
   - Set minimum stars threshold
   - Set minimum forks threshold
   - Select a specific license
   - Choose sorting preference
   - Adjust results per page
5. **lick Search** - View results in beautiful cards
6. **Toggle Theme** - Click the sun/moon icon in top-right to switch themes
7. **Navigate pages** Use Previous/Next buttons to browse through results

## UI Features

- **Sidebar Organization:**
  - Search section
  - Filters section (Language, Stars, Forks, License)
  - Display Options section (Sort, Results per page)

- **Result Cards Display:**
  - Repository name and description
  - Owner avatar and username
  - Star count with  icon
  - Fork count with icon
  - Primary programming language
  - Click to open repository on GitHub

## Configuration

### GitHub API Rate Limits

The app uses unauthenticated GitHub API requests, which have a limit of **60 requests per hour per IP address**.

**To increase rate limits (5,000 requests/hour):**

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token (no special scopes needed for public repo search)

2. Add token to backend:
   ```bash
   # In backend directory, create .env file
   echo "GITHUB_TOKEN=your_token_here" > .env
   ```

3. The backend will automatically use the token if available

## Project Structure

```
github-repo-search/
├── src/
│   ├── components/
│   │   ├── RepoCard.jsx       # Individual repository card
│   │   ├── RepoList.jsx       # Results list with pagination
│   │   ├── SearchBar.jsx      # Search input and filters
│   │   └── ThemeToggle.jsx    # Dark/light mode toggle
│   ├── contexts/
│   │   └── ThemeContext.jsx   # Theme state management
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles with sidebar
├── server.js                  # Express backend server
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Technologies Used

### Frontend
- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **CSS Variables** - Dynamic theming
- **LocalStorage API** - Persistent user preferences

### Backend
- **Express.js** - Web server framework
- **node-fetch** - HTTP client for GitHub API
- **CORS** - Cross-origin resource sharing

## API Endpoints

### Backend API
- `GET /api/search` - Search GitHub repositories
  - Query parameters:
    - `q` - Search query (required)
    - `language` - Programming language filter
    - `stars_gte` - Minimum stars
    - `license` - License type (e.g., mit, apache-2.0)
    - `sort` - Sort by (stars, or best match)
    - `page` - Page number
    - `per_page` - Results per page (5, 10, or 20)

## Notes

- **Rate Limiting** - Without a token, you're limited to 60 requests/hour
- **Search Syntax** - Supports GitHub search qualifiers (e.g., "stars:>1000")
- **Results Cap** - GitHub API returns maximum 1000 results per query
- **Local Development** - App runs entirely on localhost, no deployment needed

## Troubleshooting

**Sidebar not showing?**
- Make sure you have the complete `index.css` with sidebar styles
- Check that `App.jsx` has `sidebarOpen` state
- Verify browser console for errors

**No search results?**
- Ensure backend is running on port 5000
- Check browser console for API errors
- Verify GitHub API is accessible (check rate limits)

**Filters not working?**
- Clear localStorage: `localStorage.clear()` in browser console
- Refresh the page and try again

## License

This project is open source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

**Built with  using React, Node.js, and the GitHub API**