import * as React from 'react';
export default function DeleteMyData() {
    return (
        <div style={{ margin:"10%" }}>
            <h3>Data Deletion Instructions</h3>
            <p>
                We do not store any personal data from users. If you wish to remove app permissions from your Facebook account, please follow these steps:
            </p>
            <ol>
            <li>Go to <a href="https://www.facebook.com/settings?tab=applications" target="_blank">Facebook Settings → Apps and Websites</a></li>
            <li>Find and select our app</li>
            <li>Click “Remove”</li>
            </ol>
        </div>
    )
}