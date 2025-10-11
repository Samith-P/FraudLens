import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Bug, Copy, DollarSign, Menu, X, Lock, Eye, Users, Zap, TrendingUp, Globe, CheckCircle, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PhishingPage from './PhishingPage';
import MalwarePage from './MalwarePage';
import ClonePage from './ClonePage';
import ScamPage from './ScamPage';
import ScrollAnimatedSection from '../components/ScrollAnimatedSection';
import './Home.css';
import ProfilePage from './profile.jsx';
const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Changed to false by default
  const [isLoading, setIsLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const { user, logout, isAuthenticated, checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  // Check authentication when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Handle feature activation after login
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activateFeature = urlParams.get('feature') ||
      (window.history.state && window.history.state.activateFeature);

    if (activateFeature && isAuthenticated) {
      setActiveSection(activateFeature);
      // Clean up the URL
      window.history.replaceState(null, '', '/Home');
    }
  }, [isAuthenticated]);

  const handleFeatureAccess = (featureId) => {
    if (!isAuthenticated) {
      // Store the feature they wanted to access
      sessionStorage.setItem('requestedFeature', featureId);
      navigate('/Login', { state: { from: '/Home', requestedFeature: featureId } });
      return;
    }
    // User is authenticated, allow access to feature
    setActiveSection(featureId);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setActiveSection('home'); // Reset to home after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Reduced loading time
    return () => clearTimeout(timer);
  }, []);

  // Trigger animations when section changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeSection]);

  const sidebarItems = [
    { id: 'phishing', name: 'Phishing', icon: AlertTriangle },
    { id: 'malware', name: 'Malware Detection', icon: Bug },
    { id: 'clone', name: 'Clone Check', icon: Copy },
    { id: 'scam', name: 'Scam Check', icon: DollarSign },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  const features = [
    {
      icon: AlertTriangle,
      title: 'AI-Powered Phishing Detection',
      description: 'Advanced machine learning models analyze URLs, domains, and content patterns to detect sophisticated phishing attacks with 97.4% accuracy.',
      gradient: 'from-red-500 to-orange-600',
      capabilities: ['Real-time URL analysis', 'Domain reputation scoring', 'WHOIS data verification', 'AI content analysis']
    },
    {
      icon: Bug,
      title: 'Comprehensive Malware Analysis',
      description: 'Integrated VirusTotal API provides multi-engine malware detection for files, URLs, and hashes with detailed threat intelligence.',
      gradient: 'from-purple-500 to-pink-600',
      capabilities: ['60+ antivirus engines', 'File hash analysis', 'Behavior monitoring', 'Threat categorization']
    },
    {
      icon: Copy,
      title: 'Advanced Clone Detection',
      description: 'Dual AI system combining Google Gemini and Phishpedia ML models to identify website clones and brand impersonation attacks.',
      gradient: 'from-blue-500 to-cyan-600',
      capabilities: ['Visual similarity analysis', 'Brand recognition', 'Screenshot comparison', 'Domain spoofing detection']
    },
    {
      icon: DollarSign,
      title: 'Intelligent Scam Protection',
      description: 'Multi-source phone number verification and fraud detection using community databases and professional APIs.',
      gradient: 'from-green-500 to-emerald-600',
      capabilities: ['Phone number validation', 'Fraud score analysis', 'Community reporting', 'Risk assessment']
    },
    {
      icon: Shield,
      title: 'Real-time Browser Protection',
      description: 'Chrome extension provides seamless, real-time protection while browsing with instant threat detection and user alerts.',
      gradient: 'from-indigo-500 to-purple-600',
      capabilities: ['Background monitoring', 'Instant notifications', 'Privacy-focused', 'Cross-platform support']
    }
  ];

  const stats = [
    { number: '97.4%', label: 'ML Model Accuracy', icon: TrendingUp },
    { number: '60+', label: 'AV Engines', icon: Shield },
    { number: '4', label: 'AI Detection Modules', icon: Globe },
    { number: '<0.5s', label: 'Response Time', icon: CheckCircle }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'phishing':
        return <PhishingPage key={animationKey} />;
      case 'malware':
        return <MalwarePage key={animationKey} />;
      case 'clone':
        return <ClonePage key={animationKey} />;
      case 'scam':
        return <ScamPage key={animationKey} />;
      case 'profile':
        return <ProfilePage key={animationKey} />;
        return <React.Suspense fallback={<div>Loading Profile...</div>}>
          {React.createElement(require('./profile.jsx').default)}
        </React.Suspense>;
      default:
        return (
          <div className="home-content">
            <ScrollAnimatedSection animation="fade-up" threshold={0.2} triggerOnce={false}>
              <div className="hero-section">
                <ScrollAnimatedSection animation="slide-right" delay={200} triggerOnce={false}>
                  <div className="hero-text">
                    <h1>FraudLens: Advanced AI-Powered Cybersecurity Platform</h1>
                    <p>Professional-grade cybersecurity suite featuring cutting-edge AI and machine learning technologies. Our comprehensive platform delivers real-time protection against phishing, malware, clone attacks, and fraud with industry-leading accuracy rates and instant threat response.</p>
                    <div className="hero-buttons">
                      <button
                        className="btn-primary hover-scale"
                        onClick={() => !isAuthenticated ? navigate('/Login') : handleFeatureAccess('phishing')}
                      >
                        Start Protection
                      </button>
                      <button className="btn-secondary hover-scale">View Documentation</button>
                    </div>
                  </div>
                </ScrollAnimatedSection>
                <ScrollAnimatedSection animation="slide-left" delay={400} triggerOnce={false}>
                  <div className="hero-visual">
                    <div className="security-shield">
                      <Shield size={80} />
                      <div className="shield-rings">
                        <div className="ring ring-1"></div>
                        <div className="ring ring-2"></div>
                        <div className="ring ring-3"></div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimatedSection>
              </div>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection animation="fade-up" threshold={0.2} triggerOnce={false}>
              <div className="features-section">
                <ScrollAnimatedSection animation="slide-up-fade" delay={100} triggerOnce={false}>
                  <h2>AI-Powered Security Modules</h2>
                </ScrollAnimatedSection>
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <ScrollAnimatedSection 
                      key={index}
                      animation="scale" 
                      delay={index * 150}
                      threshold={0.1}
                      triggerOnce={false}
                    >
                      <div className="feature-item hover-lift">
                        <div className={`feature-icon-wrapper bg-gradient-to-br ${feature.gradient}`}>
                          <feature.icon className="feature-icon" />
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                        {feature.capabilities && (
                          <ul className="capability-list">
                            {feature.capabilities.map((capability, capIndex) => (
                              <li key={capIndex} className="capability-item">
                                <CheckCircle size={12} className="capability-check" />
                                {capability}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </ScrollAnimatedSection>
                  ))}
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* Performance Statistics */}
            <ScrollAnimatedSection animation="fade-up" threshold={0.2} triggerOnce={false}>
              <div className="stats-section">
                <ScrollAnimatedSection animation="slide-up-fade" delay={100} triggerOnce={false}>
                  <h2>Platform Performance Metrics</h2>
                </ScrollAnimatedSection>
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <ScrollAnimatedSection 
                      key={index}
                      animation="bounce-in" 
                      delay={index * 100}
                      threshold={0.1}
                      triggerOnce={false}
                    >
                      <div className="stat-item hover-lift">
                        <div className="stat-icon">
                          <stat.icon size={24} />
                        </div>
                        <div className="stat-number">{stat.number}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </ScrollAnimatedSection>
                  ))}
                </div>
              </div>
            </ScrollAnimatedSection>

            {/* Professional Contact Section */}
            <ScrollAnimatedSection animation="fade-up" threshold={0.2} triggerOnce={false}>
              <div className="contact-section">
                <div className="contact-container">
                  <ScrollAnimatedSection animation="slide-up-fade" delay={100} triggerOnce={false}>
                    <div className="contact-header">
                      <h2>Get In Touch</h2>
                      <p>Ready to enhance your cybersecurity posture? Contact our security experts for custom solutions and enterprise deployments.</p>
                    </div>
                  </ScrollAnimatedSection>
                  
                  <div className="contact-grid">
                    <ScrollAnimatedSection animation="slide-right" delay={200} triggerOnce={false}>
                      <div className="contact-info">
                        <h3>Contact Information</h3>
                        <div className="contact-item">
                          <span className="contact-label">Email:</span>
                          <a href="mailto:karthikeyamaddu@gmail.com" className="contact-link">karthikeyamaddu@gmail.com</a>
                        </div>
                        <div className="contact-item">
                          <span className="contact-label">Support:</span>
                          <a href="mailto:gannavarapuvinaykumar@gmail.com" className="contact-link">gannavarapuvinaykumar@gmail.com</a>
                        </div>
                        <div className="contact-item">
                          <span className="contact-label">Enterprise:</span>
                          <a href="mailto:samithp@gmail.com" className="contact-link">samithp@gmail.com</a>
                        </div>
                        <div className="contact-item">
                          <span className="contact-label">Phone:</span>
                          <span className="contact-text">+91 9959511898</span>
                        </div>
                      </div>
                    </ScrollAnimatedSection>
                    
                    <ScrollAnimatedSection animation="slide-left" delay={400} triggerOnce={false}>
                      <div className="contact-features">
                        <h3>Why Choose FraudLens?</h3>
                        <ul className="contact-benefits">
                          <li><CheckCircle size={16} /> AI-powered threat detection with 97.4% accuracy</li>
                          <li><CheckCircle size={16} /> Real-time protection across multiple attack vectors</li>
                          <li><CheckCircle size={16} /> Enterprise-grade security architecture</li>
                          <li><CheckCircle size={16} /> Continuous threat intelligence updates</li>
                          <li><CheckCircle size={16} /> Professional support and custom integrations</li>
                          <li><CheckCircle size={16} /> Comprehensive API suite for developers</li>
                        </ul>
                      </div>
                    </ScrollAnimatedSection>
                  </div>
                  
                  <ScrollAnimatedSection animation="fade-up" delay={600} triggerOnce={false}>
                    <div className="contact-footer">
                      <p>&copy; 2025 FraudLens Security Solutions. All rights reserved.</p>
                      <p>Advanced AI-Powered Cybersecurity Platform | Professional Threat Detection & Response</p>
                    </div>
                  </ScrollAnimatedSection>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        );
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-spinner">
            <Shield size={48} className="animate-spin" />
          </div>
          <div className="loading-text">Loading FraudLens...</div>
        </div>
      )}

      <div className={`app ${isLoading ? 'loading' : ''}`}>
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="logo animate-pulse">
              <Lock className="logo-icon" />
              <span>FraudLens</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <ul>
              <li>
                <button
                  className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection('home');
                    setSidebarOpen(false);
                  }}
                >
                  <Shield className="nav-icon" />
                  <span>Home</span>
                </button>
              </li>
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => handleFeatureAccess(item.id)}
                  >
                    <item.icon className="nav-icon" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="header">
            <div className="header-left">
              <button
                className="hamburger-menu"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <div className={`hamburger-lines ${sidebarOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
              <div className="header-title">
                <h1>FraudLens Dashboard</h1>
              </div>
            </div>
            <div className="header-actions">
              {isAuthenticated ? (
                <>
                  <div 
                    className="user-info clickable"
                    onClick={() => {
                      setActiveSection('profile');
                      setSidebarOpen(false);
                    }}
                    title="Go to Profile"
                  >
                    <User size={20} />
                    <span>Welcome, {user?.fullName || 'User'}</span>
                  </div>
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="auth-buttons">
                  <button
                    className="login-btn"
                    onClick={() => navigate('/Login')}
                  >
                    <User size={20} />
                    <span>Login</span>
                  </button>
                  <button
                    className="signup-btn"
                    onClick={() => navigate('/Signup')}
                  >
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </header>

          <main className="content">
            {renderContent()}
          </main>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="overlay"
            onClick={() => setSidebarOpen(false)}
            style={{
              opacity: sidebarOpen ? 1 : 0,
              visibility: sidebarOpen ? 'visible' : 'hidden'
            }}
          />
        )}
      </div>
    </>
  );
};

export default Home;