"use client"

import { AppLayout } from "@/components/navigation/app-layout"
import { PageHeader } from "@/components/navigation/page-header"
import { PageWrapper } from "@/components/navigation/page-wrapper"
import { RoleBasedNav } from "@/components/navigation/role-based-nav"
import { useNavigationAnalytics } from "@/hooks/use-navigation-analytics"
import { Button } from "@workspace/ui/components/button"
import {
  BarChart,
  Bell,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Zap
} from "lucide-react"
import { Suspense, useState } from "react"

// Separate component that uses useNavigationAnalytics
function NavigationTracker() {
  // Track navigation for analytics
  useNavigationAnalytics({
    onNavigate: (url) => {
      console.log(`Navigation tracked: ${url}`)
    }
  })

  return null
}

export default function DemoPage() {
  const [userRoles, setUserRoles] = useState<string[]>(["user"])

  // Top navigation configuration
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
      {
        href: "/orders",
        label: "Orders",
        icon: <ShoppingCart className='h-4 w-4' />
      },
      {
        href: "/products",
        label: "Products",
        icon: <Package className='h-4 w-4' />
      },
      {
        href: "/customers",
        label: "Customers",
        icon: <Users className='h-4 w-4' />
      },
      {
        href: "/settings",
        label: "Settings",
        icon: <Settings className='h-4 w-4' />
      }
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

  // Sidebar navigation configuration
  const sidebarProps = {
    items: [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard className='h-4 w-4' />
      },
      {
        href: "/orders",
        label: "Orders",
        icon: <ShoppingCart className='h-4 w-4' />,
        badge: (
          <span className='rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground'>
            New
          </span>
        )
      },
      {
        href: "/products",
        label: "Products",
        icon: <Package className='h-4 w-4' />,
        children: [
          {
            href: "/products/physical",
            label: "Physical Products",
            icon: <Package className='h-4 w-4' />
          },
          {
            href: "/products/digital",
            label: "Digital Products",
            icon: <FileText className='h-4 w-4' />
          }
        ]
      },
      {
        href: "/customers",
        label: "Customers",
        icon: <Users className='h-4 w-4' />
      },
      {
        href: "/analytics",
        label: "Analytics",
        icon: <BarChart className='h-4 w-4' />
      },
      {
        href: "/billing",
        label: "Billing",
        icon: <CreditCard className='h-4 w-4' />
      },
      {
        href: "/settings",
        label: "Settings",
        icon: <Settings className='h-4 w-4' />,
        children: [
          {
            href: "/settings/profile",
            label: "Profile",
            icon: <Users className='h-4 w-4' />
          },
          {
            href: "/settings/notifications",
            label: "Notifications",
            icon: <Bell className='h-4 w-4' />
          }
        ]
      },
      {
        href: "/help",
        label: "Help & Support",
        icon: <HelpCircle className='h-4 w-4' />
      }
    ]
  }

  // Role-based navigation items
  const roleBasedItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className='h-4 w-4' />
    },
    {
      href: "/orders",
      label: "Orders",
      icon: <ShoppingCart className='h-4 w-4' />
    },
    {
      href: "/admin",
      label: "Admin Panel",
      icon: <Settings className='h-4 w-4' />,
      allowedRoles: ["admin"]
    },
    {
      href: "/reports",
      label: "Reports",
      icon: <FileText className='h-4 w-4' />,
      allowedRoles: ["admin", "manager"]
    }
  ]

  return (
    <AppLayout
      topNavProps={topNavProps}
      sidebarProps={sidebarProps}
      collapsibleSidebar={true}
      defaultCollapsed={false}
    >
      {/* Wrap the component using useSearchParams in Suspense */}
      <Suspense fallback={null}>
        <NavigationTracker />
      </Suspense>

      <PageWrapper>
        <PageHeader
          title='Navigation Components Demo'
          description='Explore the enhanced navigation components for Next.js and React'
          actions={
            <div className='flex gap-2'>
              <Button variant='outline'>View Code</Button>
              <Button>Get Started</Button>
            </div>
          }
        />

        <div className='mt-8 grid gap-8'>
          <div className='rounded-lg border p-6'>
            <h2 className='text-xl font-semibold mb-4'>
              Role-Based Navigation
            </h2>
            <p className='mb-4 text-muted-foreground'>
              This navigation only shows items the user has permission to access
              based on their roles.
            </p>

            <div className='mb-4 flex flex-wrap gap-2'>
              <Button
                variant={userRoles.includes("user") ? "default" : "outline"}
                size='sm'
                onClick={() => {
                  if (userRoles.includes("user")) {
                    setUserRoles(userRoles.filter((r) => r !== "user"))
                  } else {
                    setUserRoles([...userRoles, "user"])
                  }
                }}
              >
                User Role
              </Button>
              <Button
                variant={userRoles.includes("manager") ? "default" : "outline"}
                size='sm'
                onClick={() => {
                  if (userRoles.includes("manager")) {
                    setUserRoles(userRoles.filter((r) => r !== "manager"))
                  } else {
                    setUserRoles([...userRoles, "manager"])
                  }
                }}
              >
                Manager Role
              </Button>
              <Button
                variant={userRoles.includes("admin") ? "default" : "outline"}
                size='sm'
                onClick={() => {
                  if (userRoles.includes("admin")) {
                    setUserRoles(userRoles.filter((r) => r !== "admin"))
                  } else {
                    setUserRoles([...userRoles, "admin"])
                  }
                }}
              >
                Admin Role
              </Button>
            </div>

            <div className='rounded-md border p-4'>
              <p className='mb-2 text-sm text-muted-foreground'>
                Current roles: {userRoles.join(", ") || "None"}
              </p>
              <RoleBasedNav
                items={roleBasedItems}
                userRoles={userRoles}
                className='space-y-1'
              />
            </div>
          </div>
        </div>
      </PageWrapper>
    </AppLayout>
  )
}
