import { Post } from '@/lib/types';
import PostCard from '@/components/post-card';

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('http://localhost:5000/api/posts', { 
      cache: 'no-store', // Ensure fresh data every request
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts(); // Fetch posts on the server

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to DevBlog</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No posts available at the moment.</p>
          <p className="text-muted-foreground mt-2">Be the first to share your thoughts!</p>
        </div>
      )}
    </main>
  );
}
