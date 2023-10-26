import { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import tagService from 'services/tagService'

export default function TagInput({ field, setValue, sx }) {

    const [tags, setTags] = useState([]);

    const onChange = (e, newval, reason) => {
        setValue(field.name, newval)
    }

    const onInputChange = (e, newValue, reason) => {
        if (reason == 'reset' || newValue == '') {
            setTags([]);
        }
        else {
            tagService.getALL()
                .then(result => {
                    const tagList = result
                        .filter(item => item.startsWith(newValue) && !field.value.includes(item))
                        .slice(0, 5);

                    setTags(tagList);
                });
        }
    }

    return (
        <Autocomplete
            {...field}
            multiple
            freeSolo
            onChange={onChange}
            onInputChange={onInputChange}
            options={tags}
            size='small'
            sx={sx}
            renderInput={(params) =>
                <TextField
                    {...params}
                    placeholder="Type and press enter"
                    label="Event Tags"
                />
            }
        />
    )
}