const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Starting sponsorship status migration...");

  const statusMap = {
    "No Sponsorship Data": "No Sponsorship",
    "Active Sponsor (Verified)": "Can Sponsor Now",
    "Active Sponsor (Register Match)": "Can Sponsor Now",
    "Potential Sponsor (Post 12 Months)": "Can Sponsor After 12 Months",
    "Confirmed Non-Sponsor": "No Sponsorship",
  };

  // Update Organization records
  console.log("Migrating Organization records...");
  const organizations = await prisma.organization.findMany();
  let orgCount = 0;
  for (const org of organizations) {
    if (statusMap[org.sponsorStatus]) {
      await prisma.organization.update({
        where: { id: org.id },
        data: { sponsorStatus: statusMap[org.sponsorStatus] },
      });
      orgCount++;
    }
  }
  console.log(`Updated ${orgCount} organization records.`);

  // Update JobPost records
  console.log("Migrating JobPost records...");
  const jobPosts = await prisma.jobPost.findMany();
  let jobCount = 0;
  for (const job of jobPosts) {
    if (statusMap[job.visaSponsorBadge]) {
      await prisma.jobPost.update({
        where: { id: job.id },
        data: { visaSponsorBadge: statusMap[job.visaSponsorBadge] },
      });
      jobCount++;
    }
  }
  console.log(`Updated ${jobCount} job post records.`);

  console.log("Migration completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
