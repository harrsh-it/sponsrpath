import { NextResponse } from 'next/server';
import { scrapeJobs, saveScrapedJobs } from '@/lib/fetchers/naukri';

export async function GET() {
  try {
    console.log('Starting manual scrape of Naukri jobs...');
    const jobs = await scrapeJobs();
    
    if (jobs.length > 0) {
      await saveScrapedJobs(jobs);
      return NextResponse.json({ 
        success: true, 
        message: `Successfully scraped ${jobs.length} jobs from Naukri.`,
        count: jobs.length 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'No jobs found or error during scraping.' 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('API Error during scraping:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}
