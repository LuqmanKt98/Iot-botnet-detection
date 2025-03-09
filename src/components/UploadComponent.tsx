import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFile, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { Card, ProgressBar, Button, Alert } from 'react-bootstrap';

interface UploadComponentProps {
  onFileProcessed: (fileName: string) => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ onFileProcessed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const selectedFile = acceptedFiles[0];
    
    // Check if file is CSV
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Only CSV files can be uploaded.');
      return;
    }
    
    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  const handleProcessFile = () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate processing delay with progress updates
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 15);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            onFileProcessed(file.name);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };

  return (
    <section className="py-5">
      <motion.div 
        className="mx-auto"
        style={{ maxWidth: "800px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow border-glow-primary">
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="mb-3 text-glow-primary">CSV File Upload</h2>
              <p className="text-secondary">
                Upload a CSV file containing network traffic data for analysis
              </p>
            </div>
            
            <div 
              {...getRootProps()} 
              className={`upload-area mb-4 ${isDragActive ? 'active' : ''}`}
              style={{ 
                borderColor: isDragActive ? 'var(--primary-color)' : 'var(--border-color)',
                boxShadow: isDragActive ? '0 0 8px rgba(79, 109, 245, 0.2)' : 'none'
              }}
            >
              <input {...getInputProps()} />
              
              <motion.div 
                className="d-flex flex-column align-items-center justify-content-center"
                animate={isDragActive ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="feature-icon mb-4"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FiUploadCloud size={32} className="text-glow-primary" />
                </motion.div>
                
                {isDragActive ? (
                  <h3 className="h4 text-glow-primary mb-0">
                    Drop file here...
                  </h3>
                ) : (
                  <>
                    <h3 className="h4 mb-2">Upload CSV file</h3>
                    <p className="text-secondary mb-0">
                      Drag and drop file or <span className="text-glow-primary fw-medium">browse</span>
                    </p>
                  </>
                )}
              </motion.div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="danger" className="d-flex align-items-center">
                  <FiAlertCircle className="me-2 flex-shrink-0" size={20} />
                  <span>{error}</span>
                </Alert>
              </motion.div>
            )}

            {file && !error && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-light rounded p-3 mb-4 d-flex align-items-center border-glow-primary">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                    <FiFile className="text-glow-primary" size={24} />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="h5 mb-0">{file.name}</h4>
                    <p className="small text-secondary mb-0">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  {!isUploading && (
                    <div className="bg-success bg-opacity-10 p-2 rounded-circle">
                      <FiCheckCircle className="text-success" />
                    </div>
                  )}
                </div>
                
                {isUploading && (
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="small fw-medium">Processing...</span>
                      <span className="small fw-medium">{uploadProgress}%</span>
                    </div>
                    <ProgressBar 
                      now={uploadProgress} 
                      variant="primary" 
                      className="mb-0" 
                      style={{ height: "0.5rem" }}
                    />
                  </div>
                )}
                
                <motion.div
                  whileHover={!isUploading ? { scale: 1.02 } : {}}
                  whileTap={!isUploading ? { scale: 0.98 } : {}}
                  className="position-relative"
                >
                  <div className="position-absolute" 
                    style={{ 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      bottom: 0, 
                      background: 'radial-gradient(circle, rgba(79,109,245,0.2) 0%, rgba(0,0,0,0) 70%)',
                      filter: 'blur(5px)',
                      zIndex: 0,
                      opacity: isUploading ? 0.3 : 0.8
                    }}
                  ></div>
                  <Button
                    variant="primary"
                    className="w-100 d-flex align-items-center justify-content-center position-relative"
                    onClick={handleProcessFile}
                    disabled={isUploading}
                    style={{ zIndex: 1 }}
                  >
                    {isUploading ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiUploadCloud className="me-2" />
                        Process File
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </section>
  );
};

export default UploadComponent; 