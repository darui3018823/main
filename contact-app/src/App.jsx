import { useEffect, useState } from 'react';
import { CATEGORIES, LEGACY_KEYS } from './categories.js';
import ContactForm from './ContactForm.jsx';
import { CategoryIcon } from './icons.jsx';

const resolveKey = (raw) => {
    const key = LEGACY_KEYS[raw] || raw;
    return CATEGORIES.some((category) => category.key === key) ? key : null;
};

const readKeyFromUrl = () => resolveKey(new URLSearchParams(window.location.search).get('c'));

export default function App() {
    const [activeKey, setActiveKey] = useState(readKeyFromUrl);

    useEffect(() => {
        // 旧カテゴリキーや不正なキーで開かれた場合は URL を正規化しておく
        const raw = new URLSearchParams(window.location.search).get('c');
        const resolved = resolveKey(raw);
        if (raw && raw !== resolved) {
            const url = resolved ? `${window.location.pathname}?c=${resolved}` : window.location.pathname;
            window.history.replaceState(null, '', url);
        }

        const onPopState = () => setActiveKey(readKeyFromUrl());
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const navigate = (key) => {
        const url = key ? `${window.location.pathname}?c=${key}` : window.location.pathname;
        window.history.pushState(null, '', url);
        setActiveKey(key);
        window.scrollTo({ top: 0 });
    };

    const active = CATEGORIES.find((category) => category.key === activeKey) || null;

    return (
        <main className="contact-main">
            <section className="liquid-glass contact-panel" aria-labelledby="contactTitle">
                {active
                    ? <CategoryDetail category={active} onBack={() => navigate(null)} />
                    : <CategoryList onSelect={navigate} />}
            </section>
        </main>
    );
}

function CategoryList({ onSelect }) {
    return (
        <>
            <h1 id="contactTitle" className="contact-title">Contact!</h1>
            <p className="contact-lead">目的に合ったカテゴリを選ぶと、専用のお問い合わせフォームが開きます。</p>
            <p className="contact-note">
                <a href="/legal/privacy-policy/" className="contact-note-link">プライバシーポリシー</a>をご確認の上、お問い合わせください。
            </p>

            <div className="contact-list">
                {CATEGORIES.map((category) => (
                    <a
                        key={category.key}
                        className="contact-row"
                        href={`?c=${category.key}`}
                        onClick={(event) => {
                            if (event.metaKey || event.ctrlKey || event.shiftKey) return;
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
