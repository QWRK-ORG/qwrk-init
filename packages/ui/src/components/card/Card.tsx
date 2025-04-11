import { cn } from "@workspace/ui/lib/utils.js"
import * as React from "react"

/**
 * Card component that serves as a container for content
 * 
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Account Settings</CardTitle>
 *     <CardDescription>Manage your account preferences</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Your account settings content goes here.</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Save changes</Button>
 *   </CardFooter>
 * </Card>
 * 
 * @param props - Component props
 * @param props.className - Optional CSS class name
 * @returns Card container element
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot='card'
            className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
                className
            )}
            {...props}
        />
    )
}

/**
 * Header section for the Card component
 * 
 * @example
 * <CardHeader>
 *   <CardTitle>Welcome back</CardTitle>
 *   <CardDescription>Deploy your new project in one-click</CardDescription>
 *   <CardAction>
 *     <Button size="sm" variant="ghost">
 *       <MoreHorizontal className="h-4 w-4" />
 *     </Button>
 *   </CardAction>
 * </CardHeader>
 * 
 * @param props - Component props
 * @param props.className - Optional CSS class name
 * @returns Card header element
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot='card-header'
            className={cn(
                "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
                className
            )}
            {...props}
        />
    )
}

/**
 * Title component for the Card
 * 
 * @example
 * <CardTitle>Your Profile</CardTitle>
 * 
 * @param props - Component props
 * @param props.className - Optional CSS class name
 * @returns Card title element
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot='card-title'
            className={cn("leading-none font-semibold", className)}
            {...props}
        />
    )
}

/**
 * Description component for the Card
 * 
 * @example
 * <CardDescription>View and update your personal information</CardDescription>
 * 
 * @param props - Component props
 * @param props.className - Optional CSS class name
 * @returns Card description element
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot='card-description'
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    )
}

/**
 * Action component for the Card, typically used for buttons or interactive elements
 * 
 * @example
 * <CardAction>
 *   <Button variant="outline">Edit</Button>
 * </CardAction>
 * 
 * @param props - Component props
 * @param props.className - Optional CSS class name
 * @returns Card action element
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot='card-action'
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className
            )}
            {...props}
        />
    )
}

/**
 * Content section for the Card component
 * 
 * @example
 * <CardContent>
 *   <form>
 *     <div className="grid w-full items-center gap-4">
 *       <div className="flex flex-col space-y-1.5">
 *         <Label htmlFor="name">Name</Label>
 *         <Input id="name" placeholder="Your name" />
 *       </div>
 *     </div>
 *   </form>
 * </CardContent>
 * 
 * @param props - Component props
 * @param props.className - Optional CSS class name
 * @returns Card content element
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return <div data-slot='card-content' className={cn("px-6", className)} {...props} />
}

/**
 * Footer section for the Card component
 * 
 * @example
 * <CardFooter className="flex justify-between">
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save</Button>
 * </CardFooter>
 * 
 * @param props - Component props
 * @param props.className - Optional CSS class name
 * @returns Card footer element
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot='card-footer'
            className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
            {...props}
        />
    )
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
