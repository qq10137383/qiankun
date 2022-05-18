/* eslint-disable no-param-reassign */
/**
 * @author Kuitos
 * @since 2019-04-11
 */

import { noop } from 'lodash';
import type { SandBox } from '../../interfaces';

const rawAddEventListener = window.addEventListener;
const rawRemoveEventListener = window.removeEventListener;

export default function patch(_sandbox: SandBox) {
  const global = _sandbox.proxy;
  const listenerMap = new Map<string, EventListenerOrEventListenerObject[]>();
  // 事件钩子(拦截事件执行)
  const hookMap = new Map<number, EventListener>();
  let hookId = 0;

  global.addEventListener = (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ) => {
    // keepAlive模式下判断沙盒是否激活，激活状态下执行
    (listener as any).hookId = ++hookId;
    const listenerWrapper: EventListener = function(evt: Event) {
      if (_sandbox.sandboxRunning) {
        if (typeof listener === 'function') {
          listener(evt);
        } else {
          listener.handleEvent(evt);
        }
      }
    };
    hookMap.set(hookId, listenerWrapper);
    const listeners = listenerMap.get(type) || [];
    listenerMap.set(type, [...listeners, listenerWrapper]);
    return rawAddEventListener.call(window, type, listenerWrapper, options);
  };

  global.removeEventListener = (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ) => {
    // 移除事件时需要将事件包装函数移除
    let listenerWrapper = listener;
    const listenerId = (listener as any).hookId;
    if (listenerId && hookMap.has(listenerId)) {
      listenerWrapper = hookMap.get(listenerId)!;
    }
    const storedTypeListeners = listenerMap.get(type);
    if (storedTypeListeners && storedTypeListeners.length && storedTypeListeners.indexOf(listenerWrapper) !== -1) {
      storedTypeListeners.splice(storedTypeListeners.indexOf(listenerWrapper), 1);
    }
    return rawRemoveEventListener.call(window, type, listenerWrapper, options);
  };

  return function free() {
    // keepAlive模式下沙盒释放时不销毁事件，只是暂时禁用
    if (!_sandbox.keepAlive) {
      listenerMap.forEach((listeners, type) =>
        [...listeners].forEach((listener) => global.removeEventListener(type, listener)),
      );
    }
    global.addEventListener = rawAddEventListener;
    global.removeEventListener = rawRemoveEventListener;

    return noop;
  };
}
