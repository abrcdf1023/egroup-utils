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
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }
}

const Instance = new Beforeunload();

export default Instance;
