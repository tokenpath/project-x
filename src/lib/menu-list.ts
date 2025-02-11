import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  User,
  Award,
  Paintbrush,
  Link,
  Image,
  FileText
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "Account",
      menus: [
        {
          href: "",
          label: "Account",
          icon: User,
          submenus: [
            {
              href: "/dashboard/overview",
              label: "Overview"
            },
            {
              href: "/dashboard/badges",
              label: "Badges"
            },
            {
              href: "/dashboard/settings",
              label: "Settings"
            }
          ]
        }
      ]
    },
    {
      groupLabel: "Customization",
      menus: [
        {
          href: "/dashboard/customize",
          label: "Customize",
          icon: Paintbrush
        },
        {
          href: "/dashboard/links",
          label: "Links",
          icon: Link
        },
        {
          href: "/dashboard/imagehost",
          label: "Image Host",
          icon: Image
        },
        {
          href: "/dashboard/templates",
          label: "Templates",
          icon: FileText
        }
      ]
    }
  ];
}
