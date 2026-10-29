const runId = process.argv[2]
const gh = (path) => fetch(`https://api.github.com/repos/aerfaman/dsh-documents${path}`, {
  headers: { 'user-agent': 'dsh-agent', accept: 'application/vnd.github+json' },
}).then((r) => r.json())

const jobs = await gh(`/actions/runs/${runId}/jobs`)
for (const job of jobs.jobs) {
  console.log(`job ${job.id} ${job.status} ${job.conclusion}`)
  for (const s of job.steps) console.log(' ', s.number, String(s.conclusion).padEnd(9), s.name)
  const annotations = await gh(`/check-runs/${job.id}/annotations`)
  for (const a of annotations) {
    console.log(`[${a.annotation_level}] line ${a.start_line}: ${a.message}`)
  }
}
