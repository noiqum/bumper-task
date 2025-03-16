import NavigationLink from "@/components/NavigationLink/NavigationLink";
import Hero from "@/components/Hero/Hero";
import ValueSection from "@/components/ValueSection/ValueSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className=" flex-1" >
        <Hero />
        <ValueSection />
      </main>
    </div>
  );
}
