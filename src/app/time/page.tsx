'use client'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';
import { Line, PolarArea } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};

const labels = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 12)),
      borderColor: '#ff6b27',
      backgroundColor: '#ff7f44',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 12)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


export const dataRounded = {
  labels: ['Fornite', 'Minecraft', 'GTA V'],
  datasets: [
    {
      data: [8, 2, 9],
      backgroundColor: [
        '#9900ff',
        '#ff9100',
        '#00c3ff',
      ],
      borderWidth: 0,
    },
  ],
};

export default function Time() {
  return (
    <div className='min-h-[90vh]'>
      <div className='flex justify-between w-full mb-3 mt-10'>
        <h4 className='text-[17px] font-normal text-neutral-200'>Hours played per day</h4>
        <h4 className='text-[17px] font-normal text-neutral-200'>Top 3 most played games</h4>
      </div>
      <div className='flex items-end gap-3 h-[400px] w-full'>
        <div className='flex-[3] p-4 h-full rounded-md'>
          <Line options={options} data={data} />
        </div>
        <div className='flex-1 p-4 h-full rounded-md'>
          <PolarArea data={dataRounded} />
        </div>
      </div>
    </div>
  )
}
