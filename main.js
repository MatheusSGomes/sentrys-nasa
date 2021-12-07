import Sentry from './Sentry.js';
import sentryService from './sentry_service.js';

async function loadSentry() {
  try {
    const sentrys = await sentryService();
    const sentrysList = [];
    
    sentrys.forEach(sentry => {
      const id = sentry['sentryId']
      const name = sentry['fullname']
      const yearMin = sentry['year_range_min']
      const yearMax = sentry['year_range_max']
  
      const newSentry = new Sentry(id, name, yearMin, yearMax);
      sentrysList.push(newSentry);
    })
    
    localStorage.clear();
    localStorage.setItem('sentrys', JSON.stringify(sentrysList));
  
  } catch (error) {
    console.log('Erro por excesso de requisições');

  } finally {

    const sentrys = localStorage.getItem('sentrys')
    renderList(JSON.parse(sentrys));
  }
}

function renderList(sentrys) {
  const ulElement = document.querySelector('#sentry-objects');
  
  sentrys.forEach(sentry => {
    const li = document.createElement('li');

    const content = `<strong>Sentry: ${sentry.name}</strong> ID: ${sentry.id}  - risco de colisão com a Terra entre o ano <i>${sentry.yearMin}</i> e o ano <i>${sentry.yearMax}</i>.`;

    li.innerHTML = content;
  
    ulElement.appendChild(li);
  })
}

loadSentry();
