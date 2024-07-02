import { FormEvent } from 'react';

import { TableImageCellOptions } from '@grafana/schema';
import { Field, Input } from '@grafana/ui';

import { TableCellEditorProps } from '../TableCellOptionEditor';

export const ImageCellOptionsEditor = ({
    cellOptions,
    onChange,
}: TableCellEditorProps<TableImageCellOptions>) => {
    const onAltChange = (e: FormEvent<HTMLInputElement>) => {
        cellOptions.alt = e.currentTarget.value;
        onChange(cellOptions);
    };

    const onTitleChange = (e: FormEvent<HTMLInputElement>) => {
        cellOptions.alt = e.currentTarget.value;
        onChange(cellOptions);
    }

    return (
        <>
            <Field label="Alt text" description="Alternative text that will be displayed if an image can't be displayed or for users that use a screen reader">
                <Input onChange={onAltChange} value={cellOptions.alt} />
            </Field>

            <Field label="Title text" description="Text that will show when the image is hovered by a cursor">
                <Input onChange={onTitleChange} value={cellOptions.title} />
            </Field>
        </>
    );
};
