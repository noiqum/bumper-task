import NavigationLink from "@/components/NavigationLink/NavigationLink";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className=" flex-1" >
        <NavigationLink to="/about" label="About" active />
      </main>
      <footer >

      </footer>
    </div>
  );
}
