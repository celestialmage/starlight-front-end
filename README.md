# Starlight

A React-based social media platform where users can create posts, interact through likes and replies, and explore content in an interactive, timeline-style feed.

## Features

### 📝 Create Posts
- Authenticated users can write and submit text-based posts.
- Posts are instantly added to the timeline without page reload.

### 💬 Replies
- View and write replies to any post.
- Replies display in chronological order under the selected post.

### ❤️ Likes
- Like or unlike posts with immediate UI updates.
- Like counts are displayed next to each post.

### 📜 Timeline Feed
- Displays posts from all users in reverse chronological order.
- Supports viewing both your own posts and posts from others.
- Post previews include username, post text, like count, and time since posted.

### 🔍 Post Detail View
- Clicking a post opens its detail page, showing the full post and all replies.
- Enables deeper engagement with conversation threads.

### 👤 User Profiles
- Posts display the author’s username.
- Potential for profile expansion to include bio, profile picture, and more.

## Tech Stack

- **Frontend:** React (functional components & hooks)
- **Routing:** React Router
- **Styling:** CSS Modules / Plain CSS
- **State Management:** React hooks (`useState`, `useEffect`)
- **API Communication:** Fetch API with async/await
- **Authentication:** Google OAuth integration (via `@react-oauth/google`)
- **Authorization & Security:** JSON Web Tokens (JWT) for secure API requests and session management

## Project Structure

```
src/
  components/
    editprofile/
        EditUser.jsx      # Top-Level. Displays the base page for this route
        UserForm.jsx      # Edits/creates user information
    home/
        Home.jsx          # Top-Level. Header component
        HomeButton.jsx    # Button that directs to landing page
        LogoutButton.jsx  # Button that logs out user and deletes tokens
        ProfileButton.jsx # Button that directs to logged user profile
        SearchButton.jsx  # Button that directs to user search page
    login/
        LoginPage.jsx     # Top-Level. Holds login component for GoogleLogin API
    post/
        PostDetails.jsx   # Top-level. Creates structure for post page.
        Reply.jsx         # Individual reply display
        ReplyForm.jsx     # Form for creating new replies
        ReplyList.jsx     # List of replies for a post
    profile/
        FollowButton.jsx  # Button that allows users to follow other users
        PostsSelector.jsx # Element that toggles if posts or likes are displayed
        Profile.jsx.      # Top-level. Creates structure for profile page
        ProfileDetails    # Displays information about the user
    search/
        SearchForm.jsx    # Form for searching users
        SearchPage.jsx    # Top-level. Creates structure for search page
        User.jsx          # Individual user display
        UserList.jsx      # List of users for search
    timeline/
        Landing.jsx       # Top-level. Creates structure for timeline page
        LikeButton.jsx    # Button for liking posts
        Post.jsx          # Individual post display
        PostForm.jsx      # Form for creating new posts
        PostList.jsx      # List of posts for timeline
```

## Getting Started

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Set Up Environment
Create a `.env` file in the root directory with your backend API URL, Google OAuth client ID, and JWT secret (if needed locally):
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_JWT_SECRET=your-jwt-secret
```

### 3️⃣ Start Development Server
```bash
npm start
```
The app will run on `http://localhost:3000`.
