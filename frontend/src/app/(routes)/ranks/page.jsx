'use client'
import { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import ChooseYourState from '@/components/CardStatus/ChooseYourState'
import { CardHome } from '@/components/cardHome/CardHome'
import MedalsRanks from '@/components/medals-ranks/MedalsRanks'
import AscentZone from '@/components/ascent-zone/AscentZone'
import Pagination from '@/components/ascent-zone/Pagination'
import { useUserData } from '@/utils/services/usersRequest/useUserData'

const PageRanks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { userData, loading, error, pagination, setError } =
    useUserData(currentPage)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setError(false)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Error al obtener datos de la clasificación.
        </Alert>
      </Snackbar>
      <main className='grid gap-2 grid-cols-1 lg:grid-cols-4 relative'>
        <aside className='w-60 lg:w-full lg:max-w-60 xl:max-w-80 hidden lg:block lg:col-span-1 space-y-5 '>
          <div className='w-full sticky top-24'>
            <ChooseYourState />
            <CardHome secondary={true} />
          </div>
        </aside>
        <section className='w-full lg:col-span-3 flex gap-5 flex-col items-center justify-center'>
          <MedalsRanks rank={'oro'} />
          <div className='text-center text-white'>
            <h2 className='text-sm sm:text-lg'>DIVISION ORO</h2>
            <h4 className='text-xs sm:text-base'>
              Estás a 3 puestos de la zona de descenso.
            </h4>
          </div>
          <AscentZone
            dataLoaded={loading}
            data={userData}
            currentPage={currentPage}
          />
          {pagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>
    </>
  )
}

export default PageRanks
