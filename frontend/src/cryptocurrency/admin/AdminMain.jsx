import Plans from "./Plans";
const AdminMain = () => {
  return (
    <div className='flex-1 bg-zinc-900 w-full p-6 lg:p-8 overflow-y-auto'>
      <div className='max-w-7xl mx-auto'>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl'>
            <span className='text-sm text-gray-400 font-medium tracking-wider uppercase'>Overview Panel</span>
            <h3 className='text-2xl font-black mt-2 text-amber-400'>Growth Data Stream</h3>
          </div>
        </div>
        
        <div className='p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl min-h-[400px] scroll-auto'>
          <Plans />
        </div>
      </div>
    </div>
  )
}

export default AdminMain;
