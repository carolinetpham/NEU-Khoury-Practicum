import ProjectsDashboard from './ProjectsDashboard'
import {getProjects} from './data'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="page-enter -mt-16 min-h-screen bg-brand-white">
      <section className="pb-20 pt-36 sm:pt-40">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <p className="rise-in text-sm font-semibold uppercase tracking-wide text-brand-red">
            Projects
          </p>
          <div className="rise-in rise-in-delay-1 mt-4">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-brand-black sm:text-5xl">
              Practicum Project Dashboard
            </h1>
          </div>

          <ProjectsDashboard projects={projects} />
        </div>
      </section>
    </main>
  )
}
