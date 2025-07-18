const Sensor = require('../models/Sensor'); // Import model Sensor

// Fungsi untuk menentukan kondisi jalan berdasarkan akselerasi dan gyroscope
const determineRoadCondition = (acceleration, gyro) => {
    const accThreshold = 1.5; // Updated threshold for accelerometer
    const gyroThreshold = 325;
    const gyroThreshold1 = 326; // Updated threshold for gyroscope
    const gyroThreshold2 = 327;
    
    const accX = acceleration && acceleration.x !== null ? acceleration.x : 0;
    const accY = acceleration && acceleration.y !== null ? acceleration.y : 0;
    const accZ = acceleration && acceleration.z !== null ? acceleration.z : 0;

    const gyroAlpha = gyro && gyro.alpha !== null ? gyro.alpha : 0;
    const gyroBeta = gyro && gyro.beta !== null ? gyro.beta : 0;
    const gyroGamma = gyro && gyro.gamma !== null ? gyro.gamma : 0;

    // Calculate the maximum absolute values
    const maxAcc = Math.max(Math.abs(accX), Math.abs(accY), Math.abs(accZ));
    const maxGyro = Math.max(Math.abs(gyroAlpha), Math.abs(gyroBeta), Math.abs(gyroGamma));

    // Check conditions based on updated thresholds
    if (
        maxAcc < accThreshold && 
        maxGyro < gyroThreshold
    ) {
        return 'tidak rusak'; // Not damaged
    } else if (
        maxAcc < accThreshold * 2 && 
        maxGyro < gyroThreshold1
    ) {
        return 'rusak ringan'; // Lightly damaged
    } else if (
        (maxAcc >= accThreshold * 2 && maxAcc < accThreshold * 3) || 
        (maxGyro >= gyroThreshold1 && maxGyro < gyroThreshold2)
    ) { 
        return 'rusak sedang'; // Moderately damaged
    } else if (
        maxAcc >= accThreshold * 3 || 
        maxGyro >= gyroThreshold2
    ) {
        return 'rusak berat'; // Heavily damaged
    } else {
        console.warn('Unexpected sensor data values:', acceleration, gyro);
        return 'terjadi kesalahan, cek kembali aliran data'; // Unexpected data
    }
};



// Fungsi untuk menghasilkan kode acak
const generateRandomCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

exports.receiveSensorData = (req, res) => {
    const receivedData = req.body;

    console.log("Received sensor data:", receivedData);

    const jalan_id = receivedData.jalan_id || null;

    const acceleration = {
        x: receivedData.x !== undefined ? receivedData.x : null,
        y: receivedData.y !== undefined ? receivedData.y : null,
        z: receivedData.z !== undefined ? receivedData.z : null,
    };

    const gyro = {
        alpha: receivedData.alpha_rotation !== undefined ? receivedData.alpha_rotation : null,
        beta: receivedData.beta_rotation !== undefined ? receivedData.beta_rotation : null,
        gamma: receivedData.gamma_rotation !== undefined ? receivedData.gamma_rotation : null,
    };

    console.log("Accelerometer data:", acceleration);
    console.log("Gyroscope data:", gyro);

    if (
        (acceleration.x === null && acceleration.y === null && acceleration.z === null) &&
        (gyro.alpha === null && gyro.beta === null && gyro.gamma === null)
    ) {
        return res.status(400).send({ message: "No valid sensor data received." });
    }

    const condition = determineRoadCondition(acceleration, gyro);

    console.log("Kondisi jalan:", condition);

    const kode_data = generateRandomCode(8);
    const createdAt = new Date();

    Sensor.create({ kode_data, kondisi: condition, createdAt })
        .then(insertId => {
            console.log("Data inserted successfully with ID:", insertId);

            if (jalan_id) {
                return Sensor.updateRoadCondition(jalan_id, condition, createdAt);
            } else {
                console.warn("Jalan ID tidak disertakan, hanya menyimpan data sensor.");
                return Promise.resolve();
            }
        })
        .then(() => {
            console.log("Kondisi jalan berhasil diperbarui di tabel jalan");
            res.send({ message: "Data received and updated successfully!", condition });
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).send({ message: "Error processing data", error: error.message });
        });
};




// Function to get all sensor data
exports.getSensorData = async (req, res) => {
    try {
        const results = await Sensor.getAll(); // Ensure you implement getAll in the Sensor model
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};