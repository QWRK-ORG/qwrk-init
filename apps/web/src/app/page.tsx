"use client"

import { Breadcrumbs } from "@/components/navigation/breadcrumbs"
import { PageHeader } from "@/components/navigation/page-header"
import { PageWrapper } from "@/components/navigation/page-wrapper"
import { useNavigationStore } from "@/stores/navigation-store"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@workspace/ui/components/card"
import { useEffect } from "react"
// Import card components

// Component to display the navigation store state
function NavigationStoreDisplay() {
  // Get the entire navigation store state
  const navigationState = useNavigationStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Navigation Store State</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <h4 className='font-medium mb-2'>Breadcrumbs:</h4>
            <pre className='bg-muted p-3 rounded-md overflow-auto text-sm'>
              {JSON.stringify(navigationState.breadcrumbs, null, 2)}
            </pre>
          </div>

          {/* Add more navigation store state properties here as needed */}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/settings", label: "Settings" },
    { label: "Profile details" }
  ]

  const setBreadcrumbs = useNavigationStore((state) => state.setBreadcrumbs)

  // Set breadcrumbs in the store
  useEffect(() => {
    setBreadcrumbs(breadcrumbItems)
  }, [setBreadcrumbs])

  return (
    <PageWrapper header={<Breadcrumbs items={breadcrumbItems} />}>
      <PageHeader
        title='Profile details'
        description='Manage your profile details such as name, avatar, email and bio.'
        actions={
          <div className='flex gap-2'>
            <Button variant='outline'>View</Button>
            <Button variant='outline'>Edit</Button>
            <Button>Save</Button>
          </div>
        }
      />

      <div className='space-y-4'>
        {/* Navigation Store State Display */}
        <NavigationStoreDisplay />

        {/* Other slots */}
        {[2, 3].map((i) => (
          <div
            key={i}
            className='rounded-md border border-dashed border-muted-foreground/20 bg-muted/20 p-8 text-center text-muted-foreground'
          >
            Slot (swap it with your content)
          </div>
        ))}
      </div>
    </PageWrapper>
  )
}
