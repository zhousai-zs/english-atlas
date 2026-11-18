const STORE_KEY = 'english-atlas:progress';
const THEME_KEY = 'english-atlas:theme';

interface QuizRecord {
  score: number;
  total: number;
  best: number;
  updatedAt: string;
}

interface LessonRecord {
  completed: boolean;
  updatedAt: string;
  quiz?: QuizRecord;
}

interface Store {
  lessons: Record<string, LessonRecord>;
}

interface QuizKey {
  id: string;
  questions: { type: 'choice' | 'fill'; answer: number | string[]; explain: string }[];
}

function load(): Store {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { lessons: {} };
    const data = JSON.parse(raw) as Store;
    if (!data || typeof data !== 'object' || !data.lessons) return { lessons: {} };
    return data;
  } catch {
    return { lessons: {} };
  }
}

function save(store: Store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
  document.dispatchEvent(new CustomEvent('ea-progress'));
}

function baseUrl(): string {
  return document.querySelector('meta[name="ea-base"]')?.getAttribute('content') || '/';
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return map[char] ?? char;
  });
}

function norm(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/[.。!！?？,，;；:：]+$/g, '');
}

function paint() {
  const store = load();
  document.querySelectorAll<HTMLElement>('[data-nav-id]').forEach((node) => {
    const id = node.dataset.navId || '';
    const done = Boolean(store.lessons[id]?.completed);
    node.classList.toggle('is-done', done);
    const mark = node.querySelector<HTMLElement>('.nav-mark');
    if (mark) mark.hidden = !done;
  });
  document.querySelectorAll<HTMLButtonElement>('[data-complete]').forEach((button) => {
    const id = button.dataset.complete || '';
    const done = Boolean(store.lessons[id]?.completed);
    button.setAttribute('aria-pressed', String(done));
    button.textContent = done ? '已学完 · 点击可取消' : '标记为已学完';
  });
  document.querySelectorAll<HTMLElement>('[data-score-for]').forEach((node) => {
    const quiz = store.lessons[node.dataset.scoreFor || '']?.quiz;
    if (!quiz) {
      node.hidden = true;
      return;
    }
    node.hidden = false;
    node.textContent = `这台设备上的测验记录：最近 ${quiz.score} / ${quiz.total}，最好 ${quiz.best} / ${quiz.total}`;
  });
  document.querySelectorAll<HTMLElement>('[data-state-for]').forEach((node) => {
    const done = Boolean(store.lessons[node.dataset.stateFor || '']?.completed);
    node.textContent = done ? '已学完' : '未学完';
  });
  document.querySelectorAll<HTMLElement>('[data-quiz-for]').forEach((node) => {
    const quiz = store.lessons[node.dataset.quizFor || '']?.quiz;
    node.textContent = quiz ? `${quiz.best} / ${quiz.total}` : '—';
  });
  const summary = document.querySelector<HTMLElement>('[data-progress-summary]');
  if (summary) {
    const ids = [...document.querySelectorAll<HTMLElement>('[data-track-id]')].map((node) => node.dataset.trackId || '');
    const done = ids.filter((id) => store.lessons[id]?.completed).length;
    const quizzed = ids.filter((id) => store.lessons[id]?.quiz).length;
    summary.textContent = `已学完 ${done} / ${ids.length} 课，有测验记录的 ${quizzed} 课。数据只在这台浏览器里。`;
  }
  const resume = document.querySelector<HTMLAnchorElement>('#resume-link');
  const resumeNote = document.querySelector<HTMLElement>('#resume-note');
  const orderNode = document.querySelector<HTMLScriptElement>('#path-order');
  if (resume && orderNode?.textContent) {
    const order = JSON.parse(orderNode.textContent) as { ref: string; href: string; title: string }[];
    const next = order.find((item) => !store.lessons[item.ref]?.completed) ?? order[0];
    const done = order.filter((item) => store.lessons[item.ref]?.completed).length;
    if (next) {
      resume.href = next.href;
      resume.textContent = done === 0 ? `从「${next.title}」开始` : `继续学「${next.title}」`;
    }
    if (resumeNote) resumeNote.textContent = done === 0 ? '还没有学习记录。第一课是字母和拼读。' : `已学完路径中的 ${done} / ${order.length} 课。`;
  }
}

