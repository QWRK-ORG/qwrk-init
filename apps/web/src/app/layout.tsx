import { NavigationWrapper } from "@/components/navigation/navigation-wrapper"
import { TopNav } from "@/components/navigation/top-nav"
import { Button } from "@workspace/ui/components/button"
import "@workspace/ui/globals.css"
import { LayoutDashboard, Package, Settings, ShoppingCart, Users, Zap } from "lucide-react"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    // TopNav configuration
    const topNavProps = {
        logo: (
            <div className='flex h-10 w-10 items-center justify-center rounded-md border'>
                <span className='font-bold'>A</span>
            </div>
        ),
        navItems: [
            {
                href: "/dashboard",
                label: "Dashboard",
                icon: <LayoutDashboard className='h-4 w-4' />
            },
            { href: "/orders", label: "Orders", icon: <ShoppingCart className='h-4 w-4' /> },
            { href: "/products", label: "Products", icon: <Package className='h-4 w-4' /> },
            { href: "/customers", label: "Customers", icon: <Users className='h-4 w-4' /> },
            { href: "/settings", label: "Settings", icon: <Settings className='h-4 w-4' /> }
        ],
        actions: (
            <Button variant='default' size='sm' className='gap-1'>
                <Zap className='h-4 w-4' />
                <span>Upgrade</span>
            </Button>
        ),
        userProfile: (
            <div className='h-8 w-8 rounded-full bg-muted overflow-hidden'>
                <img
                    src='/placeholder.svg?height=32&width=32'
                    alt='User avatar'
                    className='h-full w-full object-cover'
                />
            </div>
        ),
        showThemeSwitcher: true
    }

    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <NavigationWrapper>
                    <TopNav {...topNavProps} />
                    <main className='flex-1'>{children}</main>
                </NavigationWrapper>
            </body>
        </html>
    )
}
