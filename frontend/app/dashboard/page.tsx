'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getToken, isAuthenticated } from '@/lib/auth';
import { Post } from '@/lib/types';
import PostCard from '@/components/post-card';
import { toast } from 'sonner';

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error('Token is null');

      // Decode JWT token to get the user ID
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;

      const res = await fetch(`http://localhost:5000/api/posts?author=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch posts');

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const token = getToken();
      if (!token) {
        console.error('No token found. User might not be authenticated.');
        return;
      }

      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }

      toast.success('Post deleted successfully');
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      toast.error('Error deleting post');
      console.error('Error deleting post:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create post');

      toast.success('Post created successfully');
      setFormData({ title: '', content: '' });
      fetchUserPosts(); // Refresh posts after adding a new one
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Post Section */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  className="min-h-[200px]"
                />
              </div>
              <Button type="submit">Create Post</Button>
            </form>
          </CardContent>
        </Card>

        {/* Your Posts Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Posts</h2>
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} isDashboard={true} onDeleteClick={() => handleDelete(post._id)} />
            ))}
          </div>
          {posts.length === 0 && (
            <p className="text-muted-foreground text-center py-8">You haven't created any posts yet.</p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}
