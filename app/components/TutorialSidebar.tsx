'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface Section {
  id: string
  title: string
  subsections?: { id: string; title: string }[]
}

interface TutorialSidebarProps {
  sections: Section[]
}

export function TutorialSidebar({ sections }: TutorialSidebarProps) {
  const [activeSection, setActiveSection] = useState(() => {
    return sections[0]?.subsections?.[0]?.id || sections[0]?.id || ''
  })
  const [activeParentSection, setActiveParentSection] = useState(() => {
    return sections[0]?.id || ''
  })

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const sortedEntries = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => {
        const rectA = a.boundingClientRect
        const rectB = b.boundingClientRect
        return rectA.top - rectB.top
      })

    if (sortedEntries.length > 0) {
      const topEntry = sortedEntries[0]
      const sectionId = topEntry.target.id

      const parentSection = sections.find(section => 
        section.id === sectionId || section.subsections?.some(sub => sub.id === sectionId)
      )

      if (parentSection) {
        setActiveParentSection(parentSection.id)
        
        if (sectionId === parentSection.id) {
          const firstSubsection = parentSection.subsections?.[0]
          if (firstSubsection) {
            setActiveSection(firstSubsection.id)
          } else {
            setActiveSection(sectionId)
          }
        } else {
          setActiveSection(sectionId)
        }
      }
    }
  }, [sections])

  useEffect(() => {
    const observerOptions = {
      threshold: [0.1, 0.5, 0.9],
      rootMargin: '-20px 0px -20px 0px',
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    sections.forEach(section => {
      const sectionElement = document.getElementById(section.id)
      if (sectionElement) {
        observer.observe(sectionElement)
      }

      section.subsections?.forEach(subsection => {
        const subsectionElement = document.getElementById(subsection.id)
        if (subsectionElement) {
          observer.observe(subsectionElement)
        }
      })
    })

    return () => observer.disconnect()
  }, [sections, handleIntersection])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, isParent: boolean) => {
    e.preventDefault()
    const element = document.getElementById(id)
    
    if (element) {
      const section = isParent 
        ? sections.find(s => s.id === id)
        : sections.find(s => s.subsections?.some(sub => sub.id === id))

      if (section) {
        setActiveParentSection(section.id)
        
        if (isParent && section.subsections?.[0]) {
          setActiveSection(section.subsections[0].id)
        } else {
          setActiveSection(id)
        }
      }

      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav 
      className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-gray-100 p-4 overflow-y-auto" 
      aria-label="Tutorial navigation"
    >
      <ul className="space-y-2">
        {sections.map(section => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id, true)}
              className={`block p-2 rounded transition-colors duration-200 ${
                activeParentSection === section.id 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-200'
              }`}
              aria-current={activeParentSection === section.id ? 'true' : undefined}
            >
              {section.title}
            </a>
            {section.subsections && (
              <ul className="ml-4 mt-2 space-y-1">
                {section.subsections.map(subsection => (
                  <li key={subsection.id}>
                    <a
                      href={`#${subsection.id}`}
                      onClick={(e) => handleClick(e, subsection.id, false)}
                      className={`block p-1 rounded text-sm transition-colors duration-200 ${
                        activeSection === subsection.id 
                          ? 'bg-blue-300 text-white' 
                          : 'hover:bg-gray-200'
                      }`}
                      aria-current={activeSection === subsection.id ? 'true' : undefined}
                    >
                      {subsection.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TutorialSidebar