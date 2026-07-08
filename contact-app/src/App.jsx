import { useCallback, useEffect, useRef, useState } from 'react';
import { CATEGORIES } from './categories.js';
import ContactForm from './ContactForm.jsx';
import { CategoryIcon } from './icons.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';

const CONTACT_PATH = '/contact/';
const PRIVACY_POLICY_PATH = '/contact/privacy-policy/';
const CONTACT_EXIT_MS = 180;
const CONTACT_ENTER_MS = 220;

const resolveKey = (raw) => (CATEGORIES.some((category) => category.key === raw) ? raw : null);

const readKeyFromUrl = () => resolveKey(new URLSearchParams(window.location.search).get('c'));

const normalizePath = (pathname) => pathname.replace(/\/+$/, '') || '/';

const isPrivacyPolicyPath = () => {
    const pathname = normalizePath(window.location.pathname);
    return pathname === normalizePath(PRIVACY_POLICY_PATH) || pathname === '/privacy-policy';
};

const readRouteFromUrl = () => ({
    page: isPrivacyPolicyPath() ? 'privacy-policy' : 'contact',
    activeKey: isPrivacyPolicyPath() ? null : readKeyFromUrl(),
});

const isPlainClick = (event) => !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0;
const isSameRoute = (a, b) => a.page === b.page && a.activeKey === b.activeKey;
const getContactMotionDirection = (currentRoute, nextRoute) => (
    currentRoute.activeKey && !nextRoute.activeKey ? 'back' : 'forward'
);

export default function App() {
    const [route, setRoute] = useState(readRouteFromUrl);
    const [renderedRoute, setRenderedRoute] = useState(route);
    const [contentMotion, setContentMotion] = useState('idle');
    const [contentDirection, setContentDirection] = useState('forward');
    const renderedRouteRef = useRef(renderedRoute);
    const transitionTimersRef = useRef([]);

    useEffect(() => {
        renderedRouteRef.current = renderedRoute;
    }, [renderedRoute]);

    const clearTransitionTimers = useCallback(() => {
        transitionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
        transitionTimersRef.current = [];
    }, []);

    const setRouteWithContactMotion = useCallback((nextRoute, preferredDirection) => {
        clearTransitionTimers();
        setRoute(nextRoute);

        const currentRoute = renderedRouteRef.current;
        const direction = preferredDirection || getContactMotionDirection(currentRoute, nextRoute);
        const shouldAnimate = currentRoute.page === 'contact'
            && nextRoute.page === 'contact'
            && !isSameRoute(currentRoute, nextRoute)
            && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!shouldAnimate) {
            setRenderedRoute(nextRoute);
            setContentMotion('idle');
            window.scrollTo({ top: 0 });
            return;
        }

        setContentDirection(direction);
        setContentMotion('exiting');
        const exitTimer = window.setTimeout(() => {
            setRenderedRoute(nextRoute);
            setContentMotion('entering');
            window.scrollTo({ top: 0 });

            const enterTimer = window.setTimeout(() => {
                setContentMotion('idle');
            }, CONTACT_ENTER_MS);
            transitionTimersRef.current = [enterTimer];
        }, CONTACT_EXIT_MS);
        transitionTimersRef.current = [exitTimer];
    }, [clearTransitionTimers]);

    useEffect(() => {
        // 旧カテゴリキーや不正なキーで開かれた場合は URL を正規化しておく
        const raw = new URLSearchParams(window.location.search).get('c');
        const resolved = resolveKey(raw);
        if (route.page === 'contact' && raw && raw !== resolved) {
            const url = resolved ? `${CONTACT_PATH}?c=${resolved}` : CONTACT_PATH;
            window.history.replaceState(null, '', url);
        }

        const onPopState = () => setRouteWithContactMotion(readRouteFromUrl());
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, [route.activeKey, route.page, setRouteWithContactMotion]);

    useEffect(() => clearTransitionTimers, [clearTransitionTimers]);

    useEffect(() => {
        document.title = route.page === 'privacy-policy'
            ? 'Privacy Policy | daruks.com'
            : 'Contact | daruks.com';
    }, [route.page]);

    const navigateContact = (key) => {
        const url = key ? `${CONTACT_PATH}?c=${key}` : CONTACT_PATH;
        window.history.pushState(null, '', url);
        setRouteWithContactMotion({ page: 'contact', activeKey: key }, key ? 'forward' : 'back');
    };

    const navigatePrivacyPolicy = () => {
        window.history.pushState(null, '', PRIVACY_POLICY_PATH);
        setRouteWithContactMotion({ page: 'privacy-policy', activeKey: null });
    };

    if (renderedRoute.page === 'privacy-policy') {
        return <PrivacyPolicy onBack={() => navigateContact(null)} />;
    }

    const activeKey = renderedRoute.activeKey;
    const active = CATEGORIES.find((category) => category.key === activeKey) || null;
    const motionClass = contentMotion === 'idle' ? '' : ` is-${contentDirection} is-${contentMotion}`;

    return (
        <main className="contact-main">
            <section className="liquid-glass contact-panel" aria-labelledby="contactTitle">
                <div className={`contact-panel-content${motionClass}`}>
                    {active
                        ? <CategoryDetail category={active} onBack={() => navigateContact(null)} />
                        : <CategoryList onSelect={navigateContact} onPrivacyPolicy={navigatePrivacyPolicy} />}
                </div>
            </section>
        </main>
    );
}

