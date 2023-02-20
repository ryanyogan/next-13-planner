import { Card } from "./card";
import { SidebarLink } from "./sidebar-link";

export type SidebarLinkType = {
  label: string;
  icon: string;
  link: string;
};

const links: SidebarLinkType[] = [
  {
    label: "Home",
    icon: "Grid",
    link: "/home",
  },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  {
    label: "Profile",
    icon: "User",
    link: "/profile",
  },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

export function Sidebar() {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {links.map((link) => (
        <SidebarLink key={link.link} link={link} />
      ))}
    </Card>
  );
}
