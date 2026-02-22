"use client"

import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { X, ExternalLink } from "lucide-react"
import { Autoplay, EffectCreative } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useRef, useState, useMemo } from "react"
import "swiper/css"
import "swiper/css/effect-creative"
import "swiper/css/autoplay"

const certificates = [
  {
    image: "/images/codechum-info-management.png",
    alt: "CodeChum Information Management Certificate",
    title: "Information Management",
    description:
      "Certificate of Completion from CodeChum for the Information Management course (CC105-2C). Achieved a total score of 1082/1130, demonstrating proficiency in database concepts, MySQL, data organization, and information systems management.",
    issued: "May 17, 2025",
    issuer: "CodeChum",
    score: "1082/1130",
    credentialsUrl: "https://hcdc.codechum.com/certificates/11022",
  },
  {
    image: "/images/educational-tour-certificate.png",
    alt: "Educational Tour Certificate",
    title: "Educational Tour - Cebu & Bohol",
    description:
      "Certificate of Completion for the Educational Tour in Cebu and Bohol (November 12-15, 2025). Visited multiple IT companies including UP Cebu Business Incubator for IT, Dynata Philippines Inc., Rivan IT Cebu, Mata Technologies Inc., and Telephone and Radio System Integrated Emergency Response. Gained valuable industry exposure and practical insights into the IT sector.",
    issued: "November 15, 2025",
    issuer: "World of Adventures Travel and Tours",
    location: "Cebu City, Philippines",
  },
]

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (Math.abs(currentScrollY - lastScrollY) < 10) return

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return scrollDirection
}

export function CertificatesSection() {
  const scrollDirection = useScrollDirection()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [animationDirection, setAnimationDirection] = useState<"up" | "down">("down")

  const isInView = useInView(sectionRef, { amount: 0.2, once: false, margin: "-50px" })
  const headerInView = useInView(headerRef, { once: false, margin: "-50px", amount: 0.3 })
  const controls = useAnimation()
  const headerControls = useAnimation()
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[0] | null>(null)

  useEffect(() => {
    if (isInView) {
      setAnimationDirection(scrollDirection)
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  useEffect(() => {
    if (headerInView) {
      setAnimationDirection(scrollDirection)
      headerControls.start("visible")
    } else {
      headerControls.start("hidden")
    }
  }, [headerInView, headerControls])

  const headerVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: animationDirection === "down" ? -80 : 80,
        scale: 0.85,
        rotateX: animationDirection === "down" ? 35 : -35,
        filter: "blur(15px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 12,
          duration: 0.9,
        },
      },
    }),
    [animationDirection],
  )

  const iconVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0,
        rotate: animationDirection === "down" ? -540 : 540,
        rotateY: animationDirection === "down" ? 180 : -180,
        y: animationDirection === "down" ? -50 : 50,
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        rotateY: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 12,
        },
      },
    }),
    [animationDirection],
  )

  const subtitleVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: animationDirection === "down" ? 50 : -50,
        scale: 0.9,
        filter: "blur(12px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 12,
          delay: 0.2,
        },
      },
    }),
    [animationDirection],
  )

  const carouselVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0.85,
        y: animationDirection === "down" ? 80 : -80,
        rotateX: animationDirection === "down" ? 15 : -15,
        filter: "blur(10px)",
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.3,
        },
      },
    }),
    [animationDirection],
  )

  const css = `
    .certificates-carousel {
      width: 100%;
      height: auto;
      padding: 20px 0 !important;
    }
    
    .certificates-carousel .swiper-slide {
      background-position: center;
      background-size: cover;
      border-radius: 16px;
      cursor: pointer;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }

    @media (min-width: 640px) {
      .certificates-carousel .swiper-slide {
        border-radius: 25px;
      }
    }

    .certificates-carousel .swiper-slide:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
  `

  return (
    <section ref={sectionRef} id="certificates" className="py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20" style={{ perspective: "1200px" }} ref={headerRef}>
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate={headerControls}
            className="inline-flex items-center justify-center mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
            </div>
          </motion.div>

          <motion.h2
            variants={headerVariants}
            initial="hidden"
            animate={headerControls}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance text-foreground"
            style={{ transformStyle: "preserve-3d" }}
          >
            Certificates
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={headerControls}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-4"
          >
            Continuous learning and professional development
          </motion.p>
        </div>

        <motion.div
          variants={carouselVariants}
          initial="hidden"
          animate={controls}
          className="relative w-full max-w-4xl mx-auto px-2 sm:px-5"
          style={{ perspective: "2000px" }}
        >
          <style>{css}</style>

          <Swiper
            spaceBetween={0}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            effect="creative"
            grabCursor={true}
            slidesPerView="auto"
            centeredSlides={true}
            loop={true}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            className="certificates-carousel"
            modules={[EffectCreative, Autoplay]}
          >
            {certificates.map((cert, index) => (
              <SwiperSlide key={index} onClick={() => setSelectedCert(cert)}>
                <div className="h-full w-full relative group">
                  <img
                    className="w-full rounded-2xl sm:rounded-3xl object-contain"
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.alt}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-background rounded-xl sm:rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
                className="aspect-video w-full"
              >
                <img
                  src={selectedCert.image || "/placeholder.svg"}
                  alt={selectedCert.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="p-4 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                  className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-3"
                >
                  {selectedCert.issuer}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2"
                >
                  {selectedCert.title}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                  className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4"
                >
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-foreground">Issued:</span> {selectedCert.issued}
                  </span>
                  {selectedCert.score && (
                    <span className="flex items-center gap-1">
                      <span className="font-medium text-foreground">Score:</span>
                      <span className="text-primary font-semibold">{selectedCert.score}</span>
                    </span>
                  )}
                  {selectedCert.location && (
                    <span className="flex items-center gap-1">
                      <span className="font-medium text-foreground">Location:</span> {selectedCert.location}
                    </span>
                  )}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                >
                  {selectedCert.description}
                </motion.p>

                {selectedCert.credentialsUrl && (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                    href={selectedCert.credentialsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    View Credentials
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
