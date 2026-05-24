'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv').forEach((el, i) => {
      el.style.transitionDelay = (i % 5) * 70 + 'ms'
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return null
}
