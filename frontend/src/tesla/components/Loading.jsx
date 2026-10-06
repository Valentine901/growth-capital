import React from 'react'
import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className="w-full min-h-screen bg-gray-600/10 items-center justify-center flex">
        <Loader size={32} className='animate-spin duration-300 transition-all' />
    </div>
  )
}

export default Loading