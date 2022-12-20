import { Slide } from '@mui/material'
import React from 'react'
import { UserDropdownOptions } from '../@types/userDropdownOptions'
import './../style/scss/dropdown.scss'
import { Link } from 'react-router-dom'

export interface DropdownProps {
  options: string[]
  selected: string
  isActive: boolean
}

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  return (
    <div className="dropdown-container">
      {props.options.map((option: any, index: React.Key | null | undefined) => {
        return (
          <Slide key={index} direction='up' in={props.isActive}>
            <div className="options">
              <Link  to={`${option}`}>{option}</Link>
            </div>
          </Slide>
        )
      })}
    </div>
  )
}
