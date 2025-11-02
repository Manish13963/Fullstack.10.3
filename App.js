import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, User, Lock, LogOut, Home, PlusSquare } from 'lucide-react';

// FAKE MOCK DATA
const initialPosts = [
  {
    id: 1,
    author: 'Alice',
    avatar: 'https://placehold.co/100x100/e2e8f0/64748b?text=A',
    timestamp: '2h ago',
    content: 'Just deployed my first app to AWS. What a great feeling! 🚀 #devlife #aws #react',
    likes: 23,
    comments: 5,
  },
  {
    id: 2,
    author: 'Bob',
    avatar: 'https://placehold.co/100x100/dbeafe/4338ca?text=B',
    timestamp: '3h ago',
    content: 'Thinking about learning DynamoDB for my next project. Any tips?',
    likes: 15,
    comments: 7,
  },
];

// Main App Component: Manages login state and page navigation
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return <FeedPage onLogout={() => setIsLoggedIn(false)} />;
}

// 1. LOGIN PAGE COMPONENT
function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Welcome Back
        </h2>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="relative mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 pl-10 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="u/username"
                defaultValue="demo_user"
              />
              <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 pl-10 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                defaultValue="password"
              />
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          (This is a demo. Any username/password will work.)
        </p>
      </div>
    </div>
  );
}

// 2. FEED PAGE COMPONENT (Main App UI)
function FeedPage({ onLogout }) {
  const [posts, setPosts] = useState(initialPosts);

  // This function simulates creating a new post
  const handleCreatePost = (content) => {
    const newPost = {
      id: posts.length + 1,
      author: 'demo_user',
      avatar: 'https://placehold.co/100x100/c7d2fe/4338ca?text=D',
      timestamp: '1m ago',
      content: content,
      likes: 0,
      comments: 0,
    };
    // Adds the new post to the top of the feed
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 font-inter">
      <div className="flex w-full max-w-4xl">
        {/* --- Left Sidebar (Navigation) --- */}
        <aside className="sticky top-0 h-screen w-20 md:w-64 p-4 border-r border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600 hidden md:block">
            SocialApp
          </h1>
          <nav className="mt-8 space-y-2">
            <a
              href="#"
              className="flex items-center p-3 space-x-3 text-gray-900 bg-blue-100 rounded-lg"
            >
              <Home className="w-6 h-6 text-blue-600" />
              <span className="font-semibold hidden md:inline">Home</span>
            </a>
            <button
              onClick={onLogout}
              className="flex items-center w-full p-3 space-x-3 text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="w-6 h-6" />
              <span className="font-semibold hidden md:inline">Logout</span>
            </button>
          </nav>
        </aside>

        {/* --- Center Feed --- */}
        <main className="flex-1 max-w-2xl min-w-0 border-r border-gray-200">
          <header className="sticky top-0 z-10 p-4 font-bold bg-white/80 backdrop-blur-md border-b border-gray-200">
            Home
          </header>
          <CreatePost onCreatePost={handleCreatePost} />
          <PostList posts={posts} />
        </main>
      </div>
    </div>
  );
}

// 3. CREATE POST COMPONENT
function CreatePost({ onCreatePost }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content);
      setContent('');
    }
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <img
          src="https://placehold.co/100x100/c7d2fe/4338ca?text=D"
          alt="My Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 text-lg text-gray-900 border-none rounded-lg resize-none focus:outline-none focus:ring-0"
            rows="3"
            placeholder="What's happening?"
          ></textarea>
          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button
              type="submit"
              disabled={!content.trim()}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full disabled:opacity-50 hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// 4. POST LIST COMPONENT
function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

// 5. INDIVIDUAL POST COMPONENT
function Post({ post }) {
  return (
    <article className="flex p-4 space-x-4 bg-white border-b border-gray-200 hover:bg-gray-50">
      <img
        src={post.avatar}
        alt={`${post.author}'s avatar`}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">{post.author}</span>
          <span className="text-sm text-gray-500">· {post.timestamp}</span>
        </div>
        <p className="mt-1 text-gray-800 whitespace-pre-wrap">
          {post.content}
        </p>
        <div className="flex justify-between max-w-xs mt-3">
          <button className="flex items-center space-x-2 text-sm text-gray-500 group hover:text-blue-500">
            <div className="p-2 rounded-full group-hover:bg-blue-100">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-sm text-gray-500 group hover:text-red-500">
            <div className="p-2 rounded-full group-hover:bg-red-100">
              <Heart className="w-5 h-5" />
            </div>
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-sm text-gray-500 group hover:text-green-500">
            <div className="p-2 rounded-full group-hover:bg-green-100">
              <Send className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </article>
  );
}
