import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

export interface ScrapedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  source: 'naukri';
  logo: string;
  exp: string;
  salary: string;
  description: string;
  postedAt: string;
  jobType: string;
}

/**
 * Scrapes jobs from Naukri (multiple pages)
 * @returns {Promise<ScrapedJob[]>} List of normalized job objects.
 */
export async function scrapeJobs(): Promise<ScrapedJob[]> {
  const baseUrl = "https://www.naukri.com/engineering-jobs-";
  const totalPages = 2;
  let browser;

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']    
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    );

    const allJobs: any[] = [];

    for (let i = 1; i <= totalPages; i++) {
      const url = `${baseUrl}${i}`;
      console.log(`Scraping page ${i}: ${url}`);

      await page.goto(url, { waitUntil: 'networkidle2' });

      // wait for jobs to load
      try {
        await page.waitForSelector(".cust-job-tuple", { timeout: 10000 });
      } catch (e) {
        console.warn(`No jobs found on page ${i} or timeout reached.`);
        continue;
      }

      const jobs = await page.$$eval(".cust-job-tuple", (cards) => {
        return cards.map((card) => {
          const titleEl = card.querySelector(".title") as HTMLAnchorElement;
          const companyEl = card.querySelector(".comp-name") as HTMLElement;
          const locEl = card.querySelector(".locWraper") as HTMLElement;
          const img = card.querySelector(".logoImage") as HTMLImageElement;
          const exp = card.querySelector(".expwdth") as HTMLElement;
          const salary = card.querySelector(".sal") as HTMLElement;
          const description = card.querySelector(".job-desc") as HTMLElement;

          return {
            title: titleEl?.innerText?.trim() || 'No Title',
            company: companyEl?.innerText?.trim() || 'Unknown Company',
            location: locEl?.innerText?.trim() || 'India',
            url: titleEl?.href || '',
            source: 'naukri',
            logo: img?.src || '',
            exp: exp?.innerText?.trim() || 'Unknown Experience',
            salary: salary?.innerText?.trim() || 'Unknown Salary',
            description: description?.innerText?.trim() || 'No Description',
          };
        });
      });

      console.log(`Page ${i}: Found ${jobs.length} jobs`);
      allJobs.push(...jobs);

      // delay to avoid blocking
      await delay(2000);
    }

    // Normalize + Deduplicate
    const uniqueJobs = Array.from(
      new Map(allJobs.map(job => [job.url || job.title, job])).values()
    );

    const normalizedJobs: ScrapedJob[] = uniqueJobs.map(job => {
      const uniqueString = job.url || job.title;
      const hash = Buffer.from(uniqueString).toString('base64').replace(/[/+=]/g, '').slice(-15);

      return {
        ...job,
        id: `naukri-${hash}-${Date.now().toString(36)}`,
        postedAt: new Date().toISOString(),
        jobType: 'Full-time'
      } as ScrapedJob;
    });

    console.log(`Total unique jobs: ${normalizedJobs.length}`);
    return normalizedJobs;

  } catch (error: any) {
    console.error('Error scraping Naukri:', error.message);
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

/**
 * Saves scraped jobs to a JSON file
 */
export async function saveScrapedJobs(jobs: ScrapedJob[]) {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const filePath = path.join(dataDir, 'scraped-jobs.json');
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
}

/**
 * Loads scraped jobs from the JSON file
 */
export function getScrapedJobs(): ScrapedJob[] {
  const filePath = path.join(process.cwd(), 'data', 'scraped-jobs.json');
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading scraped jobs:', error);
    return [];
  }
}
