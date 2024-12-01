import { Outlet, Link } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const BlogLayout = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="col-span-full">
      <ResizablePanel className=" bg-slate-50">
        <aside>
          <ul>
            <li>
              <Link to="1">Articel 1</Link>
            </li>
            <li>
              <Link to="2">Articel 2</Link>
            </li>
            <li>
              <Link to="3">Articel 3</Link>
            </li>
          </ul>
        </aside>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="flex-1">
        <div>
          <Outlet />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default BlogLayout;
