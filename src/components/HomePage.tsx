import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUploadCloud, FiCpu, FiBarChart2, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface HomePageProps {
  onStartUpload: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartUpload }) => {
  const [featureRef, featureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [attackRef, attackInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <>
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden gradient-bg">
        <div className="position-absolute top-0 start-0 end-0 bottom-0 opacity-10"></div>
        <Container className="py-5 py-lg-6 position-relative">
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="hero-title text-white mb-4">
                  IoT Botnet Detection System
                </h1>
                <p className="hero-subtitle text-white opacity-90 mb-4">
                  Detect malicious network traffic and protect your IoT devices from cyber attacks
                </p>
                {/* Ultra simple HTML button with inline onClick */}
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg" 
                  onClick={() => {
                    console.log("HTML Button clicked!");
                    onStartUpload();
                  }}
                >
                  <i className="me-2"><FiUploadCloud /></i>
                  Upload CSV File
                </button>
              </motion.div>
            </Col>
            
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="position-relative"
              >
                <motion.div
                  className="position-absolute top-0 start-0 bg-warning rounded-circle"
                  style={{ 
                    width: "3rem", 
                    height: "3rem", 
                    marginTop: "-1rem", 
                    marginLeft: "-1rem", 
                    filter: "blur(5px)",
                    opacity: 0.5 
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="position-absolute top-50 end-0 bg-info rounded-circle"
                  style={{ 
                    width: "2rem", 
                    height: "2rem", 
                    marginRight: "-1rem", 
                    filter: "blur(5px)",
                    opacity: 0.5 
                  }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                  className="position-absolute bottom-0 start-25 bg-success rounded-circle"
                  style={{ 
                    width: "2.5rem", 
                    height: "2.5rem", 
                    marginBottom: "-1rem", 
                    left: "25%", 
                    filter: "blur(5px)",
                    opacity: 0.5 
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.img 
                  src="https://cdn-icons-png.flaticon.com/512/2885/2885417.png" 
                  alt="IoT Security" 
                  className="img-fluid mx-auto d-block"
                  style={{ 
                    filter: "drop-shadow(0 0 15px rgba(79,109,245,0.4))",
                    maxWidth: "85%" 
                  }}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
        
        <div className="position-absolute bottom-0 start-0 end-0 h-5" 
             style={{ 
               background: "linear-gradient(to bottom, transparent, var(--bg-body))",
               height: "4rem"
             }}>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 py-lg-6" ref={featureRef}>
        <Container>
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={featureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-3 text-glow-primary">How Our System Works</h2>
            <p className="lead text-secondary mx-auto" style={{ maxWidth: "800px" }}>
              Analyze your network traffic and detect potential threats in just 3 simple steps
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={featureInView ? "visible" : "hidden"}
          >
            <Row className="g-4">
              <Col md={4}>
                <motion.div variants={itemVariants}>
                  <Card className="h-100 shadow transition hover-lift">
                    <Card.Body className="p-4 text-center">
                      <div className="feature-icon mb-4 mx-auto">
                        <FiUploadCloud size={24} />
                      </div>
                      <h3 className="h4 mb-3">1. Data Upload</h3>
                      <p className="mb-0">
                        Upload your network traffic CSV file. The system only supports CSV format.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
              
              <Col md={4}>
                <motion.div variants={itemVariants}>
                  <Card className="h-100 shadow transition hover-lift">
                    <Card.Body className="p-4 text-center">
                      <div className="feature-icon mb-4 mx-auto">
                        <FiCpu size={24} />
                      </div>
                      <h3 className="h4 mb-3">2. Processing</h3>
                      <p className="mb-0">
                        Our AI-powered system analyzes your data to detect malicious patterns.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
              
              <Col md={4}>
                <motion.div variants={itemVariants}>
                  <Card className="h-100 shadow transition hover-lift">
                    <Card.Body className="p-4 text-center">
                      <div className="feature-icon mb-4 mx-auto">
                        <FiBarChart2 size={24} />
                      </div>
                      <h3 className="h4 mb-3">3. Results</h3>
                      <p className="mb-0">
                        View detailed report including attack type, confidence score, and performance metrics.
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Attack Types Section */}
      <section className="py-5 py-lg-6 bg-light" ref={attackRef}>
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={attackInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-4 text-glow-primary">Detect These Attacks</h2>
                <p className="mb-4 text-secondary">
                  Our system specializes in detecting these common IoT botnet attacks:
                </p>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate={attackInView ? "visible" : "hidden"}
                  className="d-flex flex-column gap-4"
                >
                  <motion.div variants={itemVariants} className="d-flex">
                    <div className="result-icon danger me-3 flex-shrink-0">
                      <FiAlertTriangle size={20} />
                    </div>
                    <div className="text-start">
                      <h3 className="h5 mb-2">Mirai Attack</h3>
                      <p className="mb-0">Powerful botnet targeting IoT devices</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="d-flex">
                    <div className="result-icon warning me-3 flex-shrink-0">
                      <FiAlertTriangle size={20} />
                    </div>
                    <div className="text-start">
                      <h3 className="h5 mb-2">Bashlite Attack</h3>
                      <p className="mb-0">Malware infecting Linux-based IoT devices</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="d-flex">
                    <div className="result-icon danger me-3 flex-shrink-0">
                      <FiAlertTriangle size={20} />
                    </div>
                    <div className="text-start">
                      <h3 className="h5 mb-2">Torii Attack</h3>
                      <p className="mb-0">Advanced persistent threat that steals data</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="d-flex">
                    <div className="result-icon success me-3 flex-shrink-0">
                      <FiCheckCircle size={20} />
                    </div>
                    <div className="text-start">
                      <h3 className="h5 mb-2">Normal Traffic</h3>
                      <p className="mb-0">Non-malicious network traffic</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Col>
            
            <Col lg={6}>
              <motion.div
                className="position-relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={attackInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow p-4 position-relative overflow-hidden border-glow-primary">
                  <div className="position-absolute top-0 start-0 w-100 h-100"
                       style={{ background: "linear-gradient(135deg, rgba(79, 109, 245, 0.08), transparent)" }}>
                  </div>
                  <div className="position-relative">
                    <motion.img 
                      src="https://cdn-icons-png.flaticon.com/512/2422/2422878.png" 
                      alt="Network Security" 
                      className="img-fluid mx-auto d-block"
                      style={{ 
                        maxWidth: "300px",
                        filter: "drop-shadow(0 0 10px rgba(79,109,245,0.2))"
                      }}
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 py-lg-6 text-center" ref={ctaRef}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="py-5"
          >
            <h2 className="mb-4 text-glow-primary">Ready to Analyze Your Network?</h2>
            <p className="lead mb-5 mx-auto text-secondary" style={{ maxWidth: "700px" }}>
              Upload your CSV file today and get instant insights about potential threats in your IoT network.
            </p>
            {/* Ultra simple HTML button for CTA section */}
            <button 
              type="button" 
              className="btn btn-primary btn-lg px-5 py-3" 
              onClick={() => {
                console.log("CTA Button clicked!");
                onStartUpload();
              }}
            >
              <i className="me-2"><FiUploadCloud /></i>
              Start Detection Now
            </button>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default HomePage; 