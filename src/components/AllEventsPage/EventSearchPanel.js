import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { FormGroup, TextField, Button } from '@mui/material';
import EventSearchUrlBuilder from 'utils/eventSearchUrlBuilder'
import { useLocationNavigator } from 'utils/locationNavigator'
import TagInput from 'components/TagInput/TagInput'

export default function EventSearchPanel({ getEventList }) {

    const locationNavigator = useLocationNavigator();

    const {
        control,
        watch,
        handleSubmit,
        setValue
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            filter: locationNavigator.getFilterFromUrl(),
            tags: locationNavigator.getTagsFromUrl()
        }
    });

    useEffect(() => {
        setValue('filter', locationNavigator.getFilterFromUrl());
        setValue('tags', locationNavigator.getTagsFromUrl());
        getEventList(watch())
    }, [locationNavigator.location])

    const onSubmit = (data) => {

        const url = new EventSearchUrlBuilder()
            .setFilter(data.filter)
            .addTags(data.tags)
            .build();

        locationNavigator.navigate(url);
    }

    const inputStyles = {
        marginBottom: '2vh',
        width: '40%'
    }

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '2vh 0 0 0',
        width: '100%'
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={containerStyle}>
            <Controller name='filter'
                control={control}
                render={({ field }) => (
                    <TextField {...field}
                        sx={inputStyles}
                        size='small'
                        label='Search Event'
                        variant='outlined' />
                )} />
            <Controller name='tags'
                control={control}
                render={({ field }) => (
                    <TagInput field={field} setValue={setValue} sx={inputStyles} />
                )} />

            <FormGroup sx={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '2vh' }}>
                <Button type='submit' variant='contained' color='primary'>Search</Button>
            </FormGroup>
        </form>
    )
}