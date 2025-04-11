"use client"
import { SignIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

const Page = () => {
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-200px)]'>
            <SignIn
                appearance={{
                    baseTheme: dark,
                    elements: {
                        formButtonPrimary: "bg-primary hover:bg-primary/90",
                        card: "shadow-none",
                        rootBox: "font-inter",
                        formField: "font-inter",
                        footerAction: "font-inter",
                        header: "font-inter",
                        headerTitle: "font-inter text-2xl font-semibold",
                        headerSubtitle: "font-inter text-muted-foreground"
                    }
                }}
            />
        </div>
    )
}

export default Page
