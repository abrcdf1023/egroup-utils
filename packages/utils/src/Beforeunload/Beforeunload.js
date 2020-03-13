/**
 * This class is a surger to handle window beforeunload event.
 *
 * Example .
 * ```javascript
 * Beforeunload.block(); // block user exit browser.
 *
 * doSomething()
 *
 * Beforeunload.unblock(); // unblock user exit browser.
 * ```
 */
class Beforeunload {
  register(options = {}) {
    const { onbeforeunload } = options;
    if (onbeforeunload) {
      this.onbeforeunload = onbeforeunload;
    }

    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  block() {
    this.onbeforeunload = e => {
      // Cancel the event as stated by the standard.
      e.preventDefault();
      // Chrome requires returnValue to be set.
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  unblock() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    this.register();
  }
}

const Instance = new Beforeunload();

export default Instance;
