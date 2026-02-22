"use client"

import { motion, AnimatePresence } from "framer-motion"
import { BackgroundRays } from "@/components/background-rays"
import { ArrowLeft, MapPin, Calendar, BookOpen, X, Images } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { TourLoadingScreen } from "@/components/tour-loading-screen"

const cebuTours = [
  {
    id: 1,
    title: "Rivan IT Cebu (RivanCyber)",
    location: "Rivan IT Building, Englis St., V. Rama Ave., Cebu City, Philippines",
    date: "November 2025",
    description:
      "Visited RivanCyber, an IT training and innovation institution dedicated to developing industry-ready professionals through specialized programs in Cybersecurity, Network Engineering, and DevOps.",
    image: "/images/122.jpg",
    journalImage: "/images/journals/rivan-journal.png",
    highlights: ["Cybersecurity", "Network Engineering", "DevOps"],
  },
  {
    id: 2,
    title: "Mata Technologies, Inc.",
    location: "2F Cardoc Building, General Maxilom Ave, Cebu City, Philippines",
    date: "November 2025",
    description:
      "Visited Mata Technologies, a Philippine-based technology company delivering immersive virtual tours and VR mapping solutions for real estate and tourism, showcasing destinations through interactive 360° experiences.",
    image: "/images/485142174-1067866778700151-6774309248158753332-n.jpg",
    journalImage: "/images/journals/mata-journal.png",
    highlights: ["Virtual Tours", "VR Mapping", "360° Experiences"],
  },
  {
    id: 3,
    title: "UP Cebu Business Incubator for IT (CeBu InIT)",
    location: "UP Cebu, Cebu City",
    date: "November 2025",
    description:
      "Visited the UP Cebu Business Incubator for IT (CeBu InIT), a DOST-supported innovation hub that accelerates technology startups through mentorship, business development, and access to academic and research resources.",
    image: "/images/up-cebu-incubator.png",
    journalImage: "/images/journals/upcebu-journal.png",
    highlights: ["Innovation Hub", "Startup Acceleration", "DOST-Supported"],
  },
  {
    id: 4,
    title: "Dynata Philippines Inc.",
    location: "MEPZ 2, Basak, Lapu-Lapu City",
    date: "November 2025",
    description:
      "Visited Dynata Philippines, a global data and insights company providing advanced platforms for consumer and B2B analytics, audience targeting, and data-driven marketing solutions.",
    image: "/images/dynata-office.png",
    journalImage: "/images/journals/dynata-journal.png",
    highlights: ["Data Analytics", "B2B Insights", "Marketing Solutions"],
  },
]

const boholTours = [
  {
    id: 5,
    title: "T.a.R.S.I.E.R. 117 (Tourist Assistance and Rescue Section)",
    location: "Tagbilaran City, Bohol",
    date: "November 2025",
    description:
      "Visited T.A.R.S.I.E.R. 117, an emergency response and disaster management unit of the Provincial Government of Bohol, providing 24/7 rescue, medical assistance, and disaster response services to ensure public and tourist safety.",
    image: "/images/tarsier-command-center.png",
    journalImage: "/images/journals/tarsier-journal.png",
    highlights: ["Emergency Response", "Disaster Management", "Public Safety"],
  },
]

function JournalModal({
  isOpen,
  onClose,
  journalImage,
  title,
}: { isOpen: boolean; onClose: () => void; journalImage: string; title: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-3xl w-full max-h-[90vh] overflow-auto bg-card rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-card/95 backdrop-blur-sm border-b border-border">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Journal Notes - {title}
              </h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <Image
                src={journalImage || "/placeholder.svg"}
                alt={`Journal notes for ${title}`}
                width={800}
                height={1000}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TourCard({ tour, index }: { tour: (typeof cebuTours)[0]; index: number }) {
  const [isJournalOpen, setIsJournalOpen] = useState(false)

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
        className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
      >
        {/* Image */}
        <motion.div
          className="w-full md:w-1/2 relative overflow-hidden rounded-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-video relative">
            <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-foreground"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {tour.title}
            </motion.h3>

            <motion.button
              onClick={() => setIsJournalOpen(true)}
              className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:from-amber-500/30 hover:to-orange-500/30 transition-all group"
              whileHover={{ scale: 1.05, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              title="View Journal Notes"
            >
              <BookOpen className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors" />
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {tour.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {tour.date}
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">{tour.description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {tour.highlights.map((highlight, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border"
              >
                {highlight}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>

      {/* Journal Modal */}
      <JournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        journalImage={tour.journalImage}
        title={tour.title}
      />
    </>
  )
}

export default function EducationalTourPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0)
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <TourLoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      <main
        className={`min-h-screen bg-background relative overflow-hidden ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
      >
        <BackgroundRays />

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </motion.header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {"Educational Tour".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="inline-block"
                  whileHover={{
                    scale: 1.1,
                    color: "#60a5fa",
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              A collection of educational experiences and industry visits that have shaped my understanding of
              technology and professional development.
            </motion.p>
          </motion.div>

          {/* CEBU Tour Cards */}
          <div className="mb-20">
            <div className="grid gap-8 md:gap-12">
              {cebuTours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </div>
          </div>

          {/* BOHOL Tour Cards */}
          <div>
            <div className="grid gap-8 md:gap-12">
              {boholTours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 py-16 md:py-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5", label: "Companies Visited" },
              { value: "2", label: "Provinces Explored" },
              { value: "50+", label: "Industry Professionals Met" },
              { value: "100+", label: "Hours of Learning" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tour Gallery CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 py-16 md:py-24"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 md:p-12">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">View Tour Memories</h2>
                <p className="text-muted-foreground max-w-md">
                  Explore our visual journey through Cebu and Bohol with an immersive gallery experience.
                </p>
              </div>
              <Link
                href="/tour-gallery"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
              >
                <Images className="w-5 h-5" />
                <span>View Gallery</span>
              </Link>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </footer>
      </main>
    </>
  )
}
