import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import { Trash2 } from 'lucide-react'
import { imgSrc } from '../../helpers/imgSrc'

type Props = {
  onDelete: (id: number) => void
  id: number
}

const FileInputItem: React.FC<Props> = ({ onDelete, id }) => {
  const [hovered, setHovered] = useState<boolean>(false)

  const handleMouseOver = () => {
    setHovered(true)
  }

  const handleMouseOut = () => {
    setHovered(false)
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="file-input__img-wrapper">
      {hovered && (
        <IconButton onClick={() => onDelete(id)} className="file-input__delete-icon" type="button" sx={{ p: '6px' }}>
          <Trash2 size={24} strokeWidth={1.5} />
        </IconButton>
      )}
      <img
        src={imgSrc(id)}
        alt="file"
        style={{ width: '100px', height: '100px' }}
        className="file-input__img"
      />
    </div>
  )
}

export default FileInputItem
