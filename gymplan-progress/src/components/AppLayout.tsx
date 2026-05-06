import { Outlet } from "react-router-dom";
import { BottomTabBar } from "./BottomTabBar";
import { StreakBanner } from "./StreakBanner";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <header
          className="sticky top-0 z-30 bg-background/80 px-4 pb-3 pt-4 backdrop-blur-md"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}
        >
          <StreakBanner />
        </header>
        <main className="flex-1 px-4 pb-28 pt-2">
          <Outlet />
        </main>
        <BottomTabBar />
      </div>
    </div>
  );
};
