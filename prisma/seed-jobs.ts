import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('Seeding jobs for Module 7...')

  const org = await prisma.organization.findFirst()

  if (!org) {
    console.error('No organization found. Please sign up an organization first.')
    return
  }

  const jobs = [
    {
      title: 'Graduate Software Engineer (Visa Sponsored)',
      description: 'Join our amazing engineering team in London. This role is eligible for Immediate Tier 2 Visa sponsorship for successful international candidates.',
      visaSponsorBadge: 'Can Sponsor Now',
      jobType: 'GRADUATE_SCHEME',
      locationType: 'HYBRID',
      locationName: 'London',
      minSalary: 45000,
      maxSalary: 55000,
      orgId: org.id,
    },
    {
      title: 'Product Management Intern',
      description: 'A 12-month internship for current students. While we cannot sponsor a full Tier 2 visa immediately, we have a pathway for high performers after graduation.',
      visaSponsorBadge: 'Can Sponsor After 12 Months',
      jobType: 'INTERNSHIP',
      locationType: 'ONSITE',
      locationName: 'Manchester',
      minSalary: 22000,
      maxSalary: 28000,
      orgId: org.id,
    },
    {
      title: 'Full Stack Developer',
      description: 'Senior role for experienced developers. Remote-first position within the UK.',
      visaSponsorBadge: 'Can Sponsor Now',
      jobType: 'FULL_TIME',
      locationType: 'REMOTE',
      locationName: 'Remote, UK',
      minSalary: 65000,
      maxSalary: 85000,
      orgId: org.id,
    },
    {
      title: 'Customer Success Associate',
      description: 'Entry-level role in our support team. Note: We are currently unable to provide visa sponsorship for this position.',
      visaSponsorBadge: 'No Sponsorship',
      jobType: 'FULL_TIME',
      locationType: 'HYBRID',
      locationName: 'London',
      minSalary: 30000,
      maxSalary: 35000,
      orgId: org.id,
    },
    {
      title: 'Platform Engineer (SRE)',
      description: 'Scale our cloud infrastructure. We actively welcome international talent and provide full sponsorship and relocation assistance.',
      visaSponsorBadge: 'Can Sponsor Now',
      jobType: 'FULL_TIME',
      locationType: 'HYBRID',
      locationName: 'London',
      minSalary: 75000,
      maxSalary: 95000,
      orgId: org.id,
    }
  ]

  for (const job of jobs) {
    await prisma.jobPost.create({
      data: job
    })
  }

  console.log(`Successfully seeded ${jobs.length} jobs.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
