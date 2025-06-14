"use client"

import { gsap } from "gsap"

// GSAP Animation Utilities for ZEO Client
export class ZeoAnimations {
  static timeline = gsap.timeline

  // Splash Screen Animation Sequence
  static animateSplashScreen(): Promise<void> {
    return new Promise((resolve) => {
      const tl = gsap.timeline()

      // Animate logo title
      tl.to(".splash-title", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        // Animate underline expansion
        .to(
          ".splash-underline",
          {
            width: "120px",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        )
        // Animate tagline
        .to(
          ".splash-tagline",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )
        // Show loader
        .to(
          ".splash-loader",
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        )
        // Wait for effect
        .to({}, { duration: 2 })
        // Complete
        .call(() => resolve())
    })
  }

  // Section Transition Animations
  static transitionOut(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(element, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => resolve(),
      })
    })
  }

  static transitionIn(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => resolve(),
        },
      )
    })
  }

  // Button Hover Animations
  static setupButtonAnimations(selector: string) {
    const buttons = document.querySelectorAll(selector)

    buttons.forEach((button) => {
      const element = button as HTMLElement

      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      element.addEventListener("mousedown", () => {
        gsap.to(element, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
        })
      })

      element.addEventListener("mouseup", () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.1,
          ease: "power2.out",
        })
      })
    })
  }

  // Progress Bar Animation
  static animateProgress(element: HTMLElement, progress: number) {
    gsap.to(element, {
      width: `${progress}%`,
      duration: 0.8,
      ease: "power2.out",
    })
  }

  // Text Content Animation
  static animateTextContent(element: HTMLElement, delay = 0) {
    gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        delay,
        ease: "power2.out",
      },
    )
  }

  // Entrance Animations for Main App
  static initializeMainAppAnimations() {
    gsap.set([".zeo-header", ".zeo-upload-card"], { opacity: 0, y: 30 })

    const tl = gsap.timeline()
    tl.to(".zeo-header", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }).to(
      ".zeo-upload-card",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    )
  }

  // Splash to Main App Transition
  static transitionSplashToMain(splashElement: HTMLElement, mainElement: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(splashElement, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => {
          splashElement.style.display = "none"

          // Show main app
          mainElement.style.opacity = "1"
          mainElement.style.visibility = "visible"

          // Animate main app entrance
          gsap.fromTo(
            mainElement,
            { opacity: 0, scale: 1.05 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              onComplete: () => resolve(),
            },
          )
        },
      })
    })
  }
}
