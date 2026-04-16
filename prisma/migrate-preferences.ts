import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.DATABASE_URL || "file:./prisma/dev.db"
const adapter = new PrismaLibSql({ url })
const prisma = new PrismaClient({ adapter })

async function main() {
  const jobSeekers = await prisma.jobSeeker.findMany()

  console.log(`Found ${jobSeekers.length} job seekers. Checking for preferences to migrate...`)

  for (const seeker of jobSeekers) {
    const hasPreferences = 
      seeker.preferredRole || 
      seeker.preferredType || 
      seeker.expectedSalaryMin || 
      seeker.expectedSalaryMax || 
      seeker.preferredLocation || 
      seeker.noticePeriod || 
      seeker.availability

    if (hasPreferences) {
      console.log(`Migrating preferences for JobSeeker: ${seeker.id}`)
      
      // Check if they already have any job preferences (to avoid double migration)
      const existingPrefs = await prisma.jobPreference.findFirst({
        where: { jobSeekerId: seeker.id }
      })

      if (!existingPrefs) {
        await prisma.jobPreference.create({
          data: {
            jobSeekerId: seeker.id,
            preferredRole: seeker.preferredRole,
            preferredType: seeker.preferredType,
            expectedSalaryMin: seeker.expectedSalaryMin,
            expectedSalaryMax: seeker.expectedSalaryMax,
            preferredLocation: seeker.preferredLocation,
            noticePeriod: seeker.noticePeriod,
            availability: seeker.availability,
          }
        })
        console.log(`✅ Migrated for ${seeker.id}`)
      } else {
        console.log(`⏭️ Already has preferences for ${seeker.id}`)
      }
    }
  }

  console.log('Migration complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
