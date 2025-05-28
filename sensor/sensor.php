<?php
// Koneksi ke MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kerusakan_jalan";  // Ganti dengan nama database Anda
// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);
// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Query untuk mengambil data id dan nama dari tabel jalan
$sql = "SELECT id, nama FROM jalan";
$result = $conn->query($sql);
// Menutup koneksi setelah mengambil data
$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Sensor Data (Accelerometer & Gyroscope)</title>
</head>
<body>
    <h1>Sensor Data (Accelerometer & Gyroscope)</h1>
    <p id="output">Waiting for sensor data...</p>
    <p id="status" style="color:green;">Status: Waiting to send data...</p>
    <!-- Dropdown untuk memilih nama jalan -->
    <label for="jalan">Nama Jalan:</label>
    <select id="jalan" name="jalan">
        <option value="">Pilih Jalan</option>
        <?php
        // Menampilkan dropdown dengan id dan nama dari tabel jalan
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<option value='" . $row['id'] . "'>" . $row['nama'] . "</option>";
            }
        } else {
            echo "<option value=''>Data tidak tersedia</option>";
        }
        ?>
    </select>
    <script>
    // Untuk mendapatkan timestamp 
    function getCurrentTimestamp() {
        const now = new Date();
        return now.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ
    }
    // Event listener untuk accelerometer
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function(event) {
            let acceleration = event.accelerationIncludingGravity || event.acceleration;

            const timestamp = getCurrentTimestamp();

            fetch("http://localhost:5000/api/sensor/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    x_acceleration: acceleration.x || 0,
                    y_acceleration: acceleration.y || 0,
                    z_acceleration: acceleration.z || 0,
                    jalan_id: getSelectedJalanId() || "Belum dipilih",
                    created_at: timestamp
                })
            })
            .then(response => response.json())
            .then(data => {
                updateStatus("Accelerometer data sent successfully!");
            })
            .catch(error => {
                console.error("Error sending accelerometer data:", error);
                updateStatus("Error sending accelerometer data!", true);
            });
        });
    }

    // Event listener untuk sensor gyroscope
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function(event) {
            let alpha = event.alpha || 0;
            let beta = event.beta || 0;
            let gamma = event.gamma || 0;

            const timestamp = getCurrentTimestamp();

            fetch("http://localhost:5000/api/sensor/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    alpha_rotation: alpha,
                    beta_rotation: beta,
                    gamma_rotation: gamma,
                    jalan_id: getSelectedJalanId() || "Belum dipilih",
                    created_at: timestamp
                })
            })
            .then(response => response.json())
            .then(data => {
                updateStatus("Gyroscope data sent successfully!");
            })
            .catch(error => {
                console.error("Error sending gyroscope data:", error);
                updateStatus("Error sending gyroscope data!", true);
            });
        });
    }
</script>

</body>
</html>