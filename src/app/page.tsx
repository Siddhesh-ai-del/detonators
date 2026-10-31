import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import { getAllEntries } from "@/lib/content";

export default async function Home() {
  const entries = await getAllEntries();
  return (
    <main>
      <Hero />
      <Timeline entries={entries} />
      <Footer />
    </main>
  );
}