/** Keep the tail of a reading gesture from turning into a chapter change. */
export class WheelGesture {
  private lastTime = -Infinity;
  private distance = 0;
  private consumed = false;

  next(delta: number, time: number, readingOrBlocked: boolean): boolean {
    if (time - this.lastTime > 240) {
      this.distance = 0;
      this.consumed = false;
    }
    this.lastTime = time;
    if (readingOrBlocked) this.consumed = true;
    if (this.consumed) return false;
    if (Math.sign(delta) !== Math.sign(this.distance)) this.distance = 0;
    this.distance += delta;
    if (Math.abs(this.distance) < 80) return false;
    this.consumed = true;
    return true;
  }
}

type ScrollOptions = {
  current: () => HTMLElement | null;
  blocked: () => boolean;
  navigate: (direction: number) => void;
};

export function installChapterScroll(root: HTMLElement, options: ScrollOptions) {
  const gesture = new WheelGesture();
  const canScroll = (panel: HTMLElement, delta: number) => {
    const max = panel.scrollHeight - panel.clientHeight;
    return max > 2 && /auto|scroll/.test(getComputedStyle(panel).overflowY) &&
      (delta > 0 ? panel.scrollTop < max - 2 : panel.scrollTop > 2);
  };
  const readingPanel = (target: Element | null, delta: number) => {
    const scene = options.current();
    if (!scene) return null;
    // Prefer the panel under the pointer, then any unread panel in this scene.
    // Horizontal galleries never consume a vertical reading gesture.
    for (let panel = target?.closest<HTMLElement>('.local-scroll'); panel && scene.contains(panel);
      panel = panel.parentElement?.closest<HTMLElement>('.local-scroll') || null) {
      if (canScroll(panel, delta)) return panel;
    }
    return Array.from(scene.querySelectorAll<HTMLElement>('.local-scroll')).find(panel => canScroll(panel, delta)) || null;
  };
  const scrollBy = (target: Element | null, delta: number) => {
    const panel = readingPanel(target, delta);
    if (!panel) return false;
    panel.scrollTop += delta;
    return true;
  };
  const wheel = (event: WheelEvent) => {
    // Leave zoom, horizontal gestures, dialogs and form controls to the browser.
    if (event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('.modal,.chapter-menu,input,select,textarea,iframe')) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? root.clientHeight : 1);
    const blocked = options.blocked();
    if (blocked) {
      event.preventDefault();
      if (gesture.next(delta, event.timeStamp, true)) options.navigate(Math.sign(delta));
      return;
    }
    const panel = readingPanel(target, delta);
    if (panel && canScroll(panel, delta)) {
      gesture.next(delta, event.timeStamp, true);
      return;
    }
    event.preventDefault();
    if (gesture.next(delta, event.timeStamp, false)) options.navigate(Math.sign(delta));
  };

  let touch: {
    x: number; y: number; lastY: number; target: Element | null;
    panel: HTMLElement | null; axis: 'x' | 'y' | null; blocked: boolean; moved: number; native: boolean;
  } | null = null;
  const touchStart = (event: TouchEvent) => {
    const point = event.touches[0];
    const target = event.target instanceof Element ? event.target : null;
    touch = event.touches.length !== 1 || target?.closest('.modal,.chapter-menu,input,select,textarea,iframe') ? null : {
      x: point.clientX, y: point.clientY, lastY: point.clientY, target,
      panel: null, axis: null, blocked: options.blocked(), moved: 0, native: false,
    };
  };
  const touchMove = (event: TouchEvent) => {
    if (!touch) return;
    if (event.touches.length !== 1) { touch = null; return; }
    const point = event.touches[0];
    const dx = point.clientX - touch.x, dy = point.clientY - touch.y;
    if (!touch.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 8) {
      touch.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (touch.axis === 'y') {
        touch.panel = readingPanel(touch.target, -dy);
        touch.native = !!touch.panel && !!touch.target && touch.panel.contains(touch.target) && !touch.blocked;
      }
    }
    if (touch.axis !== 'y') return;
    // Preserve native touch scrolling and momentum inside a reading panel.
    if (!touch.native) event.preventDefault();
    touch.moved = -dy;
    touch.blocked ||= options.blocked();
    // Pin the reading panel for the whole swipe, even when it reaches an edge.
    if (touch.panel && !touch.blocked && !touch.native) touch.panel.scrollTop += touch.lastY - point.clientY;
    touch.lastY = point.clientY;
  };
  const touchEnd = () => {
    if (touch?.axis === 'y' && !touch.panel && !touch.blocked && !options.blocked() && Math.abs(touch.moved) >= 65) {
      options.navigate(Math.sign(touch.moved));
    }
    touch = null;
  };
  const touchCancel = () => { touch = null; };

  root.addEventListener('wheel', wheel, { passive: false });
  root.addEventListener('touchstart', touchStart, { passive: true });
  root.addEventListener('touchmove', touchMove, { passive: false });
  root.addEventListener('touchend', touchEnd, { passive: true });
  root.addEventListener('touchcancel', touchCancel, { passive: true });
  return {
    scrollBy,
    destroy() {
      root.removeEventListener('wheel', wheel);
      root.removeEventListener('touchstart', touchStart);
      root.removeEventListener('touchmove', touchMove);
      root.removeEventListener('touchend', touchEnd);
      root.removeEventListener('touchcancel', touchCancel);
    },
  };
}
