
import { Home, Search, Book, MapPin, MessageSquare, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Browse", url: "/properties", icon: Search },
  { title: "My Listings", url: "/add-listing", icon: Book },
  { title: "Saved", url: "/saved", icon: MapPin },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-2 py-2 px-3 rounded hover:bg-accent ${location.pathname === item.url ? "bg-accent font-bold" : ""}`}
                  >
                    <item.icon size={20} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

