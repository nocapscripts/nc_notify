$(document).ready(function () {
  const DEBUG_MODE = false;

  const icons = {
    info: `
      <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c9c9c9"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21.5C17.1086 21.5 21.25 17.3586 21.25 12.25C21.25 7.14137 17.1086 3 12 3C6.89137 3 2.75 7.14137 2.75 12.25C2.75 17.3586 6.89137 21.5 12 21.5Z" stroke="#cfcfcf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.9309 8.15005C12.9256 8.39231 12.825 8.62272 12.6509 8.79123C12.4767 8.95974 12.2431 9.05271 12.0008 9.05002C11.8242 9.04413 11.6533 8.98641 11.5093 8.884C11.3652 8.7816 11.2546 8.63903 11.1911 8.47415C11.1275 8.30927 11.1139 8.12932 11.152 7.95675C11.19 7.78419 11.278 7.6267 11.405 7.50381C11.532 7.38093 11.6923 7.29814 11.866 7.26578C12.0397 7.23341 12.2192 7.25289 12.3819 7.32181C12.5446 7.39072 12.6834 7.506 12.781 7.65329C12.8787 7.80057 12.9308 7.97335 12.9309 8.15005ZM11.2909 16.5301V11.1501C11.2882 11.0556 11.3046 10.9615 11.3392 10.8736C11.3738 10.7857 11.4258 10.7057 11.4922 10.6385C11.5585 10.5712 11.6378 10.518 11.7252 10.4822C11.8126 10.4464 11.9064 10.4286 12.0008 10.43C12.094 10.4299 12.1863 10.4487 12.272 10.4853C12.3577 10.5218 12.4352 10.5753 12.4997 10.6426C12.5642 10.7099 12.6143 10.7895 12.6472 10.8767C12.6801 10.9639 12.6949 11.0569 12.6908 11.1501V16.5301C12.6908 16.622 12.6727 16.713 12.6376 16.7979C12.6024 16.8828 12.5508 16.96 12.4858 17.025C12.4208 17.09 12.3437 17.1415 12.2588 17.1767C12.1738 17.2119 12.0828 17.23 11.9909 17.23C11.899 17.23 11.8079 17.2119 11.723 17.1767C11.6381 17.1415 11.5609 17.09 11.4959 17.025C11.4309 16.96 11.3793 16.8828 11.3442 16.7979C11.309 16.713 11.2909 16.622 11.2909 16.5301Z" fill="#cfcfcf"></path> </g></svg>
      </svg>`,
    error: `
      <svg class="w-10 h-10" fill="none" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_iconCarrier">
          <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" class="icon-fill"></path>
        </g>
      </svg>`,
    warning: `
      <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_iconCarrier">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z" class="icon-fill"></path>
        </g>
      </svg>`,

    success: `
      <svg class="w-10 h-10" fill="#b3b3b3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#b3b3b3" stroke-width="0.072"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L10,13.5857864 L8.70710678,12.2928932 C8.31658249,11.9023689 7.68341751,11.9023689 7.29289322,12.2928932 C6.90236893,12.6834175 6.90236893,13.3165825 7.29289322,13.7071068 L9.29289322,15.7071068 C9.68341751,16.0976311 10.3165825,16.0976311 10.7071068,15.7071068 L16.7071068,9.70710678 C17.0976311,9.31658249 17.0976311,8.68341751 16.7071068,8.29289322 C16.3165825,7.90236893 15.6834175,7.90236893 15.2928932,8.29289322 Z"></path> </g></svg>
    `
  };

  const timerSvg = `
    <div class="notify-timer">
      <svg width="25" height="25" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7.5" cy="7.5" r="5" fill="none" stroke="white" stroke-opacity="0.17" stroke-width="1.5"/>
        <circle class="progressCircle" cx="7.5" cy="7.5" r="5" fill="none" stroke="#00e68a" stroke-width="1.5"
          stroke-dasharray="31.41592653589793" stroke-dashoffset="31.41592653589793"/>
      </svg>
    </div>`;
  function createNotification(type, message, fadeTime) {
      if ($(`.notification-bg:contains("${message}")`).length) return;
    
      const settings = {
        error: { icon: icons.error, color: "rgba(239, 68, 68, 0.7)", iconColor: "#d4d4d4" },
        warning: { icon: icons.warning, color: "rgba(234, 179, 8, 0.7)", iconColor: "#d4d4d4" },
        info: { icon: icons.info, color: "rgba(59, 130, 246, 0.7)", iconColor: "#d4d4d4" },
        success: { icon: icons.success, color: "rgba(34, 197, 94, 0.7)", iconColor: "#d4d4d4" }, // Success example
      };
    
      const currentSettings = settings[type] || settings.info;
    
      const notificationElement = $(`
        <div class="notification-bg shadow-lg rounded" data-total-time="${fadeTime}" style="background-color: ${currentSettings.color};">
          <i class="icon">${currentSettings.icon}</i>
          <span class="ml-3 text-center items-center justify-center rounded-sm p-2">${message}</span>
          ${timerSvg}
        </div>`
      );
    
      $(notificationElement).find('.icon-fill').css('fill', currentSettings.iconColor);
    
      $('.notify-wrap').prepend(notificationElement);
      $(notificationElement).fadeIn('fast');
    
      startTimer(notificationElement[0]);
    
      setTimeout(() => {
        $(notificationElement).fadeOut('slow', function () {
          $(this).remove();
        });
      }, fadeTime);
    }
    
    

  function updateProgress(element, progress) {
    const circumference = 2 * Math.PI * 5;
    const offset = (1 - progress / 100) * circumference;
    $(element).find('.progressCircle').attr({ 'stroke-dashoffset': offset, 'stroke': '#e88c0c' });
  }

  function startTimer(notification) {
    const totalTime = parseInt($(notification).data('total-time'), 10);
    let remainingTime = totalTime;
    const interval = setInterval(() => {
      remainingTime -= 100;
      const progress = ((totalTime - remainingTime) / totalTime) * 100;
      updateProgress(notification, 100 - progress);
      if (remainingTime <= 0) {
        clearInterval(interval);
        updateProgress(notification, 0);
      }
    }, 100);
  }

  if (!DEBUG_MODE) {
    window.addEventListener('message', (event) => {
      const { colorsent, textsent, fadesent } = event.data;
      createNotification(colorsent, textsent, fadesent);
    });
  }

  if (DEBUG_MODE) {
    createNotification('error', 'This is a debug notification. Refresh to try again.', 10000);
   
  }
});