function setupTheme() {
  const button = document.querySelector<HTMLButtonElement>('#theme-toggle');
  const syncLabel = () => {
    if (!button) return;
    const dark = document.documentElement.classList.contains('dark');
    button.setAttribute('aria-pressed', String(dark));
    button.textContent = dark ? '浅色' : '深色';
    button.setAttribute('aria-label', dark ? '切换到浅色模式' : '切换到深色模式');
  };
  syncLabel();
  button?.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem(THEME_KEY, next);
    syncLabel();
  });
}

function setupHeaderChrome() {
  const header = document.querySelector<HTMLElement>('.header');
  const search = document.querySelector<HTMLInputElement>('#site-search');
  const wide = window.matchMedia('(min-width: 961px)');
  const syncPlaceholder = () => {
    if (!search) return;
    const next = wide.matches ? '搜索，按 / 聚焦' : '搜索课程';
    if (search.placeholder !== next) search.placeholder = next;
  };
  const syncHeaderHeight = () => {
    if (!header) return;
    const height = Math.round(header.getBoundingClientRect().height);
    if (height > 0) document.documentElement.style.setProperty('--header', `${height}px`);
  };
  syncPlaceholder();
  syncHeaderHeight();
  wide.addEventListener('change', () => {
    syncPlaceholder();
    syncHeaderHeight();
  });
  if (header && 'ResizeObserver' in window) {
    const observer = new ResizeObserver(() => syncHeaderHeight());
    observer.observe(header);
  } else {
    window.addEventListener('resize', syncHeaderHeight);
  }
  document.fonts?.ready.then(syncHeaderHeight).catch(() => undefined);
}

