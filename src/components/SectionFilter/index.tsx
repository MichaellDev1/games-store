import React from 'react'
import CardFilter from '../CardFilter'
import { filterList } from '@/app/search/data'

export default function SectionFilter({ handleFilter, ...rest }: any) {
  return <div className="p-5 flex-1">
    <h3>Filtros({rest.genderFilter.length + rest.platformFilter.length})</h3>
    <ul className="flex flex-col gap">
      {filterList.map(({ label }) =>
        <CardFilter
          key={label}
          genderFilter={rest.genderFilter}
          label={label}
          platformFilter={rest.platformFilter}
          filterList={filterList}
          handleFilter={handleFilter}
          genderAll={rest.genderAll} />)}
    </ul>
  </div>
}
