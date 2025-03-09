import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiGithub, FiMail, FiHelpCircle, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer py-5">
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="d-flex align-items-center mb-4">
                <div className="result-icon success me-3">
                  <FiShield />
                </div>
                <h3 className="footer-title m-0">IoT Defender</h3>
              </div>
              <p className="text-secondary mb-4">
                Malicious traffic detection system that protects IoT devices from cyber attacks.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="footer-link d-inline-block p-2">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className="footer-link d-inline-block p-2">
                  <FiGithub size={20} />
                </a>
                <a href="#" className="footer-link d-inline-block p-2">
                  <FiLinkedin size={20} />
                </a>
              </div>
            </motion.div>
          </Col>
          
          <Col lg={6}>
            <Row>
              <Col sm={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="footer-title">Resources</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <a href="#" className="footer-link">Documentation</a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="footer-link">API Reference</a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="footer-link">Tutorials</a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="footer-link">Blog</a>
                    </li>
                  </ul>
                </motion.div>
              </Col>
              
              <Col sm={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <h4 className="footer-title">Company</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <a href="#" className="footer-link">About Us</a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="footer-link">Careers</a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="footer-link">Privacy Policy</a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="footer-link">Terms of Service</a>
                    </li>
                  </ul>
                </motion.div>
              </Col>
            </Row>
          </Col>
          
          <Col lg={3} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="footer-title">Contact Us</h4>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <FiMail className="me-2" />
                    <span>support@iotdefender.com</span>
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <FiGithub className="me-2" />
                    <span>github.com/iotdefender</span>
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="footer-link d-flex align-items-center">
                    <FiHelpCircle className="me-2" />
                    <span>Help Center</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </Col>
        </Row>
        
        <div className="mt-5 pt-4 border-top">
          <p className="text-center text-muted small">
            &copy; {currentYear} IoT Defender. All rights reserved.
          </p>
          <p className="text-center text-muted small mt-2">
            This is just a simulation. Real-time detection requires backend integration.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 