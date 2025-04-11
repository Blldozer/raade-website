import React from 'react';

interface ConferenceEmailProps {
  name?: string;
}

/**
 * RAADE Conference Email Template
 * 
 * A professional, responsive email template for the RAADE Conference
 * that follows the established brand guidelines and includes schedule details
 */
const RaadeConferenceEmail: React.FC<ConferenceEmailProps> = ({ name = "Attendee" }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }}>
      {/* Header with logo */}
      <div style={{ backgroundColor: '#274675', padding: '20px', textAlign: 'center' }}>
        <img 
          src="https://example.com/raade-logo.png" 
          alt="RAADE Conference Logo" 
          style={{ maxWidth: '180px', height: 'auto' }}
        />
      </div>
      
      {/* Hero section */}
      <div style={{ backgroundColor: '#FBB03B', color: '#274675', padding: '30px 20px', textAlign: 'center' }}>
        <h1 style={{ 
          margin: '0', 
          fontFamily: 'Georgia, serif', 
          fontSize: '28px', 
          fontWeight: 'bold',
          letterSpacing: '0.5px' 
        }}>
          RAADE Conference 2025
        </h1>
        <p style={{ 
          margin: '15px 0 0', 
          fontFamily: 'Georgia, serif', 
          fontSize: '16px', 
          fontStyle: 'italic' 
        }}>
          Market-Creating Innovations for Africa
        </p>
      </div>
      
      {/* Main content */}
      <div style={{ padding: '30px 20px', backgroundColor: '#ffffff' }}>
        <h2 style={{ 
          color: '#274675', 
          fontFamily: 'Georgia, serif', 
          fontSize: '22px', 
          marginTop: '0',
          marginBottom: '20px' 
        }}>
          Dear {name},
        </h2>
        
        <p style={{ 
          margin: '0 0 20px', 
          fontFamily: 'Arial, sans-serif', 
          fontSize: '16px' 
        }}>
          We're thrilled to announce the 2025 RAADE Conference at Rice University on April 11-12, 2025. Join us for inspiring talks, interactive workshops, and valuable networking opportunities focused on market-creating innovations for Africa.
        </p>
        
        {/* Schedule highlight */}
        <div style={{ 
          backgroundColor: '#f9f9f9', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '25px' 
        }}>
          <h3 style={{ 
            color: '#274675', 
            fontFamily: 'Georgia, serif', 
            fontSize: '18px', 
            marginTop: '0',
            marginBottom: '15px' 
          }}>
            Conference Schedule Highlights
          </h3>
          
          {/* Day 1 */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              fontWeight: 'bold', 
              color: '#FBB03B', 
              marginBottom: '10px', 
              fontSize: '17px' 
            }}>
              Day 1: April 11 (Multicultural Center)
            </div>

            {/* Event 1 */}
            <div style={{ 
              paddingLeft: '15px', 
              marginBottom: '10px', 
              borderLeft: '3px solid #FBB03B' 
            }}>
              <div style={{ 
                fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold', 
                color: '#274675' 
              }}>
                4:00 PM - 5:30 PM
              </div>
              <div style={{ fontWeight: 'bold' }}>Arrival and Check-in</div>
              <div style={{ 
                fontStyle: 'italic', 
                color: '#666' 
              }}>
                Multicultural Center
              </div>
            </div>

            {/* Event 2 */}
            <div style={{ 
              paddingLeft: '15px', 
              marginBottom: '10px', 
              borderLeft: '3px solid #FBB03B' 
            }}>
              <div style={{ 
                fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold', 
                color: '#274675' 
              }}>
                6:00 PM - 6:30 PM
              </div>
              <div style={{ fontWeight: 'bold' }}>Opening Address - Reimagining Solutions for Africa's Toughest Challenges</div>
              <div style={{ 
                fontStyle: 'italic', 
                color: '#666' 
              }}>
                Multicultural Center
              </div>
            </div>

            {/* Event 3 */}
            <div style={{ 
              paddingLeft: '15px', 
              marginBottom: '10px', 
              borderLeft: '3px solid #FBB03B' 
            }}>
              <div style={{ 
                fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold', 
                color: '#274675' 
              }}>
                6:30 PM - 7:30 PM
              </div>
              <div style={{ fontWeight: 'bold' }}>Networking Dinner</div>
              <div style={{ 
                fontStyle: 'italic', 
                color: '#666' 
              }}>
                Multicultural Center
              </div>
            </div>
          </div>
          
          {/* Day 2 */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              fontWeight: 'bold', 
              color: '#FBB03B', 
              marginBottom: '10px', 
              fontSize: '17px' 
            }}>
              Day 2: April 12 (Hudspeth Auditorium)
            </div>

            {/* Event 1 */}
            <div style={{ 
              paddingLeft: '15px', 
              marginBottom: '10px', 
              borderLeft: '3px solid #FBB03B' 
            }}>
              <div style={{ 
                fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold', 
                color: '#274675' 
              }}>
                8:00 AM - 9:00 AM
              </div>
              <div style={{ fontWeight: 'bold' }}>Breakfast & Registration</div>
              <div style={{ 
                fontStyle: 'italic', 
                color: '#666' 
              }}>
                Siebel Servery
              </div>
            </div>

            {/* Event 2 */}
            <div style={{ 
              paddingLeft: '15px', 
              marginBottom: '10px', 
              borderLeft: '3px solid #FBB03B' 
            }}>
              <div style={{ 
                fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold', 
                color: '#274675' 
              }}>
                9:55 AM - 10:30 AM
              </div>
              <div style={{ fontWeight: 'bold' }}>Plenary Speech: Unlocking the Vault: New Capital Models for Africa's Market Revolution</div>
              <div style={{ 
                fontStyle: 'italic', 
                color: '#666' 
              }}>
                Hudspeth Auditorium
              </div>
            </div>

            {/* Event 3 */}
            <div style={{ 
              paddingLeft: '15px', 
              marginBottom: '10px', 
              borderLeft: '3px solid #FBB03B' 
            }}>
              <div style={{ 
                fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold', 
                color: '#274675' 
              }}>
                7:00 PM - 9:00 PM
              </div>
              <div style={{ fontWeight: 'bold' }}>Conference Gala</div>
              <div style={{ 
                fontStyle: 'italic', 
                color: '#666' 
              }}>
                Location to be announced
              </div>
            </div>
          </div>
        </div>
        
        <p style={{ 
          margin: '0 0 20px', 
          fontFamily: 'Arial, sans-serif', 
          fontSize: '16px' 
        }}>
          Venue Information:
        </p>

        <ul style={{ marginBottom: '20px' }}>
          <li>
            <strong>Day 1:</strong>{' '}
            <a 
              href="https://maps.app.goo.gl/5wJH9GK5aCZx9BkU8" 
              style={{ color: '#274675', textDecoration: 'underline' }}
            >
              Multicultural Center
            </a>
          </li>
          <li>
            <strong>Day 2:</strong>{' '}
            <a 
              href="https://maps.app.goo.gl/72W5FcG2U4Ve23vN7" 
              style={{ color: '#274675', textDecoration: 'underline' }}
            >
              Hudspeth Auditorium, Glasscock School of Continuing Studies
            </a>
          </li>
        </ul>
        
        <p style={{ 
          margin: '0 0 20px', 
          fontFamily: 'Arial, sans-serif', 
          fontSize: '16px' 
        }}>
          We have an incredible lineup of speakers, including Peter Obi, Yomi Jemibewon, Paul Cherkuri, and many others who are pioneering innovative approaches to development in Africa.
        </p>
        
        {/* Call to action button */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <a 
            href="https://raadeconf.com" 
            style={{ 
              display: 'inline-block', 
              padding: '12px 24px', 
              backgroundColor: '#FBB03B', 
              color: '#274675', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              borderRadius: '4px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '16px'
            }}
          >
            View Full Schedule
          </a>
        </div>
        
        <p style={{ 
          margin: '0 0 20px', 
          fontFamily: 'Arial, sans-serif', 
          fontSize: '16px' 
        }}>
          We look forward to seeing you at the conference!
        </p>
        
        <p style={{ 
          margin: '0 0 20px', 
          fontFamily: 'Arial, sans-serif', 
          fontSize: '16px' 
        }}>
          Warm regards,<br />
          The RAADE Conference Team
        </p>
      </div>
      
      {/* Footer */}
      <div style={{ 
        backgroundColor: '#274675', 
        color: '#ffffff', 
        padding: '20px', 
        textAlign: 'center',
        fontSize: '14px'
      }}>
        <p style={{ margin: '5px 0' }}>
          Rice University - Rice African Approaches to Development and Entrepreneurship
        </p>
        <div style={{ margin: '15px 0' }}>
          <a 
            href="https://twitter.com/RiceUniversity" 
            style={{ 
              display: 'inline-block', 
              margin: '0 10px', 
              color: '#ffffff', 
              textDecoration: 'none' 
            }}
          >
            Twitter
          </a>
          <a 
            href="https://www.facebook.com/RiceUniversity" 
            style={{ 
              display: 'inline-block', 
              margin: '0 10px', 
              color: '#ffffff', 
              textDecoration: 'none' 
            }}
          >
            Facebook
          </a>
          <a 
            href="https://www.linkedin.com/school/rice-university/" 
            style={{ 
              display: 'inline-block', 
              margin: '0 10px', 
              color: '#ffffff', 
              textDecoration: 'none' 
            }}
          >
            LinkedIn
          </a>
        </div>
        <p style={{ margin: '5px 0' }}>
          You received this email because you registered for the RAADE Conference.
        </p>
        <p style={{ margin: '5px 0' }}>
          To unsubscribe, <a href="#" style={{ color: '#ffffff', textDecoration: 'underline' }}>click here</a>.
        </p>
      </div>
    </div>
  );
};

export default RaadeConferenceEmail;
