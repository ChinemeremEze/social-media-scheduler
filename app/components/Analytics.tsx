'use client'

import { useState, useEffect } from 'react'
import { AnalyticsData } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function Analytics() {
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
    const [platform, setPlatform] = useState<string>('all')
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)

    useEffect(() => {
        fetchAnalytics()
    }, [platform, page, size])

    const fetchAnalytics = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analytics/getAnalytics?page=${page}&size=${size}${platform !== 'all' ? `&platform=${platform}` : ''}`)
            if (response.ok) {
                const data = await response.json()
                setAnalytics(data.info)
            } else {
                console.error('Failed to fetch analytics')
            }
        } catch (error) {
            console.error('Error fetching analytics:', error)
        }
    }

    const totalImpressions = analytics.reduce((sum, item) => sum + item.impressions, 0)
    const totalLikes = analytics.reduce((sum, item) => sum + item.likes, 0)
    const totalViews = analytics.reduce((sum, item) => sum + item.views, 0)

    const chartData = analytics.map(item => ({
        name: new Date(item.timestamp).toLocaleDateString(),
        impressions: item.impressions,
        likes: item.likes,
        views: item.views
    }))

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>View your social media performance</CardDescription>
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
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            impressions: {
                                label: "Impressions",
                                color: "hsl(var(--chart-1))",
                            },
                            likes: {
                                label: "Likes",
                                color: "hsl(var(--chart-2))",
                            },
                            views: {
                                label: "Views",
                                color: "hsl(var(--chart-3))",
                            },
                        }}
                        className="h-[400px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Line type="monotone" dataKey="impressions" stroke="var(--color-impressions)" name="Impressions" />
                                <Line type="monotone" dataKey="likes" stroke="var(--color-likes)" name="Likes" />
                                <Line type="monotone" dataKey="views" stroke="var(--color-views)" name="Views" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span>Page {page}</span>
                    <Button
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}