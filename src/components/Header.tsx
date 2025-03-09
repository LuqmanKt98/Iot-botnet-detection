import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiBarChart2, FiInfo, FiFileText, FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expand="md" className="app-header sticky-top" expanded={expanded}>
      <Container>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="d-flex align-items-center"
        >
          <div className="result-icon me-2">
            <FiShield className="text-glow-primary" />
          </div>
          <Navbar.Brand className="fw-bold">IoT Defender</Navbar.Brand>
        </motion.div>
        
        <div className="d-flex align-items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="me-2"
          >
            <Button 
              variant={isDarkMode ? "dark" : "light"} 
              onClick={toggleDarkMode} 
              className="d-flex align-items-center justify-content-center rounded-circle p-0 border-0"
              style={{ 
                width: '38px', 
                height: '38px', 
                boxShadow: isDarkMode ? '0 0 5px rgba(79, 109, 245, 0.3)' : 'none',
                background: isDarkMode ? 'rgba(79, 109, 245, 0.1)' : 'rgba(255, 255, 255, 0.8)'
              }}
            >
              {isDarkMode ? (
                <FiSun color="#FFC107" />
              ) : (
                <FiMoon color="#4f6df5" />
              )}
            </Button>
          </motion.div>
          
          <Navbar.Toggle 
            aria-controls="navbar-nav" 
            onClick={() => setExpanded(!expanded)}
            className="border-0"
          >
            {expanded ? <FiX size={24} /> : <FiMenu size={24} />}
          </Navbar.Toggle>
        </div>
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Nav.Link className="d-flex align-items-center">
                <FiBarChart2 className="me-2" />
                <span>Dashboard</span>
              </Nav.Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Nav.Link className="d-flex align-items-center">
                <FiFileText className="me-2" />
                <span>Documentation</span>
              </Nav.Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Nav.Link className="d-flex align-items-center">
                <FiInfo className="me-2" />
                <span>About</span>
              </Nav.Link>
            </motion.div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 