import * as React from 'react';
import Link from 'next/link';

export default function DeleteMyData() {
    return (
        <div style={{ margin: "10%", lineHeight: 1.7 }}>
            <h3>Data Deletion Instructions</h3>
            <p>
                You can submit your account deletion request by visiting the{' '}
                <Link href="/my-ads">My Ads</Link> page and clicking the delete account button.
            </p>
            <p>
                We do not use user data for any marketing purposes.
            </p>
            <p>
                Once the account deletion request is submitted, the account will be deleted within 7 working days.
            </p>
        </div>
    )
}
