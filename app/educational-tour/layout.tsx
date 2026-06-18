import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Educational Tour — Cebu & Bohol Industry Visits",
  description:
    "A collection of educational experiences and industry visits across Cebu and Bohol, including Rivan IT, Mata Technologies, UP Cebu Business Incubator, Dynata Philippines, and T.A.R.S.I.E.R. 117.",
  openGraph: {
    title: "Educational Tour — Cebu & Bohol Industry Visits",
    description:
      "Explore industry visits to tech companies and innovation hubs across Cebu and Bohol, Philippines.",
    url: "https://josephmanigo.dev/educational-tour",
  },
  alternates: {
    canonical: "https://josephmanigo.dev/educational-tour",
  },
}

export default function EducationalTourLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
