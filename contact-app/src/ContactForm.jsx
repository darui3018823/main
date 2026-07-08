import { useState } from 'react';
import { FORMSPREE_URL } from './categories.js';

const REPLY_METHODS = [
    { value: 'email', label: 'Email' },
    { value: 'discord', label: 'Discord' },
    { value: 'other_sns', label: 'その他SNS' },
    { value: 'no_reply', label: '返信不希望' },
];

export default function ContactForm({ category }) {
    const [status, setStatus] = useState('idle'); // idle | sending | error | success
    const [replyMethod, setReplyMethod] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        if (status === 'sending') return;

        const formData = new FormData(event.currentTarget);
        setStatus('sending');

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`Formspree request failed: ${response.status}`);
            }
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="contact-result" role="status">
                <p className="contact-result-title">送信しました。</p>
                <p className="contact-description">お問い合わせありがとうございます。内容を確認のうえ、ご連絡いたします。</p>
            </div>
        );
    }

    return (
        <form className="contact-form" onSubmit={onSubmit}>
            <input type="hidden" name="category" value={category.key} />

            <input
                className="contact-input"
                type="text"
                name="name"
                placeholder="お名前（またはニックネーム）"
                required
            />

            <input
                className="contact-input"
                type="text"
                name="title"
                placeholder="件名・タイトル"
                required
            />

            <label className="contact-field">
                <span className="contact-label">詳細カテゴリ</span>
                <select className="contact-input" name="subcategory" defaultValue="">
                    <option value="">選択してください</option>
                    {category.subcategories.map((subcategory) => (
                        <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                </select>
            </label>

            <label className="contact-field">
                <span className="contact-label">緊急度</span>
                <select className="contact-input" name="priority" required defaultValue="">
                    <option value="">選択してください</option>
                    <option value="low">低 - 時間をかけて対応</option>
                    <option value="medium">中 - 通常の対応</option>
                    <option value="high">高 - なるべく早く対応してほしい</option>
                </select>
            </label>

            <label className="contact-field">
                <span className="contact-label">返信希望の方法</span>
                <select
                    className="contact-input"
                    name="reply_method"
                    required
                    value={replyMethod}
                    onChange={(event) => setReplyMethod(event.target.value)}
                >
                    <option value="">選択してください</option>
                    {REPLY_METHODS.map((method) => (
                        <option key={method.value} value={method.value}>{method.label}</option>
                    ))}
                </select>
            </label>

            {replyMethod === 'email' && (
                <div className="contact-field">
                    <p className="contact-hint">daruks.comからのメールを受け取れるようにお願いします</p>
                    <input
                        className="contact-input"
                        type="email"
                        name="reply_contact_email"
                        placeholder="example@example.com"
                        required
                    />
                </div>
            )}

            {replyMethod === 'discord' && (
                <div className="contact-field">
                    <p className="contact-hint">@darui3018823から DM にて返信します</p>
                    <input
                        className="contact-input"
                        type="text"
                        name="reply_contact_discord"
                        placeholder="UserName"
                        required
                    />
                </div>
            )}

            {replyMethod === 'other_sns' && (
                <div className="contact-field">
                    <p className="contact-hint">ものによっては送信できない場合があります</p>
                    <textarea
                        className="contact-input"
                        name="reply_contact_sns"
                        placeholder="Twitter, @kantei"
                        rows={2}
                        required
                    />
                </div>
            )}

            <textarea
                className="contact-input"
                name="message"
                placeholder="お問い合わせ内容"
                rows={5}
                required
            />

            {status === 'error' && (
                <p className="contact-error" role="alert">
                    送信に失敗しました。時間をおいて再度お試しください。
                </p>
            )}

            <button className="contact-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? '送信中…' : '送信'}
            </button>
        </form>
    );
}
