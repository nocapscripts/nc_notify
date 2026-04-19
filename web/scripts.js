const { createApp } = Vue;

createApp({
  data() {
    return {
      DEBUG_MODE: true,

      notifications: [],
      idCounter: 0,

      icons: {
        info: "svgs/info.svg",
        error: "svgs/error.svg",
        warning: "svgs/warning.svg",
        success: "svgs/success.svg",
      },
    };
  },

  mounted() {
    if (this.DEBUG_MODE) {
      this.runDebugTests();
      return;
    }

    window.addEventListener("message", (event) => {
      const { colorsent, textsent, fadesent } = event.data;
      this.createNotification(colorsent, textsent, fadesent);
    });
  },

  methods: {
    // =========================
    // CORE NOTIFICATION SYSTEM
    // =========================
    createNotification(type, message, duration = 5000) {
      if (this.notifications.some((n) => n.message === message)) return;

      const config = this.getConfig(type);

      const id = this.idCounter++;

      const notification = {
        id,
        type,
        message,
        icon: config.icon,
        color: config.color,
        progress: 100,
        visible: true,
      };

      this.notifications.unshift(notification);

      this.startProgress(notification, duration);
      this.scheduleRemoval(notification, duration);
    },

    getConfig(type) {
      const map = {
        error: { icon: this.icons.error, color: "rgba(239, 68, 68, 0.7)" },
        warning: { icon: this.icons.warning, color: "rgba(234, 179, 8, 0.7)" },
        info: { icon: this.icons.info, color: "rgba(59, 130, 246, 0.7)" },
        success: { icon: this.icons.success, color: "rgba(34, 197, 94, 0.7)" },
      };

      return map[type] || map.success;
    },

    // =========================
    // PROGRESS BAR TIMER
    // =========================
    startProgress(notification, duration) {
      let remaining = duration;

      const interval = setInterval(() => {
        remaining -= 100;

        notification.progress = ((duration - remaining) / duration) * 100;

        if (remaining <= 0) {
          clearInterval(interval);
          notification.progress = 0;
        }
      }, 100);
    },

    // =========================
    // FADE OUT + REMOVE
    // =========================
    scheduleRemoval(notification, duration) {
      setTimeout(() => {
        const n = this.notifications.find((x) => x.id === notification.id);
        if (!n) return;

        // trigger fade-out
        n.visible = false;

        // remove after animation
        setTimeout(() => {
          this.notifications = this.notifications.filter(
            (x) => x.id !== notification.id,
          );
        }, 400);
      }, duration);
    },

    // =========================
    // DEBUG TESTS
    // =========================
    runDebugTests() {
      this.createNotification("info", "Debug INFO notification", 10000);
      this.createNotification("success", "Debug SUCCESS notification", 10000);
      this.createNotification("warning", "Debug WARNING notification", 10000);
      this.createNotification("error", "Debug ERROR notification", 10000);
    },

    debugInfo() {
      this.createNotification("info", "Debug INFO notification", 10000);
    },

    debugSuccess() {
      this.createNotification("success", "Debug SUCCESS notification", 10000);
    },

    debugWarning() {
      this.createNotification("warning", "Debug WARNING notification", 10000);
    },

    debugError() {
      this.createNotification("error", "Debug ERROR notification", 10000);
    },
  },
}).mount("#app");
