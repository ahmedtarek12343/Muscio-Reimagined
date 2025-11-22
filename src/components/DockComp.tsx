import { NavLink } from "react-router";
import { Dock, DockIcon, DockItem, DockLabel } from "./motion-primitives/dock";
import { dockData } from "@/constants/constants";

const DockComp = () => {
  return (
    <div className="fixed bottom-6 z-50 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3 border-2 border-[#1ED760]">
        {dockData.map((item, idx) => (
          <NavLink
            key={item.title}
            to={item.href}
            className={
              ({ isActive }) =>
                isActive
                  ? "text-[#1ED760]" // active styles
                  : "" // default styles
            }
            viewTransition
          >
            <DockItem
              key={idx}
              className="aspect-square rounded-full cursor-pointer bg-gray-200 dark:bg-neutral-800"
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <item.icon />
              </DockIcon>
            </DockItem>
          </NavLink>
        ))}
      </Dock>
    </div>
  );
};

export default DockComp;
