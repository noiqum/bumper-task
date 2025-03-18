
import Hero from "@/components/Hero/Hero";
import ValueSection from "@/components/ValueSection/ValueSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E5E5E5]">
      <main className="flex-1 max-w-[1440px] mx-auto flex flex-col items-center" >
        <Hero />
        <ValueSection />
      </main>
    </div>
  );
}
