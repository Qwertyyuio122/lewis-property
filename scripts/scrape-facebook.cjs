const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeFacebook() {
  console.log('🚀 Facebook scraper - Extended extraction...\n');

  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  const data = {
    pageName: 'Lewis Property Management',
    about: '',
    contact: {
      phone: '',
      email: '',
      address: ''
    },
    location: '',
    logo: '',
    photos: []
  };

  try {
    // Navigate to the page with extended wait
    console.log('📋 Loading Facebook page...');
    await page.goto('https://www.facebook.com/lewispropertymgmt', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait longer for content to load
    await page.waitForTimeout(8000);
    
    // Take screenshot
    await page.screenshot({ path: path.join(__dirname, '../fb-full.png'), fullPage: true });
    console.log('📸 Screenshot saved');

    // Get full page text
    const pageText = await page.locator('body').textContent();
    
    console.log('\n📄 Extracting data...\n');

    // Clean and extract phone
    const phonePattern = /(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/g;
    const phoneMatches = pageText.match(phonePattern);
    if (phoneMatches) {
      const validPhones = phoneMatches.filter(p => {
        const clean = p.replace(/\D/g, '');
        return clean.length >= 10 && parseInt(clean) > 1000000000 && !clean.startsWith('555');
      });
      if (validPhones.length > 0) {
        data.contact.phone = validPhones[0];
        console.log(`   ✅ Phone: ${data.contact.phone}`);
      }
    }

    // Clean email extraction
    const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:com|org|net|io|co))/gi;
    const emailMatches = pageText.match(emailPattern);
    if (emailMatches) {
      const cleanEmail = emailMatches[0].replace(/PhotosSee|About|See more/gi, '').trim();
      if (cleanEmail.includes('@')) {
        data.contact.email = cleanEmail;
        console.log(`   ✅ Email: ${data.contact.email}`);
      }
    }

    // Look for location
    const locationPattern = /(?:Location|Based in|Serving)[:\s]*([A-Za-z\s]+,?\s*[A-Z]{2})/i;
    const locationMatch = pageText.match(locationPattern);
    if (locationMatch) {
      data.location = locationMatch[1].trim();
      console.log(`   ✅ Location: ${data.location}`);
    } else {
      // Try finding Florida references
      if (pageText.includes('Tallahassee')) {
        data.location = 'Tallahassee, FL';
        console.log(`   ✅ Location: Tallahassee, FL`);
      } else if (pageText.includes('Florida')) {
        data.location = 'Florida';
        console.log(`   ✅ Location: Florida`);
      }
    }

    // Look for business description
    const descPatterns = [
      /(?:We provide|Our services|Property management|Specializing)[^\.]{50,200}/gi,
      /(?:Property|Management|Rental|Landscape)[^\.]{30,150}/gi
    ];
    
    for (const pattern of descPatterns) {
      const matches = pageText.match(pattern);
      if (matches && matches.length > 0) {
        const aboutText = matches[0].replace(/\s+/g, ' ').trim();
        if (aboutText.length > 30 && aboutText.length < 500) {
          data.about = aboutText;
          console.log(`   ✅ About: ${aboutText.substring(0, 80)}...`);
          break;
        }
      }
    }

    // Try to get images from the page
    try {
      const images = await page.locator('img').all();
      for (const img of images.slice(0, 10)) {
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt') || '';
        
        // Look for profile/cover images
        if (src && (src.startsWith('http') || src.startsWith('data:'))) {
          if (alt.toLowerCase().includes('logo') || 
              alt.toLowerCase().includes('profile') || 
              alt.toLowerCase().includes('cover') ||
              src.includes('scontent') ||
              src.includes('fbcdn')) {
            data.photos.push(src);
          }
        }
      }
      console.log(`   ✅ Found ${data.photos.length} relevant images`);
    } catch (e) {}

    console.log('\n✅ Extraction complete!\n');

    // Save
    const outputPath = path.join(__dirname, '../scraped-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log('📊 Final Data:');
    console.log(`   - Company: ${data.pageName}`);
    console.log(`   - Phone: ${data.contact.phone || 'Not found'}`);
    console.log(`   - Email: ${data.contact.email || 'Not found'}`);
    console.log(`   - Location: ${data.location || 'Not found'}`);
    console.log(`   - About: ${data.about ? data.about.substring(0, 100) + '...' : 'Not found'}`);
    console.log(`   - Photos: ${data.photos.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n👋 Closing...');
  await browser.close();
}

scrapeFacebook().catch(console.error);