function setupNav() {
  const toggle = document.querySelector<HTMLButtonElement>('#nav-toggle');
  const closeBtn = document.querySelector<HTMLButtonElement>('#nav-close');
  const sidebar = document.querySelector<HTMLElement>('#sidebar');
  const backdrop = document.querySelector<HTMLElement>('#nav-backdrop');
  const mainCol = document.querySelector<HTMLElement>('.main-col');
  const mobileQuery = window.matchMedia('(max-width: 960px)');
  let lockedScrollY = 0;

  const scrollCurrent = () => {
    if (!sidebar) return;
    const current = sidebar.querySelector<HTMLElement>('[aria-current="page"]');
    if (!current) return;
    const bar = sidebar.querySelector<HTMLElement>('.drawer-bar');
    const barHeight = bar && getComputedStyle(bar).display !== 'none' ? bar.offsetHeight : 0;
    const clearance = Math.max(barHeight + 12, Math.round(sidebar.clientHeight / 3));
    const delta = current.getBoundingClientRect().top - sidebar.getBoundingClientRect().top;
    sidebar.scrollTop = Math.max(0, sidebar.scrollTop + delta - clearance);
  };

  const lockScroll = () => {
    lockedScrollY = window.scrollY;
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.classList.add('nav-open');
    document.documentElement.classList.add('nav-open');
  };

  const unlockScroll = () => {
    document.body.classList.remove('nav-open');
    document.documentElement.classList.remove('nav-open');
    document.body.style.top = '';
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, lockedScrollY);
    root.style.scrollBehavior = previous;
  };

  const setOpen = (open: boolean, returnFocus: boolean) => {
    const mobile = mobileQuery.matches;
    const next = open && mobile;
    const wasOpen = document.body.classList.contains('nav-open');
    if (!next && sidebar && document.activeElement instanceof Node && sidebar.contains(document.activeElement)) {
      toggle?.focus({ preventScroll: true });
    }
    if (next && !wasOpen) lockScroll();
    else if (!next && wasOpen) unlockScroll();
    toggle?.setAttribute('aria-expanded', String(next));
    toggle?.setAttribute('aria-label', next ? '关闭目录' : '打开目录');
    if (backdrop) backdrop.hidden = !next;
    if (sidebar) {
      if (mobile && !next) sidebar.setAttribute('inert', '');
      else sidebar.removeAttribute('inert');
    }
    mainCol?.toggleAttribute('inert', next);
    if (next) {
      window.requestAnimationFrame(() => {
        scrollCurrent();
        closeBtn?.focus({ preventScroll: true });
      });
    } else if (returnFocus) {
      toggle?.focus({ preventScroll: true });
    }
  };

  toggle?.addEventListener('click', () => {
    const willOpen = !document.body.classList.contains('nav-open');
    setOpen(willOpen, !willOpen);
  });
  backdrop?.addEventListener('click', () => setOpen(false, true));
  closeBtn?.addEventListener('click', () => setOpen(false, true));
  sidebar?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false, false)));

  const scrollKeys = new Set(['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);
  document.addEventListener('keydown', (event) => {
    const open = document.body.classList.contains('nav-open');
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false, true);
      return;
    }
    if (open && scrollKeys.has(event.key)) {
      const target = event.target;
      if (target instanceof Node && sidebar?.contains(target)) {
        if (sidebar && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
          sidebar.scrollBy({ top: event.key === 'ArrowDown' ? 56 : -56, behavior: 'auto' });
          event.preventDefault();
        }
        return;
      }
      event.preventDefault();
      return;
    }
    const target = event.target as HTMLElement | null;
    const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    if (event.key === '/' && !typing && !open) {
      event.preventDefault();
      document.querySelector<HTMLInputElement>('#site-search')?.focus();
    }
  });

  const allowScrollTarget = (target: EventTarget | null) => {
    if (!(target instanceof Node)) return false;
    if (sidebar?.contains(target)) return true;
    if (target instanceof HTMLElement && target.closest('input, textarea, select')) return true;
    return false;
  };
  const blockBackgroundScroll = (event: Event) => {
    if (!document.body.classList.contains('nav-open')) return;
    if (allowScrollTarget(event.target)) return;
    event.preventDefault();
  };
  document.addEventListener('touchmove', blockBackgroundScroll, { passive: false });
  document.addEventListener('wheel', blockBackgroundScroll, { passive: false });

  mobileQuery.addEventListener('change', () => {
    setOpen(false, false);
    if (!mobileQuery.matches) scrollCurrent();
  });
  setOpen(false, false);
  if (!mobileQuery.matches) scrollCurrent();
}

function setupComplete() {
  document.querySelectorAll<HTMLButtonElement>('[data-complete]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.complete || '';
      const store = load();
      const prev = store.lessons[id];
      const completed = !prev?.completed;
      store.lessons[id] = {
        completed,
        updatedAt: new Date().toISOString(),
        quiz: prev?.quiz,
      };
      save(store);
    });
  });
}

function setupReset() {
  const button = document.querySelector<HTMLButtonElement>('#reset-progress');
  button?.addEventListener('click', () => {
    const sure = window.confirm('清除这台浏览器上的学习进度和测验成绩？');
    if (!sure) return;
    localStorage.removeItem(STORE_KEY);
    document.dispatchEvent(new CustomEvent('ea-progress'));
  });
}

function setupFilters() {
  const bar = document.querySelector<HTMLElement>('.filters');
  if (!bar) return;
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const cards = [...document.querySelectorAll<HTMLElement>('[data-cost]')];
  const apply = (filter: string) => {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.cost === filter || card.dataset.stage === filter;
      card.hidden = !match;
    });
  };
  buttons.forEach((button) => button.addEventListener('click', () => apply(button.dataset.filter || 'all')));
}

