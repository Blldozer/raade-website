import React from 'react';

interface RecipientProps {
  name: string;
  email: string;
}

interface RaadeConferenceEmailProps {
  recipient: RecipientProps;
}

/**
 * RAADE Conference Email Template
 * 
 * This component renders an HTML email template for the RAADE Forum.
 * It includes detailed conference information, schedule, parking details, and more.
 */
const RaadeConferenceEmail: React.FC<RaadeConferenceEmailProps> = ({ recipient }) => {
  // RAADE color scheme
  const raadeNavy = "#274675";
  const raadeGold = "#FBB03B";
  
  // Afterparty ticket link
  const afterpartyTicketLink = "https://tempo.live/nobystanders-rodeo-rave?fbclid=PAZXh0bgNhZW0CMTEAAae2ev8Po0pccjO8dUsYvpVWh4Cx0wXdsrWZhTvSZ5Z2F9jcxxDWAiLk7IJyeQ_aem_XORKYyvyKJMpuER_ejI3AQ";
  
  return (
    <div style={{ 
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      maxWidth: "600px", 
      margin: "0 auto",
      padding: "20px",
      color: "#333",
      lineHeight: "1.6"
    }}>
      {/* Email Header */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div style={{ 
          backgroundColor: raadeNavy, 
          padding: "20px", 
          borderRadius: "8px 8px 0 0",
          textAlign: "center"
        }}>
          <h1 style={{ 
            color: "white", 
            margin: "0",
            fontFamily: "Georgia, serif",  // Web-safe alternative to Simula
            fontSize: "28px",
            fontWeight: "bold"
          }}>
            RAADE African Development Forum at Rice University
          </h1>
        </div>
        <div style={{ 
          backgroundColor: raadeGold, 
          padding: "15px", 
          borderRadius: "0 0 8px 8px",
          color: raadeNavy,
          fontWeight: "bold",
          fontSize: "18px"
        }}>
          April 11-12, 2025
        </div>
      </div>
      
      {/* Personalized Greeting */}
      <div style={{ marginBottom: "25px" }}>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif" // Web-safe alternative to Lora
        }}>
          Hello {recipient.name}!
        </p>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif"
        }}>
          I can't tell you how excited our entire team is to welcome you to the RAADE Forum at Rice University! 
          There's something special about bringing together minds passionate about African development, and we're thrilled 
          you'll be joining us for what promises to be two days of meaningful connections and impactful work.
        </p>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif"
        }}>
          As someone who's been involved in planning this event from the beginning, I've seen firsthand how much thought 
          has gone into creating an experience that's both inspiring and practical. We're not just another conference with 
          endless PowerPoints, we're building a community of changemakers.
        </p>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif",
          fontWeight: "bold"
        }}>
          Here's what you need to know:
        </p>
      </div>
      
      {/* Schedule Section */}
      <div style={{ 
        marginBottom: "30px", 
        border: `2px solid ${raadeNavy}`,
        borderRadius: "8px",
        padding: "20px"
      }}>
        <h2 style={{ 
          color: raadeNavy, 
          marginTop: "0",
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          borderBottom: `2px solid ${raadeGold}`,
          paddingBottom: "10px"
        }}>
          Conference Schedule:
        </h2>
        
        {/* Day 1 */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ 
            color: raadeNavy,
            fontFamily: "Georgia, serif",
            margin: "15px 0 10px",
            fontSize: "18px"
          }}>
            <strong>Friday, April 11:</strong>
          </h3>
          <ul style={{ 
            padding: "0 0 0 20px",
            margin: "10px 0",
            lineHeight: "1.6"
          }}>
            <li><strong>4:00 PM - 5:30 PM:</strong> Check-In</li>
            <li><strong>5:30 PM - 7:30 PM:</strong> Welcome Dinner Reception at the Multicultural Center</li>
          </ul>
        </div>
        
        {/* Day 2 */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ 
            color: raadeNavy,
            fontFamily: "Georgia, serif",
            margin: "15px 0 10px",
            fontSize: "18px"
          }}>
            <strong>Saturday, April 12:</strong>
          </h3>
          <ul style={{ 
            padding: "0 0 0 20px",
            margin: "10px 0",
            lineHeight: "1.6"
          }}>
            <li><strong>8:00 AM - 9:00 AM:</strong> Complimentary Breakfast available at Ann Siebel Servery at Rice University</li>
            <li><strong>9:00 AM - 5:30 PM:</strong> Main Conference Day at the Glasscock School of Continuing Studies at Rice University</li>
            <li><strong>6:30 PM - 9:00 PM:</strong> RAADE Gala <span style={{ fontStyle: 'italic', fontSize: '14px' }}>(included with your conference registration)</span></li>
            <li><strong>10:00 PM - 2:00 AM:</strong> RAADE x No-Bystanders Afterparty with No-Bystanders (optional)</li>
          </ul>
          <div style={{
            backgroundColor: "#f8f8f8",
            padding: "12px 15px",
            marginTop: "15px",
            borderLeft: `4px solid ${raadeGold}`,
            fontSize: "15px"
          }}>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>Afterparty Details:</strong>
            </p>
            <p style={{ margin: "0 0 8px 0" }}>
              Afterparty tickets are sold separately (Gala tickets are included with conference registration).
            </p>
            <p style={{ margin: "0 0 8px 0" }}>
              Attendees get a discount using the coupon code <strong>RAADEHTX</strong> at checkout!
            </p>
            <p style={{ margin: "0" }}>
              <a 
                href={afterpartyTicketLink}
                style={{
                  display: "inline-block",
                  backgroundColor: raadeNavy,
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  marginTop: "5px"
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Afterparty Tickets Here
              </a>
            </p>
          </div>
          <p style={{ 
            fontSize: "15px", 
            marginTop: "15px",
            fontWeight: "bold"
          }}>
            Attached is a more detailed schedule of each day!
          </p>
        </div>
      </div>
      
      {/* Maps and Parking */}
      <div style={{ 
        marginBottom: "30px", 
        border: `2px solid ${raadeNavy}`,
        borderRadius: "8px",
        padding: "20px"
      }}>
        <h2 style={{ 
          color: raadeNavy, 
          marginTop: "0",
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          borderBottom: `2px solid ${raadeGold}`,
          paddingBottom: "10px"
        }}>
          Location & Parking Information
        </h2>
        
        <p style={{ margin: "15px 0" }}>
          To help you navigate campus easily, we've created a custom Google Maps guide highlighting all conference locations: 
          <a 
            href="https://maps.app.goo.gl"
            style={{
              color: raadeNavy,
              textDecoration: "underline",
              fontWeight: "bold",
              marginLeft: "5px"
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            RAADE Forum Locations
          </a>
        </p>
        
        <h3 style={{ 
          color: raadeNavy,
          fontFamily: "Georgia, serif",
          margin: "20px 0 10px",
          fontSize: "18px"
        }}>
          Parking Information:
        </h3>
        
        <ul style={{ 
          padding: "0 0 0 20px",
          margin: "10px 0",
          lineHeight: "1.6"
        }}>
          <li><strong>Friday, April 11:</strong> Please park at the Cambridge Office Building Garage</li>
          <li><strong>Saturday, April 12:</strong> Please park at West Lot 4</li>
        </ul>
        
        <p style={{ margin: "15px 0" }}>
          We've taken care of parking for you - we'll hand you a pre-paid ticket at check-in.
        </p>
        
        <p style={{ 
          margin: "15px 0", 
          fontStyle: "italic",
          backgroundColor: "#f8f8f8",
          padding: "10px",
          borderLeft: `4px solid ${raadeGold}`
        }}>
          Note: You would need to enter rice parking facilities with your payment card. When you exit, you can pay with the pre-paid ticket.
        </p>
      </div>
      
      {/* Design Sprint */}
      <div style={{ 
        marginBottom: "30px", 
        border: `2px solid ${raadeNavy}`,
        borderRadius: "8px",
        padding: "20px"
      }}>
        <h2 style={{ 
          color: raadeNavy, 
          marginTop: "0",
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          borderBottom: `2px solid ${raadeGold}`,
          paddingBottom: "10px"
        }}>
          The Heart of RAADE, Our Interactive Design Sprint
        </h2>
        
        <p style={{ margin: "15px 0" }}>
          What I'm most excited about is our design sprint based on case studies. Instead of just talking about challenges 
          across the African continent, we'll be rolling up our sleeves together to develop potential solutions.
        </p>
        
        <p style={{ margin: "15px 0" }}>
          These workshops are designed to be collaborative and engaging, creating natural opportunities for you to connect 
          with others who share your specific interests. We've found this approach creates much more meaningful relationships 
          than typical networking events.
        </p>
        
        <h3 style={{ 
          color: raadeNavy,
          fontFamily: "Georgia, serif",
          margin: "20px 0 10px",
          fontSize: "18px"
        }}>
          Case Study Selection:
        </h3>
        
        <p style={{ margin: "15px 0" }}>
          You'll soon receive a follow-up email with details about the case studies available and instructions on how to 
          select your preferred workshop. This will help us finalize arrangements based on your interests. Kindly share 
          your preferences as soon as you receive the link, otherwise, we will assign a workshop to you.
        </p>
        
        <p style={{ 
          margin: "15px 0", 
          fontWeight: "bold",
          backgroundColor: "#f8f8f8",
          padding: "10px",
          borderLeft: `4px solid ${raadeGold}`
        }}>
          Please know that no prior expertise is required, these workshops thrive on diverse perspectives and fresh thinking!
        </p>
      </div>
      
      {/* Stay Connected */}
      <div style={{ 
        marginBottom: "30px", 
        border: `2px solid ${raadeNavy}`,
        borderRadius: "8px",
        padding: "20px"
      }}>
        <h2 style={{ 
          color: raadeNavy, 
          marginTop: "0",
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          borderBottom: `2px solid ${raadeGold}`,
          paddingBottom: "10px"
        }}>
          Stay Connected
        </h2>
        
        <p style={{ margin: "15px 0" }}>
          Join our community before the conference:
        </p>
        
        <ul style={{ 
          padding: "0 0 0 20px",
          margin: "10px 0",
          lineHeight: "1.6"
        }}>
          <li>Follow our journey on Instagram: <a href="https://instagram.com/rice_aade" style={{ color: raadeNavy, fontWeight: "bold" }}>@rice_aade</a></li>
          <li>We post the most updates on here! Make sure that you are keeping up to date with our page throughout the forum!</li>
          <li>Connect with us on LinkedIn: <a href="https://www.linkedin.com/company/rice-association-for-african-development" style={{ color: raadeNavy, fontWeight: "bold" }}>Rice Association for African Development</a></li>
          <li>Explore our website: <a href="https://rice-raade.com" style={{ color: raadeNavy, fontWeight: "bold" }}>rice-raade.com</a></li>
        </ul>
        
        <p style={{ margin: "15px 0" }}>
          If you have any questions before the big day, please don't hesitate to reach out to us at 
          <a href="mailto:raade@rice.edu" style={{ color: raadeNavy, fontWeight: "bold", marginLeft: "5px" }}>raade@rice.edu</a>. 
          We're here to help!
        </p>
      </div>
      
      {/* Signature */}
      <div style={{ 
        marginTop: "30px",
        borderTop: "1px solid #eee",
        paddingTop: "20px"
      }}>
        <p style={{ margin: "5px 0" }}>
          I'm looking forward to meeting you at Rice University. Until then, warmest regards from all of us at RAADE!
        </p>
        
        <p style={{ 
          margin: "15px 0 5px 0",
          fontWeight: "bold",
          color: raadeNavy
        }}>
          Ife Idakolo
        </p>
        
        <p style={{ margin: "0 0 5px 0" }}>
          Co-Executive Director<br />
          Rice Association for African Development
        </p>
        
        <p style={{ 
          margin: "20px 0 0 0",
          fontStyle: "italic"
        }}>
          P.S. Is there anything specific you're hoping to get out of the conference? Feel free to reply and let us know!
        </p>
      </div>
    </div>
  );
};

export default RaadeConferenceEmail;
