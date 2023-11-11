// components/Dashboard.js
import React from 'react';
import Analytics from './Analytics';
import Resources from './Resources';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Analytics />
            <Resources />
        </div>
    );
};

export default Dashboard;
