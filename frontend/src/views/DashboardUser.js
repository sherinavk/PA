import React, { useState, useEffect } from 'react';
import ChartistGraph from 'react-chartist';
import { Card, Container, Row, Col, Form, Button, Image } from 'react-bootstrap';

const DashboardUser = () => {

const API_URL_1 = "http://localhost:5000/api"; 
const API_URL_2 = "http://localhost:5000"; 


const storedUser = JSON.parse(localStorage.getItem("user"));
const username = storedUser?.username || "Guest";
const profilePicture = storedUser?.photo
  ? `${API_URL_2}${storedUser.photo}`
  : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const [stats, setStats] = useState({
    noDamage: 0,
    slightlyDamaged: 0,
    moderatelyDamaged: 0,
    badlyDamaged: 0
  });

  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  const [barData, setBarData] = useState({ labels: [], datasets: [] });

  const [latestData, setLatestData] = useState({});

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
      const response = await fetch(`${API_URL_1}/sensor/sensor/by-date-range?${new URLSearchParams({
        startDate: filters.startDate,
        endDate: filters.endDate,
      }).toString()}`);

      const data = await response.json();

      setStats({
        noDamage: data.noDamage || 0,
        slightlyDamaged: data.slightlyDamaged || 0,
        moderatelyDamaged: data.moderatelyDamaged || 0,
        badlyDamaged: data.badlyDamaged || 0,
      });

      setBarData({
        labels: ['No Damage','Slightly Damaged', 'Moderately Damaged', 'Badly Damaged'],
        datasets: [
          {
            label: 'Road Damage Levels',
            data: [
              data.noDamage || 0,
              data.slightlyDamaged || 0,
              data.moderatelyDamaged || 0,
              data.badlyDamaged || 0
            ],
          },
        ],
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Data untuk Pie Chart
  const pieData = {
    labels: ["No Damage", "Slightly Damaged", "Moderately Damaged", "Badly Damaged"],
    datasets: [
      {
        data: [stats.noDamage,stats.slightlyDamaged, stats.moderatelyDamaged, stats.badlyDamaged],
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

 useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const response = await fetch(`${API_URL_1}/sensor/sensor_data`);
      const data = await response.json();
      const latest = data[0]; // data terbaru

      if (latest && latest.kondisi) {
        setLatestData(latest);

        const kondisi = latest.kondisi.toLowerCase();

        setStats((prevStats) => ({
          ...prevStats,
          noDamage: kondisi === 'tidak rusak' ? prevStats.noDamage + 1 : prevStats.noDamage,
          slightlyDamaged: kondisi === 'rusak ringan' ? prevStats.slightlyDamaged + 1 : prevStats.slightlyDamaged,
          moderatelyDamaged: kondisi === 'rusak sedang' ? prevStats.moderatelyDamaged + 1 : prevStats.moderatelyDamaged,
          badlyDamaged: kondisi === 'rusak berat' ? prevStats.badlyDamaged + 1 : prevStats.badlyDamaged,
        }));
      }
    } catch (error) {
      console.error('Polling Error:', error);
    }
  }, 5000);

  return () => clearInterval(interval);
}, []);



  return (
    <Container fluid>
  <Row className="mb-3 align-items-center">
    <Col>
      {/* Welcome message */}
      <div className="d-flex align-items-center">
        <Image 
         src={profilePicture ? `${API_URL_2}${profilePicture}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          roundedCircle 
          width="50" 
          height="50" 
          style={{
            marginLeft: '10px', 
            objectFit: 'cover', 
            objectPosition: 'center',
            border: '2px solid #495464',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'  // Adding shadow to profile picture
          }} 
        />
        <h3 className="d-inline ml-3" style={{ fontWeight: '600', color: '#495464' }}> Welcome, {username}!</h3>
      </div>
    </Col>
  </Row>

  <Row>
    {/* Filter Form - One filter for all charts */}
    <Col md="12">
      <Form className="position-relative mb-4" onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
        <Row>
          <Col>
            <Form.Control
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              placeholder="Start Date"
              style={{
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding shadow to input fields
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#495464')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
          </Col>
          <Col>
            <Form.Control
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              placeholder="End Date"
              style={{
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding shadow to input fields
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#495464')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
          </Col>
          <Col xs="auto">
            <Button
              type="submit"
              style={{
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: '600',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding shadow to the button
              }}
            >
              Apply Filter
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  </Row>

  <Row>
    {/* Stats Cards */}
    <Col md="3">
      <Card className="card-stats shadow-sm mb-3" style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <div className="numbers">
            <p className="card-category" style={{ fontWeight: '600' }}>No Damage</p>
            <Card.Title as="h4">{stats.noDamage}</Card.Title>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="stats">
            <i className="fas fa-check-circle"></i> Valid roads
          </div>
        </Card.Footer>
      </Card>
    </Col>

    <Col md="3">
      <Card className="card-stats shadow-sm mb-3" style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)' }}>
        <Card.Body>
          <div className="numbers">
            <p className="card-category" style={{ fontWeight: '600' }}>Slightly Damaged</p>
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

    <Col md="3">
      <Card className="card-stats shadow-sm mb-3" style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.)' }}>
        <Card.Body>
          <div className="numbers">
            <p className="card-category" style={{ fontWeight: '600' }}>Moderately Damaged</p>
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

    <Col md="3">
      <Card className="card-stats shadow-sm mb-3" style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <div className="numbers">
            <p className="card-category" style={{ fontWeight: '600' }}>Badly Damaged</p>
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
      <Card className="position-relative mb-4 shadow-sm" style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)' }}>
        <Card.Header>
          <Card.Title as="h4" style={{fontWeight:'bold'}}>Time-Based Damage Report</Card.Title>
          <p className="card-category" style={{ fontSize: '14px' }}>24 Hours performance</p>
        </Card.Header>
        <Card.Body>
          <ChartistGraph style={{fontSize:'small'}}
            data={{
              labels: ['No Damage', 'Slightly Damaged', 'Moderately Damaged', 'Badly Damaged'],
              series: [
                [stats.noDamage, stats.slightlyDamaged, stats.moderatelyDamaged, stats.badlyDamaged],
              ],
            }}
            type="Bar"
            options={{
              high: Math.max(stats.noDamage, stats.slightlyDamaged, stats.moderatelyDamaged, stats.badlyDamaged) + 1,
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
         <style>
  {`
    .ct-custom-pie .ct-series-a .ct-slice-pie {
      fill: #4CAF50 !important; /* No Damage */
    }
    .ct-custom-pie .ct-series-b .ct-slice-pie {
      fill: #FF9800 !important; /* Slightly Damaged */
    }
    .ct-custom-pie .ct-series-c .ct-slice-pie {
      fill: #F44336 !important; /* Moderately Damaged */
    }
    .ct-custom-pie .ct-series-d .ct-slice-pie {
      fill: #000000 !important; /* Badly Damaged */
    }
  `}
</style>


          
        </Card.Body>
      </Card>
    </Col>

    {/* Real-Time Damage Report (Pie Chart) */}
    <Col md="4">
      <Card className="position-relative shadow-sm mb-4" style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)' }}>
        <Card.Header>
          <Card.Title as="h4" style={{fontWeight:'bold'}}>Real-Time Damage Report</Card.Title>
          <p className="card-category" style={{ fontSize: '12px' }}>Last Campaign Performance</p>
        </Card.Header>
        <Card.Body>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Pie Chart */}
<div style={{ flex: 1 }}>
  <ChartistGraph
    data={{
      labels: ["No Damage", "Slightly", "Moderately", "Badly"],
      series: [stats.noDamage, stats.slightlyDamaged, stats.moderatelyDamaged, stats.badlyDamaged],
    }}
    type="Pie"
    className="ct-custom-pie"
    options={{
      showLabel: true,
      labelInterpolationFnc: (value) => {
        return value > 0 ? `${value}` : '';
      },
      chartPadding: 20,
    }}
  />
 <style>
  {`
    .ct-series-a .ct-bar:nth-child(1) {
      stroke: #4CAF50 !important; /* No Damage - Green */
    }
    .ct-series-a .ct-bar:nth-child(2) {
      stroke: #FF9800 !important; /* Slightly Damaged - Orange */
    }
    .ct-series-a .ct-bar:nth-child(3) {
      stroke: #F44336 !important; /* Moderately Damaged - Red */
    }
    .ct-series-a .ct-bar:nth-child(4) {
      stroke: #000000 !important; /* Badly Damaged - Black */
    }
  `}
</style>

</div>

            {/* Legend/Summary Labels */}
            <div style={{ paddingLeft: '20px', fontSize: '12px', lineHeight: '1.5' }}>
  <div style={{ marginBottom: '12px' }}>
    <span
      style={{
        backgroundColor:'#4CAF50',
        padding: '6px 12px',
        marginRight: '8px',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#333')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '#000')}
    >
      No Damage
    </span>
    : {stats.noDamage}
  </div>

  <div style={{ marginBottom: '12px' }}>
    <span
      style={{
        backgroundColor: '#FF9800',
        padding: '6px 12px',
        marginRight: '8px',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#4e92cc')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '#64B5F6')}
    >
      Slightly Damaged
    </span>
    : {stats.slightlyDamaged}
  </div>

  <div style={{ marginBottom: '12px' }}>
    <span
      style={{
        backgroundColor: '#F44336',
        padding: '6px 12px',
        marginRight: '8px',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#66b16b')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '#81C784')}
    >
      Moderately Damaged
    </span>
    : {stats.moderatelyDamaged}
  </div>

  <div style={{ marginBottom: '2px' }}>
    <span
      style={{
        backgroundColor: '#000000',
        padding: '6px 12px',
        marginRight: '8px',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = '#d04e4e')}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '#E57373')}
    >
      Badly Damaged
    </span>
    : {stats.badlyDamaged}
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
