'use client'

import { useState, useEffect } from 'react'
import { Post } from '../types'
import { FaPinterest, FaTiktok } from "react-icons/fa";
import { Twitter, Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ITEMS_PER_PAGE = 5

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [platform, setPlatform] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchPosts()
    setCurrentPage(1)
  }, [platform])


  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/getAllPosts${(platform && platform !== "all") ? `?platform=${platform}` : ''}`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.info)
      } else {
        console.error('Failed to fetch posts')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/deletePost/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchPosts()
      } else {
        console.error('Failed to delete post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return 'bg-blue-400 hover:bg-blue-500'
      case 'instagram':
        return 'bg-pink-600 hover:bg-pink-700'
      default:
        return 'bg-gray-400 hover:bg-gray-500'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="h-4 w-4 mr-1" />
      case 'instagram':
        return <Instagram className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)
  const paginatedPosts = posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts</CardTitle>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {paginatedPosts.map((post) => (
            <li key={post.id}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#0095C4] truncate">{post.content}</p>
                    <div className="flex space-x-2">
                      {post.platforms.map((platform) => (
                        <span
                          key={platform}
                          className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full text-white ${getPlatformColor(platform)}`}
                        >
                          {getPlatformIcon(platform)}
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Scheduled: {new Date(post.scheduledTime).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{post.posted ? 'Posted' : 'Scheduled'}</p>
                  </div>
                  {post.mediaUrl && (
                    <div className="mt-4">
                      {post.mediaUrl.endsWith('.mp4') ? (
                        <video src={post.mediaUrl} controls className="w-full h-auto rounded-lg">
                        </video>
                      ) : (
                        <img src={post.mediaUrl || "/placeholder.svg"} alt="Post media" className="w-[400px] h-auto rounded-lg" />
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleDelete(post.id)}
                    variant="destructive"
                    size="sm"
                    className="ml-auto"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}
