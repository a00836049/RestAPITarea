// src/components/dashboard.jsx

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './dashboard.css';


const peopleData = [
  { year: 2018, people: 1200 },
  { year: 2019, people: 1300 },
  { year: 2020, people: 1100 },
  { year: 2021, people: 1400 },
  { year: 2022, people: 1500 },
];

export default function Dashboard() {
  return (
    <Box>

      {/* Main Content */}
      <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
          Welcome to Your Dashboard
        </Typography>

        {/* People Entered Bar Graph */}
        <Paper sx={{ mt: 4, p: 3, width: '100%', maxWidth: '800px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            People that attend to the show
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peopleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="people" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* People Entered Table */}
        <Paper sx={{ mt: 4, p: 3, width: '100%', maxWidth: '800px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            People that attend to the show
          </Typography>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>People</th>
              </tr>
            </thead>
            <tbody>
              {peopleData.map((entry) => (
                <tr key={entry.year}>
                  <td>{entry.year}</td>
                  <td>{entry.people}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </Box>
    </Box>
  );
}
