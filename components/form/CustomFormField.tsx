'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Control } from 'react-hook-form'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/core'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { FormFieldType } from '@/lib/types'
import { Calendar } from 'lucide-react'

interface CustomProps {
  control: Control<any>
  fieldType: FormFieldType
  name: string
  label?: string
  type?: string
  placeholder?: string
  className?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    type,
    placeholder,
    className,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'Icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='shad-input border-0'
            />
          </FormControl>
        </div>
      )
    case FormFieldType.NUMBER_INPUT:
      return (
        <div className='flex rounded-md border border-dark-500'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'Icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              type='number'
              step='0.01'
              placeholder={1000}
              {...field}
              // className='shad-input border-0'
              className={`shad-input border-0 ${className}`}
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PASSWORD:
      return (
        <div className='flex rounded-md border border-dark-500'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'Icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              type={type}
              required
              placeholder={placeholder}
              {...field}
              className='shad-input border-0'
            />
          </FormControl>
        </div>
      )

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='NG'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className='input-phone'
          />
        </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className='pl-7 relative rounded-md border border-dark-500'>
          <Calendar className='absolute top-2.5 left-2' />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel='Time:'
              wrapperClassName='date-picker'
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='shad-select-trigger'>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='shad-select-content'>
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className='shad-textArea'
            disabled={props.disabled}
          />
        </FormControl>
      )
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className='border-dark-500'
            />
            <label htmlFor={props.name} className='checkbox-label'>
              {props.label}
            </label>
          </div>
        </FormControl>
      )

    default:
      break
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
