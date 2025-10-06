import { Sidebar } from "@/components/layout/sidebar";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
        <div className="fixed bottom-6 right-6 z-50">
          <Button asChild size="icon" className="w-14 h-14 rounded-full shadow-lg">
            <Link href="/chatbot">
              <Bot className="w-7 h-7" />
              <span className="sr-only">AI Coach</span>
            </Link>
          </Button>
        </div>
    </div>
  );
}
