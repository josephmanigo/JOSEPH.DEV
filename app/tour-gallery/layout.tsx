import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tour Gallery — Cebu & Bohol Memories",
  description:
    "A visual gallery of memories from the educational tour across Cebu and Bohol in November 2025. Photos from company visits and cultural experiences.",
  openGraph: {
    title: "Tour Gallery — Cebu & Bohol Memories",
    description:
      "Browse photos from educational industry visits in Cebu and Bohol, Philippines.",
    url: "https://josephmanigo.dev/tour-gallery",
  },
  alternates: {
    canonical: "https://josephmanigo.dev/tour-gallery",
  },
}

export default function TourGalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
