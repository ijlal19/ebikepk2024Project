'use client';

import { useEffect, useState } from 'react';
import { Alert, Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem, TextField } from '@mui/material';
import { getbrandData, getCityData } from '@/ebike-panel/ebike-panel-Function/globalfunction';
import { DirectoryEdits, DirectoryKind, getDirectoryRecord, updateDirectoryRecord } from '@/ebike-panel/ebike-panel-Function/directory';
import { MECHANIC_TYPE_OPTIONS } from '@/constants/mechanicType';

const textFields = ['shop_name', 'address', 'phone', 'phone2'] as const;
const integerFields = ['brand_id', 'city_id', 'mechanic_type'] as const;
const booleanFields = ['request_for_featured', 'is_approved', 'is_featured'] as const;
type FormValues = Record<typeof textFields[number] | typeof integerFields[number], string> & Record<typeof booleanFields[number], boolean>;

function formValues(record: any): FormValues {
    return {
        shop_name: String(record.shop_name ?? ''), address: String(record.address ?? ''),
        phone: String(record.phone ?? ''), phone2: String(record.phone2 ?? ''),
        brand_id: String(record.brand_id ?? ''), city_id: String(record.city_id ?? ''),
        mechanic_type: String(record.mechanic_type ?? 1),
        request_for_featured: record.request_for_featured === true,
        is_approved: record.is_approved === true, is_featured: record.is_featured === true,
    };
}

export default function DirectoryEdit({ kind, id, onClose, onSaved }: {
    kind: DirectoryKind; id: number | string; onClose: () => void; onSaved: () => void;
}) {
    const [initial, setInitial] = useState<FormValues | null>(null);
    const [values, setValues] = useState<FormValues | null>(null);
    const [brands, setBrands] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [retry, setRetry] = useState(0);
    const title = kind === 'dealer' ? 'Dealer' : 'Mechanic';

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError('');
        Promise.all([getDirectoryRecord(kind, id), getbrandData(), getCityData()])
            .then(([record, brandList, cityList]) => {
                if (!active) return;
                const loaded = formValues(record);
                setInitial(loaded);
                setValues(loaded);
                setBrands(Array.isArray(brandList) ? brandList : []);
                setCities(Array.isArray(cityList) ? cityList : []);
            })
            .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Unable to load record.'); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [kind, id, retry]);

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!values || !initial || saving) return;
        setError('');
        const edits: DirectoryEdits = {};
        for (const field of textFields) {
            if (values[field] === initial[field]) continue;
            const value = values[field].trim();
            if (value === initial[field]) continue;
            if ((field !== 'phone2' && !value) || value.length > 255) {
                setError(`${field.replace('_', ' ')} must ${field === 'phone2' ? '' : 'be non-empty and '}contain at most 255 characters.`); return;
            }
            edits[field] = value;
        }
        for (const field of integerFields) {
            if (values[field] === initial[field]) continue;
            const value = Number(values[field]);
            if (!/^\d+$/.test(values[field]) || !Number.isSafeInteger(value) || value < 1 || value > 2147483647) {
                setError('Brand, city and type must be positive database integers.'); return;
            }
            edits[field] = value;
        }
        for (const field of booleanFields) {
            if (values[field] !== initial[field]) edits[field] = values[field];
        }
        if (!Object.keys(edits).length) { setError('Change at least one field before saving.'); return; }
        setSaving(true);
        try {
            await updateDirectoryRecord(kind, id, edits);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to save. Please try again.');
            setSaving(false);
            return;
        }
        setSaving(false);
        onSaved();
    };

    return <Dialog open onClose={() => { if (!saving) onClose(); }} fullWidth maxWidth="sm" aria-labelledby="directory-edit-title">
        <Box component="form" onSubmit={submit}>
            <DialogTitle id="directory-edit-title">Edit {title} #{id}</DialogTitle>
            <DialogContent dividers>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress aria-label="Loading record" /></Box> : values ?
                    <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
                        {textFields.map(field => <TextField key={field}
                            label={{ shop_name: 'Shop name', address: 'Address', phone: 'Phone', phone2: 'Secondary phone' }[field]}
                            value={values[field]} type={field.startsWith('phone') ? 'tel' : 'text'}
                            inputProps={{ maxLength: 255 }} disabled={saving}
                            onChange={event => setValues({ ...values, [field]: event.target.value })}
                            helperText={field === 'phone2' ? 'Leave empty to clear the secondary number.' : undefined} />)}
                        {(['brand_id', 'city_id'] as const).map(field => {
                            const options = field === 'brand_id' ? brands : cities;
                            return <TextField key={field} select label={field === 'brand_id' ? 'Brand' : 'City'} value={values[field]}
                                disabled={saving} onChange={event => setValues({ ...values, [field]: event.target.value })}>
                                <MenuItem value="">Select {field === 'brand_id' ? 'brand' : 'city'}</MenuItem>
                                {values[field] && !options.some(option => String(option.id) === values[field]) && <MenuItem value={values[field]}>Current ID: {values[field]}</MenuItem>}
                                {options.map(option => <MenuItem key={option.id} value={String(option.id)}>{field === 'brand_id' ? option.brandName : option.city_name}</MenuItem>)}
                            </TextField>;
                        })}
                        <TextField select label="Type" value={values.mechanic_type} disabled={saving}
                            onChange={event => setValues({ ...values, mechanic_type: event.target.value })}>
                            {!MECHANIC_TYPE_OPTIONS.some(option => String(option.value) === values.mechanic_type) && <MenuItem value={values.mechanic_type}>Current type: {values.mechanic_type}</MenuItem>}
                            {MECHANIC_TYPE_OPTIONS.map(option => <MenuItem key={option.value} value={String(option.value)}>{kind === 'dealer' ? option.dealerLabel : option.mechanicLabel}</MenuItem>)}
                        </TextField>
                        {booleanFields.map(field => <FormControlLabel key={field} label={{ request_for_featured: 'Requested featured listing', is_approved: 'Approved', is_featured: 'Featured' }[field]}
                            control={<Checkbox checked={values[field]} disabled={saving} onChange={event => setValues({ ...values, [field]: event.target.checked })} />} />)}
                    </Box> : <Button onClick={() => setRetry(value => value + 1)}>Retry loading</Button>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={saving}>Cancel</Button>
                <Button type="submit" variant="contained" disabled={loading || saving || !values}>{saving ? 'Saving…' : 'Save changes'}</Button>
            </DialogActions>
        </Box>
    </Dialog>;
}
