'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Post } from '@/lib/types';
import PostCard from '@/components/post-card';

export default function PostDetail() {
  const { id } = useParams(); // Get the post ID from the URL
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch post');
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!post) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <PostCard post={post} hideReadMore={true} />
      </div>
    </div>
  );
}
