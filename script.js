// DOM Elements
const profileImg = document.getElementById("profileImg")
const socialLinks = document.querySelectorAll(".social-link")
const expertiseCards = document.querySelectorAll(".expertise-card")
const shapes = document.querySelectorAll(".shape")

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  setupInteractions()
  createParticleEffect()
})

// Initialize page animations
function initializeAnimations() {
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  }, observerOptions)

  // Observe all animated elements
  document.querySelectorAll(".hero, .social-links, .expertise").forEach((el) => {
    observer.observe(el)
  })
}

// Setup interactive elements
function setupInteractions() {
  // Profile image hover effect
  profileImg.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) rotate(5deg)"
  })

  profileImg.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)"
  })

  // Social links click tracking and effects
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const platform = this.dataset.platform

      // Add click effect
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)

      // Create ripple effect
      createRippleEffect(this, e)

      // Log interaction (you can replace with actual analytics)
      console.log(`Clicked on ${platform} link`)

      // Here you would normally redirect to the actual URL
      // window.open('your-actual-url', '_blank');
    })

    // Add hover sound effect (optional)
    link.addEventListener("mouseenter", () => {
      // You can add a subtle sound effect here
      playHoverSound()
    })
  })

  // Expertise cards interaction
  expertiseCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add glow effect to other cards
      expertiseCards.forEach((otherCard) => {
        if (otherCard !== this) {
          otherCard.style.opacity = "0.7"
        }
      })
    })

    card.addEventListener("mouseleave", () => {
      // Remove glow effect
      expertiseCards.forEach((otherCard) => {
        otherCard.style.opacity = "1"
      })
    })
  })
}

// Create ripple effect on click
function createRippleEffect(element, event) {
  const ripple = document.createElement("div")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `

  element.style.position = "relative"
  element.appendChild(ripple)

  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// Add ripple animation CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Create floating particle effect
function createParticleEffect() {
  const particleContainer = document.createElement("div")
  particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `
  document.body.appendChild(particleContainer)

  // Create particles
  for (let i = 0; i < 20; i++) {
    createParticle(particleContainer)
  }
}

function createParticle(container) {
  const particle = document.createElement("div")
  const size = Math.random() * 4 + 2
  const x = Math.random() * window.innerWidth
  const y = Math.random() * window.innerHeight
  const duration = Math.random() * 20 + 10

  particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: particleFloat ${duration}s infinite linear;
    `

  container.appendChild(particle)

  // Remove and recreate particle after animation
  setTimeout(() => {
    particle.remove()
    createParticle(container)
  }, duration * 1000)
}

// Add particle animation CSS
const particleStyle = document.createElement("style")
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(particleStyle)

// Hover sound effect (optional - requires audio file)
function playHoverSound() {
  // Uncomment and add audio file if desired
  // const audio = new Audio('hover-sound.mp3');
  // audio.volume = 0.1;
  // audio.play().catch(e => console.log('Audio play failed:', e));
}

// Smooth scrolling for any internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Performance optimization: Throttle scroll events
let ticking = false

function updateAnimations() {
  // Update floating shapes position based on scroll
  const scrolled = window.pageYOffset
  const rate = scrolled * -0.5

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1
    shape.style.transform = `translateY(${rate * speed}px)`
  })

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimations)
    ticking = true
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Trigger entrance animations
  setTimeout(() => {
    document.querySelector(".hero").style.opacity = "1"
    document.querySelector(".hero").style.transform = "translateY(0)"
  }, 100)
})

// Add CSS for loading state
const loadingStyle = document.createElement("style")
loadingStyle.textContent = `
    body:not(.loaded) .hero {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid rgba(255, 255, 255, 0.8);
        outline-offset: 2px;
    }
`
document.head.appendChild(loadingStyle)

// Create animated network connections
function createNetworkConnections() {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `

  document.body.appendChild(canvas)

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Network nodes
  const nodes = []
  const nodeCount = 50

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    })
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw nodes
    nodes.forEach((node) => {
      // Update position
      node.x += node.vx
      node.y += node.vy

      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1

      // Draw node
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(59, 130, 246, ${node.opacity})`
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = "#3b82f6"
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // Draw connections
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((otherNode) => {
        const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))

        if (distance < 150) {
          const opacity = ((150 - distance) / 150) * 0.3
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })
    })

    requestAnimationFrame(animate)
  }

  animate()
}

// Initialize network animation
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  setupInteractions()
  createNetworkConnections() // Add this line
})
