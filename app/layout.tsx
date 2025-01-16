import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Social Media Scheduler',
    description: 'Schedule and manage your social media posts',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen">
                    <nav className="bg-gray-500 text-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Image src="/logo.png" width={300} height={500} alt=" CBC Logo" />
                                        <h1 className="text-xl font-bold text-[#ee0000]">Social Media Scheduler</h1>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </nav>
                    <main className=" bg-white max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}