function setupQuiz(form: HTMLFormElement) {
  const keyNode = form.querySelector<HTMLScriptElement>('.quiz-key');
  if (!keyNode?.textContent) return;
  const key = JSON.parse(keyNode.textContent) as QuizKey;
  const items = [...form.querySelectorAll<HTMLElement>('.quiz-item')];
  const answered = new Set<number>();

  const finish = () => {
    if (answered.size !== key.questions.length) return;
    let score = 0;
    items.forEach((item) => {
      if (item.dataset.result === 'correct') score += 1;
    });
    const scoreNode = form.querySelector<HTMLElement>('.quiz-score');
    if (scoreNode) scoreNode.textContent = `本次 ${score} / ${key.questions.length}。说明已经写在每题下面，错题看完可以再做一次。`;
    const store = load();
    const prev = store.lessons[key.id];
    const best = Math.max(score, prev?.quiz?.best ?? 0);
    store.lessons[key.id] = {
      completed: true,
      updatedAt: new Date().toISOString(),
      quiz: { score, total: key.questions.length, best, updatedAt: new Date().toISOString() },
    };
    save(store);
  };

  const reveal = (item: HTMLElement, index: number, ok: boolean) => {
    if (answered.has(index)) return;
    answered.add(index);
    item.dataset.result = ok ? 'correct' : 'wrong';
    const feedback = item.querySelector<HTMLElement>('.feedback');
    if (feedback) {
      feedback.textContent = `${ok ? '答对了。' : '这题再看一次。'}${key.questions[index].explain}`;
    }
    item.querySelectorAll('input, button').forEach((control) => {
      (control as HTMLInputElement).disabled = true;
    });
    finish();
  };

  items.forEach((item, index) => {
    const question = key.questions[index];
    if (question.type === 'choice') {
      item.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((input) => {
        input.addEventListener('change', () => {
          reveal(item, index, Number(input.value) === question.answer);
        });
      });
      return;
    }
    const check = () => {
      const input = item.querySelector<HTMLInputElement>('input[type="text"]');
      if (!input) return;
      const accepted = (question.answer as string[]).map(norm);
      reveal(item, index, accepted.includes(norm(input.value)));
    };
    item.querySelector<HTMLButtonElement>('.check')?.addEventListener('click', check);
    item.querySelector<HTMLInputElement>('input[type="text"]')?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        check();
      }
    });
  });

  form.addEventListener('focusin', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const item = target.closest<HTMLElement>('.quiz-item');
    if (!item) return;
    window.requestAnimationFrame(() => {
      const bar = document.querySelector<HTMLElement>('.header');
      const limit = (bar?.getBoundingClientRect().height ?? 0) + 12;
      const top = item.getBoundingClientRect().top;
      if (top < limit) window.scrollBy({ top: top - limit, behavior: 'auto' });
    });
  });

  form.querySelector<HTMLButtonElement>('.retry')?.addEventListener('click', () => {
    answered.clear();
    items.forEach((item) => {
      delete item.dataset.result;
      const feedback = item.querySelector<HTMLElement>('.feedback');
      if (feedback) feedback.textContent = '';
      item.querySelectorAll<HTMLInputElement | HTMLButtonElement>('input, button').forEach((control) => {
        control.disabled = false;
        if (control instanceof HTMLInputElement) {
          if (control.type === 'radio') control.checked = false;
          if (control.type === 'text') control.value = '';
        }
      });
    });
    const scoreNode = form.querySelector<HTMLElement>('.quiz-score');
    if (scoreNode) scoreNode.textContent = '';
  });
}

interface SearchDoc {
  ref: string;
  href: string;
  section: string;
  title: string;
  titleEn: string;
  summary: string;
  text: string;
}

