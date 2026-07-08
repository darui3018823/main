import { useEffect, useState } from 'react';
import { CATEGORIES } from './categories.js';
import ContactForm from './ContactForm.jsx';
import { CategoryIcon } from './icons.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';

const CONTACT_PATH = '/contact/';
const PRIVACY_POLICY_PATH = '/contact/privacy-policy/';

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

export default function App() {
    const [route, setRoute] = useState(readRouteFromUrl);

    useEffect(() => {
        // 旧カテゴリキーや不正なキーで開かれた場合は URL を正規化しておく
        const raw = new URLSearchParams(window.location.search).get('c');
        const resolved = resolveKey(raw);
        if (route.page === 'contact' && raw && raw !== resolved) {
            const url = resolved ? `${CONTACT_PATH}?c=${resolved}` : CONTACT_PATH;
            window.history.replaceState(null, '', url);
        }

        const onPopState = () => setRoute(readRouteFromUrl());
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, [route.page]);

    useEffect(() => {
        document.title = route.page === 'privacy-policy'
            ? 'Privacy Policy | daruks.com'
            : 'Contact | daruks.com';
    }, [route.page]);

    const navigateContact = (key) => {
        const url = key ? `${CONTACT_PATH}?c=${key}` : CONTACT_PATH;
        window.history.pushState(null, '', url);
        setRoute({ page: 'contact', activeKey: key });
        window.scrollTo({ top: 0 });
    };

    const navigatePrivacyPolicy = () => {
        window.history.pushState(null, '', PRIVACY_POLICY_PATH);
        setRoute({ page: 'privacy-policy', activeKey: null });
        window.scrollTo({ top: 0 });
    };

    if (route.page === 'privacy-policy') {
        return <PrivacyPolicy onBack={() => navigateContact(null)} />;
    }

    const activeKey = route.activeKey;
    const active = CATEGORIES.find((category) => category.key === activeKey) || null;

    return (
        <main className="contact-main">
            <section className="liquid-glass contact-panel" aria-labelledby="contactTitle">
                {active
                    ? <CategoryDetail category={active} onBack={() => navigateContact(null)} />
                    : <CategoryList onSelect={navigateContact} onPrivacyPolicy={navigatePrivacyPolicy} />}
            </section>
        </main>
    );
}

function CategoryList({ onSelect, onPrivacyPolicy }) {
    return (
        <>
            <h1 id="contactTitle" className="contact-title">Contact!</h1>
            <p className="contact-lead">目的に合ったカテゴリを選ぶと、専用のお問い合わせフォームが開きます。</p>
            <p className="contact-note">
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
