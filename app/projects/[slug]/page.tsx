import Link from 'next/link'
import {notFound} from 'next/navigation'
import {ArrowLeft, ArrowUpRight, Code2, Server} from 'lucide-react'

import {getProjectBySlug} from '../data'
import type {
  ProjectDetailBlockProps,
  ProjectPageProps,
  ProjectProps,
} from '../types'

// Keep individual project pages in sync with their Sanity documents.
export const dynamic = 'force-dynamic'

function ProjectHeroMedia({project}: ProjectProps) {
  const imageUrl = project.featuredImage?.asset?.url

  if (imageUrl) {
    return (
      <div
        role="img"
        aria-label={project.featuredImage?.alt || project.title}
        className="h-full min-h-64 w-full rounded-lg border border-brand-black/10 bg-cover bg-center shadow-sm"
        style={{backgroundImage: `url(${imageUrl})`}}
      />
    )
  }

  return (
    <div className="flex min-h-64 items-center justify-center rounded-lg border border-brand-black/10 bg-linear-to-br from-brand-white via-brand-red-light to-amber-50 shadow-sm">
      <Server className="h-12 w-12 text-brand-red/45" aria-hidden />
    </div>
  )
}

function DetailBlock({
  heading,
  body,
}: ProjectDetailBlockProps) {
  if (!body) {
    return null
  }

  return (
    <section className="py-8 first:pt-0 last:pb-0">
      <h2 className="text-xl font-semibold text-brand-black">{heading}</h2>
      <div className="mt-3 whitespace-pre-line text-base leading-8 text-brand-black/68">
        {body}
      </div>
    </section>
  )
}

export default async function ProjectDetailPage({params}: ProjectPageProps) {
  const {slug} = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="page-enter -mt-16 min-h-screen bg-brand-white">
      <section className="pb-20 pt-36 sm:pt-40">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red transition hover:text-brand-red-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
                {project.client}
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-brand-black sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-black/65">
                {project.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {project.deploymentUrl ? (
                  <Link
                    href={project.deploymentUrl}
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-brand-red bg-brand-red px-4 text-sm font-semibold text-brand-white transition hover:border-brand-red-dark hover:bg-brand-red-dark"
                  >
                    Visit project
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
                {project.repositoryUrl ? (
                  <Link
                    href={project.repositoryUrl}
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-brand-black/15 bg-brand-white/85 px-4 text-sm font-semibold text-brand-black transition hover:border-brand-red/35 hover:bg-brand-red-light"
                  >
                    Repository
                    <Code2 className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
              </div>
            </div>

            <ProjectHeroMedia project={project} />
          </div>

          {project.techStack?.length ? (
            <div className="mt-10 border-t border-brand-black/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-black/45">
                Tech stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-brand-red-light px-3 py-1 text-xs font-semibold text-brand-red-dark"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-14">
            <article className="max-w-4xl divide-y divide-brand-black/10">
              <DetailBlock heading="Overview" body={project.overview} />
              <DetailBlock heading="Problem" body={project.problem} />
              <DetailBlock heading="Solution" body={project.solution} />
              <DetailBlock heading="Outcome" body={project.outcome} />
              {(project.detailSections || []).map((section) => (
                <DetailBlock
                  key={section._key || section.heading}
                  heading={section.heading || 'Project detail'}
                  body={section.body}
                />
              ))}
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
