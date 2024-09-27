$(document).ready(function () {
  const infoSvg = `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z" fill="#1C274C"></path> <path d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z" class="icon-fill"></path> </g></svg>`;

  const errorSvg = `<svg class="w-10 h-10" fill="none" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" class="icon-fill"></path></g></svg>`;

  const warningSvg = `<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z" class="icon-fill"></path> </g></svg>`;

  function createNotification(type, message, fadeTime) {
   
    if ($(`.notification-bg:contains("${message}")`).length) {
      return; 
    }

    const notifyTimer = `
      <div class="notify-timer">
        <svg width="25" height="25" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7.5" cy="7.5" r="5" fill="none" stroke="white" stroke-opacity="0.17" stroke-width="1.5"/>
          <circle class="progressCircle" cx="7.5" cy="7.5" r="5" fill="none" stroke="#DCDFDE" stroke-width="1.5"
            stroke-dasharray="31.41592653589793" stroke-dashoffset="31.41592653589793"/>
        </svg>
      </div>`;

    let iconSvg;
    let iconColor;

    if (type === 'error') {
      iconSvg = errorSvg;
      iconColor = '#ed2727'; // Red for error
    } else if (type === 'warning') {
      iconSvg = warningSvg;
      iconColor = '#e3ec4a'; // Yellow for warning
    } else {
      iconSvg = infoSvg;
      iconColor = '#60a5fa'; // Blue for info
    }

    const element = document.createElement('div');
    element.className = `notification-bg shadow-lg bg-zinc-700`;
    element.innerHTML = `<i class="icon">${iconSvg}</i><span class="ml-3 bg-zinc-800 rounded-sm p-2">${message}</span>${notifyTimer}`;
    element.setAttribute('data-total-time', fadeTime);

    $('.notify-wrap').prepend(element);
    $(element).find('.icon-fill').css('fill', iconColor); 
    $(element).fadeIn('fast');

    startTimer(element);
    setTimeout(() => {
      $(element).fadeOut('slow', function () {
        $(this).remove();
      });
    }, fadeTime);
  }

  function updateProgress(element, progress) {
    const circumference = 2 * Math.PI * 5; 
    const offset = (1 - progress / 100) * circumference;
    const circle = $(element).find('.progressCircle')[0];
    $(circle).attr('stroke-dashoffset', offset);
  
 
    $(circle).attr('stroke', "#168039");
  }
  

  function startTimer(notification) {
    const totalTime = parseInt($(notification).attr('data-total-time'), 10);
    let remainingTime = totalTime;
    const intervalTime = 100;

    const interval = setInterval(() => {
      remainingTime -= intervalTime;
      const progress = ((totalTime - remainingTime) / totalTime) * 100;
      updateProgress(notification, 100 - progress);

      if (remainingTime <= 0) {
        clearInterval(interval);
        updateProgress(notification, 0);
      }
    }, intervalTime);
  }

  
  window.addEventListener('message', function (event) {
    const item = event.data;
    createNotification(item.colorsent, item.textsent, item.fadesent);
  });
});
