import json
from pathlib import Path
from playwright.sync_api import sync_playwright
results={}
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/google-chrome',headless=True,args=['--no-sandbox'])
 page=browser.new_page()
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 for w in [360,390,430,1366]:
  page.set_viewport_size({'width':w,'height':900});page.goto('http://localhost:4200');page.wait_for_selector('.product-card');page.evaluate('document.fonts.ready');page.locator('footer').scroll_into_view_if_needed();page.wait_for_function('Array.from(document.querySelectorAll(".product-image img")).every(i=>i.complete)')
  results[str(w)]={'overflow':page.evaluate('document.documentElement.scrollWidth>innerWidth'),'images':page.evaluate('Array.from(document.images).map(i=>({src:i.getAttribute("src"),ok:i.complete&&i.naturalWidth>0}))'),'cards':page.locator('.product-card').count()}
  page.evaluate('window.scrollTo(0,0)');page.screenshot(path=f'/home/user/tn-research/site-{w}.png',full_page=True)
 page.get_by_role('button',name='Retro runners',exact=True).click();assert page.locator('.product-card').count()==2
 page.get_by_role('button',name='Reset filters',exact=True).first.click();assert page.locator('.product-card').count()==6
 page.get_by_role('button',name='Street style',exact=True).click();assert page.locator('.product-card').count()==2
 page.get_by_role('button',name='Reset filters',exact=True).first.click()
 page.get_by_role('button',name='Search products',exact=True).click();page.get_by_role('textbox',name='Search by style, colour or name').fill('nonexistent');assert page.locator('.product-card').count()==0
 page.get_by_role('button',name='Reset filters',exact=True).first.click();assert page.locator('.product-card').count()==6
 page.get_by_label('Sort products').select_option('high');assert '$28' in page.locator('.price').first.inner_text()
 page.get_by_role('button',name='Reset filters',exact=True).first.click()
 page.get_by_role('button',name='View The Everyday Low',exact=True).last.click();page.get_by_label('Your size',exact=False).select_option('42');page.locator('dialog').get_by_role('button',name='Enquire on WhatsApp',exact=False).click()
 msg=page.get_by_role('textbox',name='Enquiry message draft').input_value();assert 'EU 42' in msg and 'TN-DEMO-01' in msg
 assert page.locator('a[href*="wa.me"]').count()==0
 assert 'no message will be sent' in page.locator('dialog').inner_text()
 page.keyboard.press('Escape');assert not page.locator('dialog').is_visible()
 for target in ['home','collection','about','contact']:
  assert page.locator('#'+target).count()==1
 page.set_viewport_size({'width':390,'height':900});page.evaluate('scrollTo(0,0)');page.get_by_role('button',name='Open navigation').click();assert page.locator('#mobile-navigation').is_visible();page.locator('#mobile-navigation').get_by_role('link',name='Shop',exact=True).click();assert not page.locator('#mobile-navigation').count()
 page.get_by_role('button',name='Open navigation').click();page.keyboard.press('Escape');assert not page.locator('#mobile-navigation').count()
 results['interaction_tests']='PASS: category/reset, search/empty, sort, selected size/SKU message, disabled live WhatsApp, Escape dialog, anchor targets, mobile menu navigation/Escape'
 results['page_errors']=errors
 browser.close()
Path('/home/user/tn-footwear/tests/browser-results.json').write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2))
