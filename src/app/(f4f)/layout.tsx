import { Footer } from "@/src/components/footer";
import { Navigation } from "@/src/components/navigation";

export default function F4FLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
