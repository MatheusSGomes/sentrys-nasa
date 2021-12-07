import Sentry from './Sentry.js';
import sentryService from './sentry_service.js';

async function loadSentry() {
  try {
    const sentrys = await sentryService();
    const sentrysList = [];
    
    sentrys.forEach(sentry => {
      const minAge = sentry['year_range_min']
      const maxAge = sentry['year_range_max']
      const id = sentry['sentryId']
      const name = sentry['fullname']
  
      const newSentry = new Sentry(id, name, minAge, maxAge);
      sentrysList.push(newSentry)
    })
    
    // renderList(sentrysList);
    localStorage.clear();
    localStorage.setItem('sentrys', JSON.stringify(sentrysList));
  
  } catch (error) {
    console.log('Erro');

  } finally {

    const sentrys = localStorage.getItem('sentrys')
    renderList(JSON.parse(sentrys));
  }
}

function renderList(sentrys) {
  const ulElement = document.querySelector('#ul-sentry');
  
  sentrys.forEach(sentry => {
    const li = document.createElement('li');

    const content = `(${sentry.id}) ${sentry.name}: risco de colisão entre o ano ${sentry.minAge} e o ano ${sentry.maxAge}`;

    li.innerHTML = content;
  
    ulElement.appendChild(li);
  })
}

loadSentry();
