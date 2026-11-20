import { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [tableNumber, setTableNumber] = useState<number | null>(null);

  const startScanner = () => {
    setScanning(true);
    const scanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: { width: 250, height: 250 },
      fps: 10,
    }, false);

    scanner.render((decodedText) => {
      try {
        const data = JSON.parse(decodedText);
        if (data.tableNumber) {
          setTableNumber(data.tableNumber);
          scanner.clear();
          setScanning(false);
        }
      } catch (error) {
        console.error('Invalid QR code format');
      }
    }, (error) => {
      console.warn(error);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
    >
      {!scanning && !tableNumber && (
        <div className="text-center">
          <QrCode className="w-16 h-16 mx-auto mb-4 text-primary-600" />
          <h2 className="text-2xl font-semibold mb-4">Scan Table QR Code</h2>
          <button
            onClick={startScanner}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Start Scanning
          </button>
        </div>
      )}
      {scanning && (
        <div id="qr-reader" className="max-w-sm mx-auto" />
      )}
      {tableNumber && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Table {tableNumber}</h2>
          <p className="text-green-600">Successfully connected to your table!</p>
        </div>
      )}
    </motion.div>
  );
};

export default QRScanner;