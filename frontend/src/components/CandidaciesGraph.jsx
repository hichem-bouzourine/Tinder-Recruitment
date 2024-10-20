import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CandidaciesGraph = ({ offers }) => {
    // Mock data for now, replace with API data
    const data = [
        { day: 'Monday', candidacies: 5 },
        { day: 'Tuesday', candidacies: 10 },
        { day: 'Wednesday', candidacies: 2 },
        { day: 'Thursday', candidacies: 8 },
        { day: 'Friday', candidacies: 12 },
        { day: 'Saturday', candidacies: 6 },
        { day: 'Sunday', candidacies: 9 },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="candidacies" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CandidaciesGraph;
