import WebsocketRegister from './WebsocketRegister';

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
 *
 * @module facego-utils/Beforeunload
 */
class Beforeunload {
  register() {
    this.onbeforeunload = e => {
      // 監聽窗口關閉事件。
      // 當窗口關閉時主動去關閉 websocket 連接，防止連接還沒斷開就關閉窗口否則 server 端會拋異常。
      WebsocketRegister.unregisterAll();
    };
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
