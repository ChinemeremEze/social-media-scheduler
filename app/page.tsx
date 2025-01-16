import PostList from './components/PostList'
import CreatePostForm from './components/CreatePostForm'
import Analytics from './components/Analytics'

export default function Home() {
    return (
        <div className="space-y-8 p-8 bg-gray-50">
            <h1 className="text-4xl font-bold text-[#162B48] text-center mb-12">Social Media Scheduler</h1>
            <div className="grid gap-8">
                <div>
                    <h2 className="text-2xl font-semibold text-[#162B48] mb-4">Create New Post</h2>
                    <CreatePostForm />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-[#162B48] mb-4">Your Posts</h2>
                    <PostList />
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-semibold text-[#162B48] mb-4">Analytics</h2>
                <Analytics />
            </div>
        </div>
    )
}

