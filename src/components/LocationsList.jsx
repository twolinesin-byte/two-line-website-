import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { locationsData } from '../data/locationsData';

export default function LocationsList() {
  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: '150px' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem' }}
        >
          <h1 className="text-huge">Our<br />Locations</h1>
          <div className="divider"></div>
          <p className="text-body" style={{ maxWidth: '600px' }}>
            We provide premium architectural and interior design solutions across multiple regions. Explore our service areas below.
          </p>
        </motion.div>

        <div className="grid-responsive">
          {locationsData.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-panel"
              style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img 
                  src={location.image} 
                  alt={location.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 className="text-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{location.name}</h3>
                <p className="text-body" style={{ marginBottom: '2rem', flexGrow: 1 }}>{location.description}</p>
                <Link to={`/locations/${location.id}`} className="btn-outline" style={{ alignSelf: 'flex-start' }}>
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
