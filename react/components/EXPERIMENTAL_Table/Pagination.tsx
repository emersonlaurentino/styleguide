import React, { FC } from 'react'

import PaginationBase from '../Pagination/index'
import { NAMESPACES, ORDER_CLASSNAMES } from './constants'
import ActionBar from './ActionBar'

const Pagination: FC<PaginationProps> = props => {
  return (
    <ActionBar
      id={NAMESPACES.PAGINATION}
      order={ORDER_CLASSNAMES.PAGINATION}
      noMargin>
      <PaginationBase {...props} />
    </ActionBar>
  )
}

export type PaginationProps = {
  textShowRows: string
  textOf: string
  rowsOptions: Array<number>
  currentItemFrom: number
  currentItemTo: number
  totalItems: number
  onNextClick: (e: Event) => void
  onPrevClick: (e: Event) => void
  onRowsChange: (e: Event, value: unknown) => void
}

export default Pagination
