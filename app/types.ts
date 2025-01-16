export interface Post {
    id: string;
    content: string;
    platforms: string[];
    scheduledTime: string;
    posted: boolean;
    mediaUrl: string
}

export interface AnalyticsData {
    postId: string;
    platform: string;
    impressions: number;
    likes: number;
    views: number;
    timestamp: string;
}

