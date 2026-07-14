import Link from 'next/link'
import {notFound} from 'next/navigation'
import {ArrowLeft, ArrowUpRight, Code2, Server} from 'lucide-react'

import {sanityFetch} from '@/sanity/lib/live'
import {
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from '@/sanity/lib/queries'
import type {ProjectItem} from '../types'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

function ProjectHeroMedia({project}: {project: ProjectItem}) {
  const imageUrl = project.featuredImage?.asset?.url

  if (imageUrl) {
    return (
      <div
        role="img"
        aria-label={project.featuredImage?.alt || project.title}
        className="h-full min-h-64 w-full rounded-lg border border-black/10 bg-cover bg-center shadow-sm"
        style={{backgroundImage: `url(${imageUrl})`}}
      />
    )
  }

  return (
    <div className="flex min-h-64 items-center justify-center rounded-lg border border-black/10 bg-linear-to-br from-white via-[--brand-red-light] to-slate-100 shadow-sm">
      <Server className="h-12 w-12 text-[--brand-red]/45" aria-hidden />
    </div>
  )
}

function DetailBlock({
  heading,
  body,
}: {
  heading: string
  body?: string
}) {
  if (!body) {
    return null
  }

  return (
    <section className="rounded-lg bg-[--brand-white-soft] px-5 py-6 sm:px-6">
      <h2 className="text-lg font-semibold text-[--brand-black]">{heading}</h2>
      <div className="mt-4 whitespace-pre-line text-base leading-8 text-black/68">
        {body}
      </div>
    </section>
  )
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({query: PROJECT_SLUGS_QUERY})
  const sanitySlugs = data as {slug?: string}[] | null
  const slugs = sanitySlugs || []

  return slugs
    .filter((project): project is {slug: string} => Boolean(project.slug))
    .map((project) => ({slug: project.slug}))
}

export default async function ProjectDetailPage({params}: ProjectPageProps) {
  const {slug} = await params
  const {data} = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: {slug},
  })
  const sanityProject = data as ProjectItem | null
  const project = sanityProject

  if (!project) {
    notFound()
  }

  return (
    <main className="page-enter -mt-16 min-h-screen bg-[--brand-white]">
      <section className="pb-20 pt-36 sm:pt-40">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[--brand-red] transition hover:text-[--brand-red-dark]"
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
              <p className="mt-5 max-w-3xl text-lg leading-8 text-black/65">
                {project.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {project.deploymentUrl ? (
                  <Link
                    href={project.deploymentUrl}
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-[#c8102e] bg-[#c8102e] px-4 text-sm font-semibold text-white transition hover:border-[#8f0c22] hover:bg-[#8f0c22]"
                  >
                    Visit project
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
                {project.repositoryUrl ? (
                  <Link
                    href={project.repositoryUrl}
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-black/15 bg-white/85 px-4 text-sm font-semibold text-[--brand-black] transition hover:border-[--brand-red]/35 hover:bg-[--brand-red-light]"
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
            <div className="mt-10 rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-black/45">
                Tech stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[--brand-red-light] px-3 py-1 text-xs font-semibold text-[--brand-red-dark]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-14">
            <article className="max-w-3xl space-y-5">
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