function snippet(text: string, query: string): string {
  const hay = text.toLowerCase();
  const needle = query.toLowerCase();
  const at = hay.indexOf(needle);
  if (at < 0) return text.slice(0, 150);
  const start = Math.max(0, at - 36);
  const raw = `${start > 0 ? '…' : ''}${text.slice(start, start + 170)}…`;
  const safe = escapeHtml(raw);
  const pattern = new RegExp(escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
  return safe.replace(pattern, (match) => `<mark>${match}</mark>`);
}

function setupSearch() {
  const input = document.querySelector<HTMLInputElement>('#search-query');
  const headerInput = document.querySelector<HTMLInputElement>('#site-search');
  const results = document.querySelector<HTMLElement>('#search-results');
  const status = document.querySelector<HTMLElement>('#search-status');
  const initial = new URLSearchParams(window.location.search).get('q') || '';
  if (headerInput && initial) headerInput.value = initial;
  if (!input || !results || !status) return;

  let docs: SearchDoc[] | null = null;
  let loading: Promise<void> | null = null;

  const ensure = () => {
    if (docs) return Promise.resolve();
    if (!loading) {
      loading = fetch(`${baseUrl()}search-index.json`)
        .then((response) => response.json())
        .then((data: SearchDoc[]) => {
          docs = data;
        });
    }
    return loading;
  };

  const render = async () => {
    const query = input.value.trim();
    const params = new URLSearchParams(window.location.search);
    if (query) params.set('q', query);
    else params.delete('q');
    const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
    window.history.replaceState(null, '', next);
    if (!query) {
      status.textContent = '输入中文或英文，例如「冠词」「present perfect」「queue」。';
      results.innerHTML = '';
      return;
    }
    status.textContent = '正在查找…';
    try {
      await ensure();
    } catch {
      status.textContent = '检索索引没有载入。请刷新后再试。';
      return;
    }
    const q = query.toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);
    const ranked = (docs ?? [])
      .map((doc) => {
        const title = doc.title.toLowerCase();
        const titleEn = doc.titleEn.toLowerCase();
        const summary = doc.summary.toLowerCase();
        const text = doc.text.toLowerCase();
        let score = 0;
        if (title.includes(q)) score += 120;
        if (titleEn.includes(q)) score += 100;
        if (summary.includes(q)) score += 40;
        if (text.includes(q)) score += 24;
        if (words.length > 1 && words.every((word) => `${title} ${titleEn} ${summary} ${text}`.includes(word))) score += 36;
        return { doc, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30);
    status.textContent = ranked.length ? `找到 ${ranked.length} 条` : `没有找到与「${query}」匹配的内容。`;
    results.innerHTML = ranked
      .map(({ doc }) => {
        const source = [doc.summary, doc.text]
          .map((field) => {
            const value = field.trim();
            if (!value) return '';
            return /[。．.!?！？;；:：…]$/.test(value) ? value : `${value}.`;
          })
          .filter(Boolean)
          .join(' ');
        return `<li><a class="card" href="${escapeHtml(doc.href)}"><span class="chip">${escapeHtml(doc.section)}</span><h3>${escapeHtml(doc.title)}</h3><p class="card-en" lang="en">${escapeHtml(doc.titleEn)}</p><p>${snippet(source, query)}</p></a></li>`;
      })
      .join('');
  };

  if (initial) input.value = initial;
  const mirrorHeader = () => {
    if (headerInput && headerInput.value !== input.value) headerInput.value = input.value;
  };
  input.addEventListener('input', () => {
    mirrorHeader();
    window.clearTimeout(Number(input.dataset.timer || 0));
    const timer = window.setTimeout(() => void render(), 120);
    input.dataset.timer = String(timer);
  });
  headerInput?.addEventListener('input', () => {
    if (!headerInput || input.value === headerInput.value) return;
    input.value = headerInput.value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  headerInput?.form?.addEventListener('submit', (event) => {
    if (!headerInput) return;
    event.preventDefault();
    if (input.value !== headerInput.value) input.value = headerInput.value;
    window.clearTimeout(Number(input.dataset.timer || 0));
    void render();
  });
  if (initial) void render();
  else status.textContent = '输入中文或英文，例如「冠词」「present perfect」「queue」。';
}

setupTheme();
setupHeaderChrome();
setupNav();
setupComplete();
setupReset();
setupFilters();
document.querySelectorAll<HTMLFormElement>('.quiz').forEach(setupQuiz);
setupSearch();
paint();
document.addEventListener('ea-progress', paint);
