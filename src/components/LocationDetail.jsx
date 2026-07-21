import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { locationsData } from '../data/locationsData';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';

export default function LocationDetail() {
  const { id } = useParams();
  const location = locationsData.find(loc => loc.id === id);

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: '150px' }}>
      <div className="container">
        <Link 
          to="/locations" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--color-text)', 
            textDecoration: 'none',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.875rem'
          }}
        >
          <ArrowLeft size={16} /> Back to Locations
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>{location.name}</h1>
          <div className="divider"></div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', marginTop: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            {/* Description & Contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>About this area</h2>
              <p className="text-body" style={{ marginBottom: '3rem', fontSize: '1.1rem' }}>
                {location.description}
              </p>
              
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 className="uppercase" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>Contact Information</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MapPin size={20} color="var(--color-accent)" />
                    <span className="text-body">{location.contact.address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Phone size={20} color="var(--color-accent)" />
                    <a href={`tel:${location.contact.phone.replace(/[^0-9+]/g, '')}`} style={{ color: 'var(--color-text)', textDecoration: 'none' }} className="text-body">
                      {location.contact.phone}
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Mail size={20} color="var(--color-accent)" />
                    <a href={`mailto:${location.contact.email}`} style={{ color: 'var(--color-text)', textDecoration: 'none' }} className="text-body">
                      {location.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Available Services</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {location.services.map((service, index) => (
                  <li key={index} style={{ 
                    padding: '1.5rem 0', 
                    borderBottom: '1px solid rgba(245, 243, 239, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}></div>
                    <span className="text-body" style={{ fontSize: '1.1rem' }}>{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ height: '400px', width: '100%', overflow: 'hidden' }}
          >
            <img src={location.image} alt={location.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
