"use client"
import { Breadcrumbs } from "@/components/navigation/breadcrumbs"
import { PageHeader } from "@/components/navigation/page-header"
import { PageWrapper } from "@/components/navigation/page-wrapper"
import { Button } from "@workspace/ui/components/button"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  // Sample data for demonstration
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { label: params.slug }
  ]

  return (
    <PageWrapper
      header={<Breadcrumbs items={breadcrumbItems} />}
      breadcrumbs={breadcrumbItems}
    >
      <PageHeader
        title={params.slug}
        description="Manage your project's details such as name, image, description and settings."
        actions={
          <div className='flex gap-2'>
            <Button variant='outline'>Share</Button>
            <Button variant='outline'>View</Button>
            <Button variant='outline'>Edit</Button>
            <Button>Publish</Button>
          </div>
        }
      />

      <div className='mt-6'>{/* Project content would go here */}</div>
    </PageWrapper>
  )
}
