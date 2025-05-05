import TextConverter from "@/components/TextConverter";
import ImageConverter from "@/components/ImageConverter";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Base64 Converter</h1>
        <p className="text-gray-600">
          Convert text and images to Base64 and back
        </p>
      </div>

      <div className="space-y-10">
        <TextConverter />
        <ImageConverter />
      </div>

      <footer className="mt-10 text-center text-gray-500 text-sm">
        <p>© 2025 Base64 Converter - Made by Peterxyjz</p>
      </footer>
    </main>
  );
}
