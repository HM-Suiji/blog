'use client'

import {
  ArrowRightFromLine,
  Bell,
  ChartColumn,
  CircleQuestionMark,
  House,
  ListCheck,
  Search,
  Settings,
  TowelRack,
  User,
} from 'lucide-react'
import { Route } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { AppLayout, Navbar, Sidebar } from '@heroui-pro/react'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Label,
  Separator,
} from '@heroui/react'

import { siteConfig } from '@/config/site'

import { AccountAvatar } from '../auth/account'

export function DashContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <AppLayout
      navigate={href => router.push(href as Route)}
      navbar={<DashboardNavbar />}
      sidebar={<DashboardSidebar />}
    >
      <div className="p-6">{children}</div>
    </AppLayout>
  )
}

const BreadcrumbItems = [
  { icon: <House className="size-4" />, label: 'Dashboard' },
]

type NavItem = {
  icon: React.ElementType
  label: string
  href?: Route
  badge?: string
  items?: {
    label: string
    href?: Route
  }[]
}

const navItems: NavItem[] = [
  { icon: House, label: 'Dashboard', href: '/dashboard' },
  {
    icon: ChartColumn,
    items: [
      { label: 'Overview', href: '#' },
      { label: 'Reports', href: '#' },
      { label: 'Conversions', href: '#' },
    ],
    label: 'Analytics',
  },
  { badge: 'New', icon: TowelRack, label: 'Tracker' },
  {
    icon: ListCheck,
    items: [
      { label: 'General', href: '/dashboard/settings/general' },
      { label: 'Team', href: '#' },
      { label: 'Notifications', href: '/dashboard/settings/notifications' },
    ],
    label: 'Settings',
  },
]

function DashboardSidebar() {
  return (
    <>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <Avatar size="sm">
                <Avatar.Image src={siteConfig.avatar} />
                <Avatar.Fallback className="text-xs font-semibold">
                  {siteConfig.name.charAt(0)}
                </Avatar.Fallback>
              </Avatar>
            </div>
            <Link
              href="/"
              className="text-foreground text-sm font-semibold"
              data-sidebar="label"
            >
              {siteConfig.name}
            </Link>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu
              aria-label="Navigation"
              defaultExpandedKeys={['Analytics']}
            >
              {navItems.map(item => (
                <Sidebar.MenuItem
                  href={item.items ? undefined : item.href || '#'}
                  id={item.label}
                  isCurrent={item.label === 'Dashboard'}
                  key={item.label}
                  textValue={item.label}
                >
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>
                    {item.label}
                    {item.items ? (
                      <Sidebar.MenuTrigger>
                        <Sidebar.MenuIndicator />
                      </Sidebar.MenuTrigger>
                    ) : null}
                  </Sidebar.MenuLabel>
                  {item.badge ? (
                    <Sidebar.MenuChip>
                      <Chip color="success" size="sm" variant="soft">
                        {item.badge}
                      </Chip>
                    </Sidebar.MenuChip>
                  ) : null}
                  {item.items ? (
                    <Sidebar.Submenu>
                      {item.items.map(subitem => (
                        <Sidebar.MenuItem
                          href={subitem.href}
                          key={subitem.label}
                          id={`${item.label}-${subitem.label}`}
                          textValue={subitem.label}
                        >
                          <Sidebar.MenuLabel>{subitem.label}</Sidebar.MenuLabel>
                        </Sidebar.MenuItem>
                      ))}
                    </Sidebar.Submenu>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu aria-label="Footer actions">
            <Sidebar.MenuItem href="#" id="help" textValue="Help & Information">
              <Sidebar.MenuIcon>
                <CircleQuestionMark className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help & Information</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem href="#" id="logout" textValue="Log out">
              <Sidebar.MenuIcon>
                <ArrowRightFromLine className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Log out</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <Avatar>
                <Avatar.Fallback className="text-xs font-semibold">
                  {siteConfig.name.charAt(0)}
                </Avatar.Fallback>
              </Avatar>
            </div>
            <span className="text-foreground text-sm font-semibold">
              {siteConfig.name}
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu
              aria-label="Navigation"
              defaultExpandedKeys={['Analytics']}
            >
              {navItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href={item.items ? undefined : '#'}
                  id={item.label}
                  textValue={item.label}
                >
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>
                    {item.label}
                    {item.items ? (
                      <Sidebar.MenuTrigger>
                        <Sidebar.MenuIndicator />
                      </Sidebar.MenuTrigger>
                    ) : null}
                  </Sidebar.MenuLabel>
                  {item.badge ? (
                    <Sidebar.MenuChip>
                      <Chip color="success" size="sm" variant="soft">
                        {item.badge}
                      </Chip>
                    </Sidebar.MenuChip>
                  ) : null}
                  {item.items ? (
                    <Sidebar.Submenu>
                      {item.items.map(subitem => (
                        <Sidebar.MenuItem
                          key={subitem.label}
                          href={subitem.href}
                          id={`${item.label}-${subitem.label}`}
                          textValue={subitem.label}
                        >
                          <Sidebar.MenuLabel>{subitem.label}</Sidebar.MenuLabel>
                        </Sidebar.MenuItem>
                      ))}
                    </Sidebar.Submenu>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Mobile>
    </>
  )
}

function DashboardNavbar() {
  return (
    <Navbar maxWidth="full">
      <Navbar.Header>
        <AppLayout.MenuToggle />
        <Sidebar.Trigger />
        <Breadcrumbs className="min-w-0">
          {BreadcrumbItems.map((item, index) => (
            <Breadcrumbs.Item
              key={`${item.label}-${index}`}
              className="min-w-0 font-semibold"
            >
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </span>
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
        <Navbar.Spacer />
        <Navbar.Content>
          <Navbar.Item aria-label="Search">
            <Search className="size-4" />
          </Navbar.Item>
          <Navbar.Item aria-label="Notifications">
            <Bell className="size-4" />
          </Navbar.Item>
          <Navbar.Separator />
          <Dropdown>
            <Button isIconOnly aria-label="Account menu" variant="ghost">
              <AccountAvatar />
            </Button>
            <Dropdown.Popover className="min-w-50" placement="bottom end">
              <Dropdown.Menu>
                <Dropdown.Item id="account" textValue="Account">
                  <User className="text-muted size-4" />
                  <Label>Account</Label>
                </Dropdown.Item>
                <Dropdown.Item id="settings" textValue="Settings">
                  <Settings className="text-muted size-4" />
                  <Label>Settings</Label>
                </Dropdown.Item>
                <Separator />
                <Dropdown.Item id="sign-out" textValue="Log out">
                  <ArrowRightFromLine className="text-muted size-4" />
                  <Label>Log out</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}
