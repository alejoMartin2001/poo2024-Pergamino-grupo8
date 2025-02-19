import { PreviewContent, PreviewFeatures, PreviewFooter } from "@components/preview"
import { Header } from "@shared/header/Header"

export const Preview = () => {
  return (
    <div className="w-full min-h-screen bg-[#1A1B25]">
      <Header />
      <PreviewContent />
      <PreviewFeatures />
      <PreviewFooter />
    </div>
  )
}