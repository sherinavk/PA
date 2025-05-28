import React, { useState, useEffect } from 'react';
import API_URL from '../config/apiConfig';
import ChartistGraph from 'react-chartist';
import { Card, Container, Row, Col, Form, Button, Image } from 'react-bootstrap';

const DashboardUser = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "User";  // Ambil username dari localStorage
  const avatar = storedUser?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const [stats, setStats] = useState({
    slightlyDamaged: 0,
    moderatelyDamaged: 0,
    badlyDamaged: 0
  });

  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  const [barData, setBarData] = useState({ labels: [], datasets: [] });

  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Fungsi untuk mengambil data dari API
  const fetchData = async () => {
    if (!filters.startDate || !filters.endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/jalan/jalan/by-date-range?${new URLSearchParams({
        startDate: filters.startDate,
        endDate: filters.endDate,
      }).toString()}`);

      const data = await response.json();

      setStats({
        slightlyDamaged: data.slightlyDamaged || 0,
        moderatelyDamaged: data.moderatelyDamaged || 0,
        badlyDamaged: data.badlyDamaged || 0,
      });

      setBarData({
        labels: ['Slightly Damaged', 'Moderately Damaged', 'Badly Damaged'],
        datasets: [
          {
            label: 'Road Damage Levels',
            data: [
              data.slightlyDamaged || 0,
              data.moderatelyDamaged || 0,
              data.badlyDamaged || 0
            ],
            backgroundColor: ['#64B5F6', '#81C784', '#E57373'],
          },
        ],
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Data untuk Pie Chart
  const pieData = {
    labels: ["Slightly Damaged", "Moderately Damaged", "Badly Damaged"],
    datasets: [
      {
        data: [stats.slightlyDamaged, stats.moderatelyDamaged, stats.badlyDamaged],
        backgroundColor: ["#64B5F6", "#81C784", "#E57373"],
        hoverOffset: 4,
      },
    ],
  };

  // Opsi untuk Diagram Batang
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Effect hook untuk memanggil fetchData saat komponen pertama kali dimuat
  useEffect(() => {
    fetchData(); // Fetch data awal tanpa filter
  }, []);

  return (
    <Container fluid>
      <Row className="mb-3 align-items-center">
        <Col>
          {/* Welcome message */}
          <Image 
            src={avatar} 
            roundedCircle 
            width="50" 
            height="50" 
            alt="User Avatar" 
            style={{ marginLeft: '10px' }} 
          />
          <h3 className="d-inline"> Welcome, {username}!</h3>
        </Col>
      </Row>
  
      <Row>
        {/* Filter Form - One filter for all charts */}
        <Col md="12">
          <Form className="position-relative" style={{ marginBottom: '20px' }} onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
            <Row>
              <Col>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  placeholder="Start Date"
                />
              </Col>
              <Col>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  placeholder="End Date"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" variant="primary">Apply Filter</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Row>
        {/* First Row with Slightly, Moderately, and Badly Damaged */}
        <Col md="4">
          <Card className="card-stats">
            <Card.Body>
              <div className="numbers">
                <p className="card-category">Slightly Damaged</p>
                <Card.Title as="h4">{stats.slightlyDamaged}</Card.Title>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="stats">
                <i className="fas fa-sync-alt"></i> Updated now
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-stats">
            <Card.Body>
              <div className="numbers">
                <p className="card-category">Moderately Damaged</p>
                <Card.Title as="h4">{stats.moderatelyDamaged}</Card.Title>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="stats">
                <i className="fas fa-calendar-alt"></i> Last day
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-stats">
            <Card.Body>
              <div className="numbers">
                <p className="card-category">Badly Damaged</p>
                <Card.Title as="h4">{stats.badlyDamaged}</Card.Title>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="stats">
                <i className="fas fa-clock"></i> In the last hour
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Time-Based Damage Report (Bar Chart) */}
        <Col md="8">
         <Card className="position-relative">
              <Card.Header>
                <Card.Title as="h4">TIME-BASED DAMAGE REPORT</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <ChartistGraph
                  data={{
                    labels: ['Slightly Damaged', 'Moderately Damaged', 'Badly Damaged'],
                    series: [
                      [stats.slightlyDamaged, stats.moderatelyDamaged, stats.badlyDamaged],
                    ],
                  }}
                  type="Bar"
                  options={{
                    high: Math.max(stats.slightlyDamaged, stats.moderatelyDamaged, stats.badlyDamaged) + 1,
                    low: 0,
                    showArea: false,
                    height: "245px",
                    axisX: {
                      showGrid: false,
                      labelInterpolationFnc: (value) => value,
                    },
                    axisY: {
                      offset: 60,
                    },
                    barChart: {
                      horizontalBars: false,
                      distributed: true,
                    },
                    chartPadding: {
                      right: 50,
                    },
                  }}
                />
              </Card.Body>
            </Card>
        </Col>

        {/* Real-Time Damage Report (Pie Chart) */}
        <Col md="4">
          <Card className="position-relative">
            <Card.Header>
              <Card.Title as="h4">Real-Time Damage Report</Card.Title>
              <p className="card-category">Last Campaign Performance</p>
            </Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Pie Chart */}
                <div style={{ flex: 1 }}>
                  <ChartistGraph
                    data={{
                      labels: ["Slightly", "Moderately", "Badly"],
                      series: [
                        stats.slightlyDamaged, 
                        stats.moderatelyDamaged, 
                        stats.badlyDamaged
                      ]
                    }}
                    type="Pie"
                    options={{
                      showLabel: true,
                      labelInterpolationFnc: (value) => {
                        return value > 0 ? `${value}` : '';
                      },
                      chartPadding: 20,
                    }}
                  />
                </div>

                {/* Legend/Summary Labels */}
                <div style={{ paddingLeft: '20px', fontSize: '12px', lineHeight: '1.5' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ backgroundColor: '#64B5F6', padding: '3px 6px', marginRight: '8px' }}></span>
                    Slightly Damaged: {stats.slightlyDamaged}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ backgroundColor: '#81C784', padding: '3px 6px', marginRight: '8px' }}></span>
                    Moderately Damaged: {stats.moderatelyDamaged}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ backgroundColor: '#E57373', padding: '3px 6px', marginRight: '8px' }}></span>
                    Badly Damaged: {stats.badlyDamaged}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardUser;
