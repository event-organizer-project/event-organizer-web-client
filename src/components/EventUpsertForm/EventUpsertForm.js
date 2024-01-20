import { useForm, Controller } from 'react-hook-form'
import { FormGroup, TextField, Button, FormHelperText } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers'
import TagInput from 'components/TagInput/TagInput'

import dayjs from 'dayjs'
import dateTimeSetting from 'constants/date-time-setting'

export default function EventUpsertForm({ event, submitAction, cancelAction }) {

    const {
        control,
        watch,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        setValue
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            ...event,
            startDate: event.startDate && dayjs(event.startDate),
            endDate: event.endDate && dayjs(event.endDate)
        }
    });

    const onSubmit = (data) => {
        var result = {
            ...data,
            startDate: data.startDate.format(dateTimeSetting.fullDateFormat),
            endDate: data.endDate.format(dateTimeSetting.fullDateFormat)
        }

        submitAction(result);
    }

    const inputStyles = {
        mb: '2vh',
        width: '100%'
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller name='title'
                    control={control}
                    rules={{
                        required: 'Title is required',
                        minLength: {
                            value: 5,
                            message: 'Title must be longer than 5 characters'
                        },
                        maxLength: {
                            value: 50,
                            message: 'Title must be shorter than 50 characters'
                        },
                    }}
                    render={({ field }) => (
                        <TextField {...field}
                            sx={inputStyles}
                            size='small'
                            required
                            label='Title'
                            variant='outlined'
                            error={!!errors.title}
                            helperText={errors.title && errors.title?.message} />
                    )} />
                <FormGroup />

                <Controller name='description'
                    control={control}
                    rules={{
                        required: 'Description is required',
                        minLength: {
                            value: 10,
                            message: 'Description must be longer than 10 characters'
                        },
                        maxLength: {
                            value: 1000,
                            message: 'Description must be shorter than 1000 characters'
                        },
                    }}
                    render={({ field }) => (
                        <TextField {...field}
                            sx={inputStyles}
                            size='small'
                            required
                            multiline
                            rows={4}
                            label='Description'
                            variant='outlined'
                            error={!!errors.description}
                            helperText={errors.description && errors.description?.message} />
                    )} />

                <Controller name='startDate'
                    control={control}
                    rules={{
                        required: 'Start date is required',
                    }}
                    render={({ field }) => (
                        <MobileDateTimePicker {...field}
                            sx={{ width: '100%' }}
                            componentsProps={{
                                textField: {
                                    size: 'small',
                                    required: true,
                                    label: 'Start Date',
                                    variant: 'outlined',
                                    error: !!errors.startDate
                                }
                            }}
                        />
                    )} />
                <FormHelperText error sx={{ ml: '14px', mb: '2vh' }}>{errors.startDate && errors.startDate?.message}</FormHelperText>

                <Controller name='endDate'
                    control={control}
                    rules={{
                        required: 'End date is required',
                    }}
                    render={({ field }) => (
                        <MobileDateTimePicker {...field}
                            sx={{ width: '100%' }}
                            componentsProps={{
                                textField: {
                                    size: 'small',
                                    required: true,
                                    label: 'End Date',
                                    variant: 'outlined',
                                    error: !!errors.endDate
                                }
                            }}
                        />
                    )} />
                <FormHelperText error sx={{ ml: '14px', mb: '2vh' }}>{errors.endDate && errors.endDate?.message}</FormHelperText>
                
                <Controller name='eventTags'
                    control={control}
                    render={({ field }) => (
                        <TagInput field={field} setValue={setValue} sx={inputStyles} />
                    )} />
                <FormGroup sx={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '2vh' }}>
                    <Button variant='contained' color='primary' onClick={cancelAction}>Cancel</Button>
                    <Button type='submit' variant='contained' color='success'>Submit</Button>
                </FormGroup>
            </form>
        </div>
    )
}
