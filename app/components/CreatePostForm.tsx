'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Image, X } from 'lucide-react'

export default function CreatePostForm() {
    const [content, setContent] = useState('')
    const [platforms, setPlatforms] = useState<string[]>([])
    const [scheduledTime, setScheduledTime] = useState('')
    const [media, setMedia] = useState<File | null>(null)
    const [mediaPreview, setMediaPreview] = useState<string | null>(null)

    function formDataToJSON(formData: FormData): { [key: string]: any } {
        const jsonObject: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            // If it's an array (like platforms), store it directly as an array
            if (key === 'platforms') {
                jsonObject[key] = JSON.parse(value as string); // Parse back into array
            } else {
                jsonObject[key] = value;
            }
        });
        return jsonObject;
    }

    useEffect(() => {
        if (media) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setMediaPreview(reader.result as string)
            }
            reader.readAsDataURL(media)
        } else {
            setMediaPreview(null)
        }
    }, [media])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('content', content)
        formData.append('platforms', JSON.stringify(platforms))
        formData.append('scheduledTime', scheduledTime || '')


        try {
            const jsonData = formDataToJSON(formData);
            let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`;
            if (mediaPreview) {
                url += "/pushPostMedia";
                jsonData.mediaUrl = mediaPreview
            }
            else {
                url += "/pushPostContent";
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
            if (response.ok) {

                setContent('')
                setPlatforms([])
                setScheduledTime('')
                setMedia(null)
                setMediaPreview(null)
            }
            // Optionally, you can trigger a refresh of the PostList here
            // } else {
            //     console.error('Failed to create post', response)
            // }
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMedia(e.target.files[0])
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's on your mind?"
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Platforms</Label>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="twitter"
                                    checked={platforms.includes('twitter')}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setPlatforms([...platforms, 'twitter'])
                                        } else {
                                            setPlatforms(platforms.filter(p => p !== 'twitter'))
                                        }
                                    }}
                                />
                                <Label htmlFor="twitter">Twitter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="instagram"
                                    checked={platforms.includes('instagram')}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setPlatforms([...platforms, 'instagram'])
                                        } else {
                                            setPlatforms(platforms.filter(p => p !== 'instagram'))
                                        }
                                    }}
                                />
                                <Label htmlFor="instagram">Instagram</Label>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="scheduledTime">Scheduled Time</Label>
                        <Input
                            type="datetime-local"
                            id="scheduledTime"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="media">Media</Label>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="file"
                                id="media"
                                onChange={handleMediaChange}
                                className="hidden"
                                accept="image/*,video/*"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById('media')?.click()}
                            >
                                <Image className="w-4 h-4 mr-2" />
                                Upload Media
                            </Button>
                            {media && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">{media.name}</span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setMedia(null)
                                            setMediaPreview(null)
                                        }}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    {mediaPreview && (
                        <div className="mt-4">
                            <Label>Media Preview</Label>
                            <div className="mt-2 max-w-sm mx-auto">
                                {media?.type.startsWith('image/') ? (
                                    <img src={mediaPreview || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto rounded-lg" />
                                ) : (
                                    <video src={mediaPreview} controls className="max-w-full h-auto rounded-lg">
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit">Create Post</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