function CategoryList({ onSelect, onPrivacyPolicy }) {
    return (
        <>
            <h1 id="contactTitle" className="contact-title">Contact!</h1>
            <p className="contact-lead">目的に合ったカテゴリを選ぶと、専用のお問い合わせフォームが開きます。</p>
            <p className="contact-note contact-policy-note">
                <a
                    href={PRIVACY_POLICY_PATH}
                    className="contact-note-link"
                    onClick={(event) => {
                        if (!isPlainClick(event)) return;
                        event.preventDefault();
                        onPrivacyPolicy();
                    }}
                >
                    プライバシーポリシー
                </a>をご確認の上、お問い合わせください。
            </p>
            <p className="contact-note contact-mail-note">
                お困りですか？
                <a href="mailto:contact@daruks.com" className="contact-note-link">contact@daruks.com</a>
                にメールすることでもお問い合わせいただけます。
            </p>

            <div className="contact-list">
                {CATEGORIES.map((category) => (
                    <a
                        key={category.key}
                        className="contact-row"
                        href={`?c=${category.key}`}
                        onClick={(event) => {
                            if (!isPlainClick(event)) return;
                            event.preventDefault();
                            onSelect(category.key);
                        }}
                    >
                        <div className={`contact-media${category.icon === 'ahoshinet' ? ' is-logo' : ''}`} aria-hidden="true">
                            <CategoryIcon icon={category.icon} />
                        </div>
                        <div className="contact-body">
                            <div className="contact-topline">
                                <h2 className="contact-name">{category.listTitle}</h2>
                                <span className="contact-open">選択 →</span>
                            </div>
                            <p className="contact-description">{category.listDescription}</p>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
}

function CategoryDetail({ category, onBack }) {
    return (
        <>
            <a
                className="contact-back"
                href="/contact/"
                onClick={(event) => {
                    event.preventDefault();
                    onBack();
                }}
            >
                ← カテゴリ一覧へ戻る
            </a>

            <h1 id="contactTitle" className="contact-detail-title">{category.formTitle}</h1>
            <p className="contact-lead">{category.formDescription}</p>

            {category.direct
                ? (
                    <div className="contact-direct">
                        <a className="contact-submit contact-direct-link" href={category.direct.url} target="_blank" rel="noopener noreferrer">
                            {category.direct.label}
                        </a>
                    </div>
                )
                : <ContactForm category={category} />}

            <p className="contact-footnote">
                ※ 通常24〜48時間以内に返信いたします。<br />
                ※ お問い合わせ内容によっては返信が遅れる場合や返信できない場合がございます。あらかじめご了承ください。
            </p>
        </>
    );
}
