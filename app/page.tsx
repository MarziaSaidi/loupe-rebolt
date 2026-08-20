import { TopBar } from "@/components/top-bar";
import { Workspace } from "@/components/workspace";

export default function Page() {
  return (
    <div className="min-h-screen bg-canvas">
      <TopBar />
      <Workspace />
    </div>
  );
}
