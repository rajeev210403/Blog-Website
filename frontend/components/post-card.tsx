'use client';

import { Post } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from './ui/button';
import { getToken } from '@/lib/auth';

interface PostCardProps {
  post: Post;
  hideReadMore?: boolean; // New optional prop
  isDashboard?: boolean;
  onDeleteClick?: () => void;
}

export default function PostCard({ post, hideReadMore, isDashboard, onDeleteClick }: PostCardProps) {
  // const handleDelete = async () => {
  //   try {
  //     const token = getToken();
  //     const res = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!res.ok) throw new Error('Failed to delete post');
  //     onDelete?.(); // Refresh the list after deleting
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // };
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2 leading-relaxed">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className={`text-muted-foreground break-words ${hideReadMore ? '' : 'line-clamp-3'}`}>
          {post.content}
        </p>
      </CardContent>
      {/* <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 break-words">{post.content}</p>
      </CardContent> */}
      <CardFooter className="flex justify-between items-center flex-wrap">
        <div className="text-sm text-muted-foreground">
          <p>By {post.author.email}</p>
          <p>{format(new Date(post.createdAt), 'MMM d, yyyy')}</p>
        </div>
        <div className="flex gap-2">
          {!hideReadMore && (
            <Button asChild>
              <Link href={`/posts/${post._id}`}>Read More</Link>
            </Button>
          )}
          
          {/* Show delete button only in the dashboard */}
          {isDashboard && (
            <Button variant="destructive" onClick={onDeleteClick}>
              Delete
            </Button>
          )}
        </div>
        
      </CardFooter>
    </Card>
  );
}