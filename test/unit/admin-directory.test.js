const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Compile the frontend module in memory and replace all external I/O.
const source = fs.readFileSync(path.join(__dirname, '../../src/ebike-panel/ebike-panel-Function/directory.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function client({ status = 200, result = {}, cookie = JSON.stringify({ accessToken: 'test-token' }), failure } = {}) {
    const calls = [];
    const context = {
        exports: {},
        require(name) {
            if (name === 'globalconfig') return { default: { ebikeApi: 'https://example.test/api/' } };
            if (name === 'js-cookie') return { get: () => cookie };
            throw new Error(`Unexpected dependency: ${name}`);
        },
        async fetch(url, options) {
            calls.push({ url, options });
            if (failure) throw new Error(failure);
            return { ok: status >= 200 && status < 300, status, json: async () => result };
        },
    };
    vm.runInNewContext(compiled, context);
    return { ...context.exports, calls };
}

for (const kind of ['mechanic', 'dealer']) {
    test(`${kind}: read uses singular URL and login token without caching`, async () => {
        const record = { id: 12, shop_name: 'Ali Motors', is_approved: true };
        const api = client({ result: record });
        assert.equal(await api.getDirectoryRecord(kind, 12), record);
        const { url, options } = api.calls[0];
        assert.equal(url, `https://example.test/api/${kind}/get-${kind}-by-id/12`);
        assert.equal(options.method, 'GET');
        assert.equal(options.headers['x-access-token'], 'test-token');
        assert.equal(options.cache, 'no-store');
        assert.equal(options.body, undefined);
    });

    test(`${kind}: PUT serializes partial edits, phone strings, and false booleans`, async () => {
        const api = client({ result: { success: true, data: { id: 12 } } });
        const edits = { phone: '+923001234567', phone2: '', is_approved: false, is_featured: false, mechanic_type: 2 };
        await api.updateDirectoryRecord(kind, 12, edits);
        const { url, options } = api.calls[0];
        assert.equal(url, `https://example.test/api/${kind === 'dealer' ? 'dealers' : 'mechanic'}/update-${kind}/12`);
        assert.equal(options.method, 'PUT');
        assert.equal(options.headers['Content-Type'], 'application/json');
        assert.equal(options.headers['x-access-token'], 'test-token');
        assert.deepEqual(JSON.parse(options.body), edits);
    });

    test(`${kind}: profile-only edits omit approval, featured, ownership, and associations`, async () => {
        const api = client({ result: { success: true } });
        await api.updateDirectoryRecord(kind, 12, { shop_name: 'Ali Motors', phone: '03001234567', phone2: null });
        assert.deepEqual(JSON.parse(api.calls[0].options.body), { shop_name: 'Ali Motors', phone: '03001234567', phone2: null });
    });
}

for (const status of [400, 403, 404, 500]) {
    test(`HTTP ${status}: surfaces server error without reporting success`, async () => {
        const api = client({ status, result: { success: false, info: `Server error ${status}` } });
        await assert.rejects(api.updateDirectoryRecord('dealer', 12, { city_id: 2 }), new RegExp(`Server error ${status}`));
    });
}

test('accepts a wrapped read record', async () => {
    const record = { id: 12, shop_name: 'Ali Motors' };
    const api = client({ result: { success: true, data: record } });
    assert.equal(await api.getDirectoryRecord('mechanic', 12), record);
});

test('missing session does not send a request', async () => {
    const loggedOut = client({ cookie: '' });
    await assert.rejects(loggedOut.updateDirectoryRecord('mechanic', 12, { is_approved: true }), /log in again/);
    assert.equal(loggedOut.calls.length, 0);
});

test('shared JWT failure is surfaced even on an unexpected HTTP 200', async () => {
    const api = client({ result: { auth: false, message: 'Failed to authenticate token.' } });
    await assert.rejects(api.getDirectoryRecord('dealer', 12), /Failed to authenticate token/);
});

test('network failures propagate to the form', async () => {
    const api = client({ failure: 'Network unavailable' });
    await assert.rejects(api.updateDirectoryRecord('dealer', 12, { address: 'Main Road' }), /Network unavailable/);
});

test('missing record and unconfirmed save are rejected', async () => {
    const api = client({ result: {} });
    await assert.rejects(api.getDirectoryRecord('mechanic', 12), /Unable to load/);
    await assert.rejects(api.updateDirectoryRecord('mechanic', 12, { phone: '03001234567' }), /Unable to update/);
});
