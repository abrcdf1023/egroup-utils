/**
 * This class is a surger to handle window beforeunload event.
 *
 * Example .
 * ```javascript
 * beforeunload.block(); // block user exit browser.
 *
 * doSomething()
 *
 * beforeunload.unblock(); // unblock user exit browser.
 * ```
 */
class Beforeunload {
  block(options) {
    if (this.onbeforeunload) return;
    const { dialogText } = options || {};
    this.onbeforeunload = e => {
      // Cancel the event as stated by the standard.
      e.preventDefault();
      // Chrome requires returnValue to be set.
      e.returnValue = dialogText;
      return dialogText;
    };
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  unblock() {
    if (!this.onbeforeunload) return;
    window.removeEventListener('beforeunload', this.onbeforeunload);
    this.onbeforeunload = undefined;
  }
}

const Instance = new Beforeunload();

export default Instance;
