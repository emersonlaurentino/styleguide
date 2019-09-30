import React, { FC, useState, useContext } from 'react'
import uuid from 'uuid'

import CellPrefix from './CellPrefix'
import { Row } from '../../EXPERIMENTAL_Table/Styled'
import useTableContext from '../../EXPERIMENTAL_Table/hooks/useTableContext'
import CheckboxesContext from '../checkboxesContext'
import { ParsedItem } from '../hooks/useTableTreeCheckboxes'

const PREFIX_WIDTH = 64

const Node: FC<NodeProps> = ({ data, depth }) => {
  const { visibleColumns } = useTableContext()
  const { toggle, isChecked, isPartiallyChecked } = useContext(
    CheckboxesContext
  )
  const [collapsed, setCollapsed] = useState(true)

  const { children, ...rowData } = data

  const isRowChecked = isChecked(data)
  const isRowPartiallyChecked = isPartiallyChecked(data)
  const isRowSelected = isRowChecked || isRowPartiallyChecked

  const renderPrefix = (hasChild?: boolean) => (
    <CellPrefix width={depth * PREFIX_WIDTH}>
      {hasChild && (
        <CellPrefix.Arrow
          active={collapsed}
          onClick={() => setCollapsed(!collapsed)}
        />
      )}
      <span className="ph2">
        <CellPrefix.Checkbox
          checked={isRowChecked}
          partial={isRowPartiallyChecked}
          onClick={() => toggle(data)}
        />
      </span>
    </CellPrefix>
  )

  const renderCells = (hasChild?: boolean) => {
    return (
      <Row isSelected={isRowSelected}>
        {visibleColumns.map((column: Column, cellIndex: number) => {
          const { cellRender, width } = column
          const cellData = rowData[column.id]
          const content = cellRender
            ? cellRender({ cellData, rowData })
            : cellData
          return (
            <Row.Cell key={`cel-${uuid()}`} width={width}>
              {cellIndex === 0 && renderPrefix(hasChild)}
              {content}
            </Row.Cell>
          )
        })}
      </Row>
    )
  }

  return children ? (
    <>
      {renderCells(true)}
      {collapsed &&
        children.map(data => (
          <Node key={`row-child-${uuid()}`} depth={depth + 1} data={data} />
        ))}
    </>
  ) : (
    renderCells()
  )
}

const Tree: FC = () => {
  const { items } = useTableContext()

  return (
    <>
      {items.children.map(data => (
        <Node key={`row-${uuid()}`} data={data} />
      ))}
    </>
  )
}

type NodeProps = {
  data: ParsedItem
  depth?: number
}

Node.defaultProps = {
  depth: 1,
}

export default Tree
