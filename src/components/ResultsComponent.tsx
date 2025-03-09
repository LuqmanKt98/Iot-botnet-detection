import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiBarChart2, FiArrowLeft } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Container, Row, Col, Card, Badge, Button, ProgressBar } from 'react-bootstrap';

interface ResultsComponentProps {
  fileName: string;
  onReset: () => void;
}

// Attack types
const ATTACK_TYPES = [
  "Mirai Attack",
  "Bashlite Attack",
  "Torii Attack",
  "Normal Traffic"
];

const ResultsComponent: React.FC<ResultsComponentProps> = ({ fileName, onReset }) => {
  // Generate random attack type
  const attackTypeIndex = Math.floor(Math.random() * ATTACK_TYPES.length);
  const detectedAttackType = ATTACK_TYPES[attackTypeIndex];
  
  // Generate random metrics
  const generateRandomMetric = (min: number, max: number) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };
  
  const metrics = {
    confidence: parseFloat(generateRandomMetric(0.7, 0.99)),
    processingTime: parseFloat(generateRandomMetric(1.2, 3.5)),
    precision: parseFloat(generateRandomMetric(0.8, 0.98)),
    recall: parseFloat(generateRandomMetric(0.75, 0.95)),
    f1Score: parseFloat(generateRandomMetric(0.8, 0.97)),
    accuracy: parseFloat(generateRandomMetric(0.85, 0.98)),
  };
  
  // Generate confusion matrix data
  const chartData = [
    { name: 'Mirai', value: parseFloat(generateRandomMetric(10, 30)) },
    { name: 'Bashlite', value: parseFloat(generateRandomMetric(5, 25)) },
    { name: 'Torii', value: parseFloat(generateRandomMetric(8, 20)) },
    { name: 'Normal', value: parseFloat(generateRandomMetric(15, 40)) },
  ];
  
  const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981'];

  const getStatusVariant = () => {
    if (detectedAttackType === "Normal Traffic") return "success";
    if (detectedAttackType === "Bashlite Attack") return "warning";
    return "danger";
  };

  const getStatusIcon = () => {
    if (detectedAttackType === "Normal Traffic") {
      return <FiCheckCircle size={40} className="text-success" />;
    }
    return <FiAlertTriangle size={40} className={`text-${getStatusVariant()}`} />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center"
        >
          <h1 className="mb-3 mb-md-0 text-glow-primary">Analysis Results</h1>
          <Badge bg="light" text="dark" className="px-3 py-2 fs-6">
            File: {fileName}
          </Badge>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="d-flex flex-column gap-4"
        >
          {/* Status Card */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-sm border-glow-primary">
              <Card.Body className="p-4">
                <div className="d-flex">
                  <div className="me-3">
                    {getStatusIcon()}
                  </div>
                  <div>
                    <h2 className="h3 mb-2 text-glow-primary">
                      {detectedAttackType === "Normal Traffic" 
                        ? "No malicious traffic detected" 
                        : "Malicious traffic detected"}
                    </h2>
                    <div className="d-flex align-items-center">
                      <span className="me-2 text-secondary">Detected Type:</span>
                      <Badge bg={getStatusVariant()}>
                        {detectedAttackType}
                      </Badge>
                    </div>
                    <p className="mt-2 text-secondary mb-0">
                      Confidence: <span className="fw-semibold text-glow-primary">{(metrics.confidence * 100).toFixed(1)}%</span>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
          
          {/* Metrics and Chart */}
          <Row className="g-4">
            {/* Metrics Card */}
            <Col lg={6}>
              <motion.div variants={itemVariants}>
                <Card className="shadow-sm h-100 border-glow-primary">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <FiBarChart2 className="text-glow-primary me-2" size={24} />
                      <h3 className="h4 mb-0 text-glow-primary">Performance Metrics</h3>
                    </div>
                    
                    <Row className="g-4 mb-4">
                      <Col sm={6}>
                        <div className="bg-light rounded p-3">
                          <h4 className="text-secondary small mb-1">Confidence</h4>
                          <div className="fs-3 fw-bold text-glow-primary">
                            {(metrics.confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                      </Col>
                      
                      <Col sm={6}>
                        <div className="bg-light rounded p-3">
                          <h4 className="text-secondary small mb-1">Accuracy</h4>
                          <div className="fs-3 fw-bold text-glow-primary">
                            {(metrics.accuracy * 100).toFixed(1)}%
                          </div>
                        </div>
                      </Col>
                    </Row>
                    
                    <div className="d-flex flex-column gap-3">
                      <div>
                        <div className="d-flex justify-content-between mb-1">
                          <span className="small fw-medium">Precision</span>
                          <span className="small fw-medium">{metrics.precision.toFixed(2)}</span>
                        </div>
                        <ProgressBar>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metrics.precision * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          >
                            <ProgressBar now={metrics.precision * 100} />
                          </motion.div>
                        </ProgressBar>
                      </div>
                      
                      <div>
                        <div className="d-flex justify-content-between mb-1">
                          <span className="small fw-medium">Recall</span>
                          <span className="small fw-medium">{metrics.recall.toFixed(2)}</span>
                        </div>
                        <ProgressBar>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metrics.recall * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                          >
                            <ProgressBar now={metrics.recall * 100} />
                          </motion.div>
                        </ProgressBar>
                      </div>
                      
                      <div>
                        <div className="d-flex justify-content-between mb-1">
                          <span className="small fw-medium">F1 Score</span>
                          <span className="small fw-medium">{metrics.f1Score.toFixed(2)}</span>
                        </div>
                        <ProgressBar>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metrics.f1Score * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                          >
                            <ProgressBar now={metrics.f1Score * 100} />
                          </motion.div>
                        </ProgressBar>
                      </div>
                    </div>
                    
                    <div className="mt-3 small text-secondary">
                      Processing Time: {metrics.processingTime.toFixed(2)} seconds
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            
            {/* Chart Card */}
            <Col lg={6}>
              <motion.div 
                variants={itemVariants} 
                className="h-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="shadow-sm h-100 border-glow-primary">
                  <Card.Body className="p-4">
                    <h3 className="h4 mb-4 text-glow-primary">Prediction Distribution</h3>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            innerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {chartData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}`, 'Value']}
                            contentStyle={{ 
                              backgroundColor: 'rgba(30, 41, 59, 0.8)',
                              borderRadius: '0.5rem',
                              border: 'none',
                              color: '#f1f5f9',
                              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
          
          {/* Bottom info card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-light border-0 shadow-sm border-glow-primary">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col md={8}>
                    <h3 className="h5 mb-3 text-glow-primary">Analysis Complete</h3>
                    <p className="mb-md-0">
                      This detection result is based on our AI-powered analysis of your network traffic data.
                      {detectedAttackType !== "Normal Traffic" && " We recommend further investigation."}
                    </p>
                  </Col>
                  <Col md={4} className="text-md-end">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="position-relative d-inline-block"
                    >
                      <div className="position-absolute" 
                        style={{ 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          bottom: 0, 
                          background: 'radial-gradient(circle, rgba(79,109,245,0.2) 0%, rgba(0,0,0,0) 70%)',
                          filter: 'blur(5px)',
                          zIndex: 0
                        }}
                      ></div>
                      <Button 
                        variant="primary"
                        onClick={onReset}
                        className="d-inline-flex align-items-center position-relative"
                        style={{ zIndex: 1 }}
                      >
                        <FiArrowLeft className="me-2" />
                        Analyze Another File
                      </Button>
                    </motion.div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ResultsComponent; 